import GAME_CONF from '@config/game.conf';
import GameEngine from '@core/GameEngine';
import Logger from '@util/Logger';
import { GameState, UnitState } from '@variable/constant';

class Renderer {
  prevTime: number = 0;
  logger = new Logger<Renderer>(this);
  engine: GameEngine;
  readonly APP: HTMLElement = document.getElementById('app') as HTMLElement;
  canvasMap: Map<Id, { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D }> = new Map();

  constructor(engine: GameEngine) {
    this.logger.scope().debug('렌더러 초기화');
    this.engine = engine;
    this.engine.setState(GameState.Loading);
    this.createLayer('layer-map');
  }

  get currentMap() {
    return this.engine.gameMapManager.currentMap;
  }

  get controlUnit() {
    return this.engine.controlUnit;
  }

  get units() {
    return this.engine.units;
  }

  get worldSize() {
    return {
      x: innerWidth,
      y: innerHeight,
    };
  }

  get worldAxisX() {
    return this.worldSize.x / 2;
  }

  get worldAxisY() {
    return this.worldSize.y / 2;
  }

  getLayer(id: Id) {
    return this.canvasMap.get(id) as {
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
    };
  }

  /* Renderer 전용 */
  handleCanvasResize(canvas: HTMLCanvasElement) {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }

  createLayer(id: Id) {
    this.logger.scope('CreateLayer').debug(`${id} 레이어 생성`);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.id = id;
    ctx.globalAlpha = 1;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    window.addEventListener('resize', this.handleCanvasResize.bind(this, canvas));

    this.canvasMap.set(id, { canvas, ctx });
    return { canvas, ctx };
  }

  render() {
    this.logger.scope('Render').debug('렌더링');

    for (const { canvas } of this.canvasMap.values()) {
      this.APP.appendChild(canvas);
    }

    this.animate();
  }

  private animate() {
    requestAnimationFrame(this.draw.bind(this));
  }

  private tiktok(time: number) {
    const now = Math.floor(time);
    if (now !== this.prevTime) {
      // 애니메이션 초당 처리 영역
    }
  }

  private clearDraw() {
    const { canvas: layerMapCanvas, ctx: layerMapCtx } = this.getLayer('layer-map');
    layerMapCtx.clearRect(0, 0, layerMapCanvas.width, layerMapCanvas.height);
  }

  private mapDraw() {
    const { ctx: layerMapCtx } = this.getLayer('layer-map');
    if (!this.currentMap) return;
    const width = this.currentMap.fields[0].length * GAME_CONF.MAP_CONF.DEFAULT.SIZE.X;
    const height = this.currentMap.fields.length * GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y;
    this.currentMap.draw(layerMapCtx, {
      worldAxisX: this.worldAxisX - (this.controlUnit?.position.x || 0) - width / 2,
      worldAxisY: this.worldAxisY - (this.controlUnit?.position.y || 0) - height / 2,
    });
  }

  private unitDraw() {
    const { ctx: layerMapCtx } = this.getLayer('layer-map');

    this.units.forEach((unit) => {
      unit.draw(layerMapCtx, {
        worldAxisX: this.worldAxisX - GAME_CONF.UNIT_CONF.DEFAULT.SIZE.X / 2 - (this.controlUnit?.position.x || 0),
        worldAxisY: this.worldAxisY - GAME_CONF.UNIT_CONF.DEFAULT.SIZE.Y / 2 - (this.controlUnit?.position.y || 0),
      });
      // unit.update();
    });
    if (this.controlUnit) {
      this.controlUnit.draw(layerMapCtx, {
        worldAxisX: this.worldAxisX - GAME_CONF.UNIT_CONF.DEFAULT.SIZE.X / 2 - (this.controlUnit.position.x || 0),
        worldAxisY: this.worldAxisY - GAME_CONF.UNIT_CONF.DEFAULT.SIZE.Y / 2 - (this.controlUnit.position.y || 0),
      });
    }
  }

  private draw(time: number = 0) {
    // 화면 초기화
    this.clearDraw();
    // const origin = time;
    time *= 0.001;
    const now = Math.floor(time);
    this.tiktok(time);

    const { joystick } = this.engine.eventManager.joystickEvent;

    this.mapDraw();
    // this.engine.gameMapManager.collision(joystick);
    this.unitDraw();

    if (this.currentMap && this.controlUnit) {
      if (this.controlUnit.state === UnitState.Idle) {
        const velocity = this.controlUnit.increaseSpeed;
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

    requestAnimationFrame(this.draw.bind(this));
    this.prevTime = now;
  }
}

export default Renderer;
