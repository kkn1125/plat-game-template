import GAME_CONF from '@config/game.conf';
import GameEngine from '@core/GameEngine';
import Logger from '@util/Logger';
import { GameState, UnitState } from '@variable/constant';

class Renderer {
  prevTime: number = 0;
  logger = new Logger<Renderer>(this);
  engine: GameEngine;

  constructor(engine: GameEngine) {
    this.logger.scope().debug('렌더러 초기화');
    this.engine = engine;
  }

  /* 현재 맵 */
  get currentMap() {
    return this.engine.gameMapManager.currentMap;
  }

  /* 제어 유닛 */
  get controlUnit() {
    return this.engine.controlUnit;
  }

  /* 등록된 유닛들 */
  get units() {
    return this.engine.units;
  }
  /* 등록된 포탈들 */
  get portals() {
    return this.engine.portals;
  }

  /* 윈도우 사이즈 */
  get worldSize() {
    return {
      x: innerWidth,
      y: innerHeight,
    };
  }

  /* 윈도우 너비 절반 */
  get worldAxisX() {
    return this.worldSize.x / 2;
  }

  /* 윈도우 높이 절반 */
  get worldAxisY() {
    return this.worldSize.y / 2;
  }

  // 맵 상 캐릭터 좌표
  get characterPosition() {
    if (!this.controlUnit)
      return {
        characterX: 0,
        characterY: 0,
      };
    const positionX = this.controlUnit.position.x;
    const positionY = this.controlUnit.position.y;
    const sizeX = GAME_CONF.UNIT_CONF.DEFAULT.SIZE.X;
    const sizeY = GAME_CONF.UNIT_CONF.DEFAULT.SIZE.Y;
    const worldCenterX = this.worldAxisX - sizeX / 2;
    const worldCenterY = this.worldAxisY - sizeY / 2;
    return {
      characterX: worldCenterX - positionX,
      characterY: worldCenterY - positionY,
    };
  }

  get worldPosition() {
    if (!this.controlUnit) return { worldAxisX: 0, worldAxisY: 0 };
    const { x, y } = this.controlUnit.position;
    const { characterX, characterY } = this.characterPosition;
    const { rangeX, rangeY } = this.engine.renderer.getCameraMoveableRange(x, y);
    return {
      worldAxisX: characterX + rangeX,
      worldAxisY: characterY + rangeY,
    };
  }

  render() {
    this.logger.scope('Render').debug('렌더링');

    for (const { canvas } of this.engine.ui.canvasMap.values()) {
      this.engine.ui.APP.appendChild(canvas);
    }

    this.animate();
  }

  private animate() {
    requestAnimationFrame(this.draw.bind(this));
  }

  private ticktock(time: number) {
    const now = Math.floor(time);
    if (now !== this.prevTime) {
      // 애니메이션 초당 처리 영역
    }
  }

  private clearDraw() {
    for (const { canvas, ctx } of this.engine.ui.canvasMap.values()) {
      ctx.clearRect(
        -canvas.width / GAME_CONF.SCALE,
        -canvas.height / GAME_CONF.SCALE,
        (canvas.width * 2) / GAME_CONF.SCALE,
        (canvas.height * 2) / GAME_CONF.SCALE,
      );
    }
  }

  private afterDraw() {
    for (const { canvas, ctx } of this.engine.ui.canvasMap.values()) {
      // ctx.restore(); // 상태 복원
    }
  }

  getCameraMoveableRange(positionX: number, positionY: number) {
    const fieldSizeX = GAME_CONF.MAP_CONF.DEFAULT.SIZE.X;
    const fieldSizeY = GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y;
    const fieldXLength = this.currentMap?.fields[0].length || 0;
    const fieldYLength = this.currentMap?.fields.length || 0;
    const fieldWidth = fieldXLength * fieldSizeX;
    const fieldHeight = fieldYLength * fieldSizeY * GAME_CONF.SCALE;

    // 유닛 카메라 고정 범위 X
    const limitScreenX = fieldWidth / 2;
    // 유닛 카메라 고정 범위 Y
    const limitScreenY = fieldHeight / 2;

    const windowWidthAsScale = innerWidth / GAME_CONF.SCALE;
    const windowHeightAsScale = innerHeight / GAME_CONF.SCALE;
    // 윈도우 넘어가는 맵의 길이 만큼
    const windowOverflowX = windowWidthAsScale / 2 > limitScreenX ? 0 : limitScreenX - windowWidthAsScale / 2;
    const windowOverflowY = windowHeightAsScale / 2 > limitScreenY ? 0 : limitScreenY - windowHeightAsScale / 2;

    let rangeX = 0;
    let rangeY = 0;
    if (positionX < -windowOverflowX) {
      rangeX = positionX + windowOverflowX;
    }
    if (positionX > windowOverflowX) {
      rangeX = positionX - windowOverflowX;
    }
    if (positionY < -windowOverflowY) {
      rangeY = positionY + windowOverflowY;
    }
    if (positionY > windowOverflowY) {
      rangeY = positionY - windowOverflowY;
    }
    return { rangeX, rangeY };
  }

  private mapDraw() {
    const { ctx: layerMapCtx } = this.engine.ui.getLayer('layer-map');
    if (!this.currentMap) return;
    const width = this.currentMap.fields[0].length * GAME_CONF.MAP_CONF.DEFAULT.SIZE.X;
    const height = this.currentMap.fields.length * GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y;
    const positionX = this.controlUnit?.position.x || 0;
    const positionY = this.controlUnit?.position.y || 0;
    const { rangeX, rangeY } = this.getCameraMoveableRange(positionX, positionY);

    this.currentMap.drawMap(layerMapCtx, {
      worldAxisX: this.worldAxisX - positionX - width / 2 + rangeX,
      worldAxisY: this.worldAxisY - positionY - height / 2 + rangeY,
    });
    this.currentMap.drawObject(layerMapCtx, {
      worldAxisX: this.worldAxisX - positionX - width / 2 + rangeX,
      worldAxisY: this.worldAxisY - positionY - height / 2 + rangeY,
    });
    {
      const { ctx: layerMapCtx } = this.engine.ui.getLayer('layer-map-object');
      this.currentMap.drawObject(
        layerMapCtx,
        {
          worldAxisX: this.worldAxisX - positionX - width / 2 + rangeX,
          worldAxisY: this.worldAxisY - positionY - height / 2 + rangeY,
        },
        true,
      );
    }
  }

  get sameLocationPortals() {
    return this.portals.filter((portal) => this.currentMap?.name === portal.location.locate);
  }

  get sameLocationUnits() {
    return this.units.filter((unit) => this.currentMap?.name === unit.location.locate);
  }

  private portalDraw() {
    const { ctx: layerMapCtx } = this.engine.ui.getLayer('layer-portal');
    const { ctx: layerMapLabelCtx } = this.engine.ui.getLayer('layer-unit-label');

    this.sameLocationPortals.forEach((portal) => {
      const positionX = this.controlUnit?.position.x || 0;
      const positionY = this.controlUnit?.position.y || 0;
      const { rangeX, rangeY } = this.getCameraMoveableRange(positionX, positionY);

      portal.draw(layerMapCtx, layerMapLabelCtx, {
        worldAxisX: this.worldAxisX - GAME_CONF.UNIT_CONF.DEFAULT.SIZE.X / 2 - positionX + rangeX,
        worldAxisY: this.worldAxisY - GAME_CONF.UNIT_CONF.DEFAULT.SIZE.Y / 2 - positionY + rangeY,
      });
    });
  }

  private unitDraw() {
    const { ctx: layerMapCtx } = this.engine.ui.getLayer('layer-unit');
    const { ctx: layerMapLabelCtx } = this.engine.ui.getLayer('layer-unit-label');
    this.sameLocationUnits.forEach((unit) => {
      const positionX = this.controlUnit?.position.x || 0;
      const positionY = this.controlUnit?.position.y || 0;
      const { rangeX, rangeY } = this.getCameraMoveableRange(positionX, positionY);

      unit.draw(layerMapCtx, layerMapLabelCtx, {
        worldAxisX: this.worldAxisX - GAME_CONF.UNIT_CONF.DEFAULT.SIZE.X / 2 - positionX + rangeX,
        worldAxisY: this.worldAxisY - GAME_CONF.UNIT_CONF.DEFAULT.SIZE.Y / 2 - positionY + rangeY,
      });
    });

    if (this.controlUnit && this.currentMap) {
      const { worldAxisX, worldAxisY } = this.worldPosition;

      this.controlUnit.draw(layerMapCtx, layerMapLabelCtx, {
        worldAxisX,
        worldAxisY,
      });
      this.controlUnit.around();
    }
  }

  private draw(time: number = 0) {
    // 화면 초기화
    this.clearDraw();
    // const origin = time;
    time *= 0.001;
    const now = Math.floor(time);
    this.ticktock(time);

    const { joystick } = this.engine.eventManager.joystickEvent;

    this.mapDraw();
    this.unitDraw();
    this.portalDraw();

    if (this.currentMap && this.controlUnit) {
      if (this.controlUnit.state !== UnitState.Die) {
        const velocity = this.controlUnit.increaseSpeed;
        if (joystick.w || joystick.s || joystick.a || joystick.d) {
          this.controlUnit.setState(UnitState.Move);
        }

        if (!joystick.w && !joystick.s && !joystick.a && !joystick.d) {
          this.controlUnit.setState(UnitState.Idle);
        }

        if (joystick.w) {
          if (!this.engine.gameMapManager.collisionTop(this.currentMap, this.controlUnit)) {
            this.controlUnit.move(0, -velocity);
          }
        }
        if (joystick.s) {
          if (!this.engine.gameMapManager.collisionBottom(this.currentMap, this.controlUnit)) {
            this.controlUnit.move(0, velocity);
          }
        }
        if (joystick.a) {
          if (!this.engine.gameMapManager.collisionLeft(this.currentMap, this.controlUnit)) {
            this.controlUnit.move(-velocity, 0);
          }
        }
        if (joystick.d) {
          if (!this.engine.gameMapManager.collisionRight(this.currentMap, this.controlUnit)) {
            this.controlUnit.move(velocity, 0);
          }
        }
      }
    }
    this.afterDraw();

    requestAnimationFrame(this.draw.bind(this));
    this.prevTime = now;
  }
}

export default Renderer;
