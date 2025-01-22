import GAME_CONF from '@config/game.conf';
import Logger from '@util/Logger';
import { UnitState } from '@variable/constant';
class Renderer {
    constructor(engine) {
        Object.defineProperty(this, "prevTime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Logger(this)
        });
        Object.defineProperty(this, "engine", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
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
        if (!this.controlUnit)
            return { worldAxisX: 0, worldAxisY: 0 };
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
    animate() {
        requestAnimationFrame(this.draw.bind(this));
    }
    ticktock(time) {
        const now = Math.floor(time);
        if (now !== this.prevTime) {
            // 애니메이션 초당 처리 영역
        }
    }
    clearDraw() {
        for (const { canvas, ctx } of this.engine.ui.canvasMap.values()) {
            ctx.clearRect(0 - innerWidth, 0 - innerHeight, (canvas.width * 2) / GAME_CONF.SCALE, (canvas.height * 2) / GAME_CONF.SCALE);
            // ctx.save(); // 이전 상태 저장
            // ctx.translate(translateX, translateY); // 이동
            // ctx.scale(scale, scale); // 스케일 적용
        }
    }
    afterDraw() {
        for (const { canvas, ctx } of this.engine.ui.canvasMap.values()) {
            // ctx.restore(); // 상태 복원
        }
    }
    getCameraMoveableRange(positionX, positionY) {
        const fieldSizeX = GAME_CONF.MAP_CONF.DEFAULT.SIZE.X * GAME_CONF.SCALE;
        const fieldSizeY = GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y * GAME_CONF.SCALE;
        const fieldXLength = this.currentMap?.fields[0].length || 0;
        const fieldYLength = this.currentMap?.fields.length || 0;
        const fieldWidth = fieldXLength * fieldSizeX;
        const fieldHeight = fieldYLength * fieldSizeY;
        // 유닛 카메라 고정 범위 X
        const limitScreenX = fieldWidth / 2;
        // 유닛 카메라 고정 범위 Y
        const limitScreenY = fieldHeight / 2;
        // 윈도우 넘어가는 맵의 길이 만큼
        const windowOverflowX = innerWidth / 2 > limitScreenX ? 0 : limitScreenX - innerWidth / 2;
        const windowOverflowY = innerHeight / 2 > limitScreenY ? 0 : limitScreenY - innerHeight / 2;
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
    mapDraw() {
        const { ctx: layerMapCtx } = this.engine.ui.getLayer('layer-map');
        if (!this.currentMap)
            return;
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
            this.currentMap.drawObject(layerMapCtx, {
                worldAxisX: this.worldAxisX - positionX - width / 2 + rangeX,
                worldAxisY: this.worldAxisY - positionY - height / 2 + rangeY,
            }, true);
        }
    }
    get sameLocationPortals() {
        return this.portals.filter((portal) => this.currentMap?.name === portal.location.locate);
    }
    get sameLocationUnits() {
        return this.units.filter((unit) => this.currentMap?.name === unit.location.locate);
    }
    portalDraw() {
        const { ctx: layerMapCtx } = this.engine.ui.getLayer('layer-portal');
        this.sameLocationPortals.forEach((portal) => {
            const positionX = this.controlUnit?.position.x || 0;
            const positionY = this.controlUnit?.position.y || 0;
            const { rangeX, rangeY } = this.getCameraMoveableRange(positionX, positionY);
            portal.draw(layerMapCtx, {
                worldAxisX: this.worldAxisX - GAME_CONF.UNIT_CONF.DEFAULT.SIZE.X / 2 - positionX + rangeX,
                worldAxisY: this.worldAxisY - GAME_CONF.UNIT_CONF.DEFAULT.SIZE.Y / 2 - positionY + rangeY,
            });
        });
    }
    unitDraw() {
        const { ctx: layerMapCtx } = this.engine.ui.getLayer('layer-unit');
        this.sameLocationUnits.forEach((unit) => {
            const positionX = this.controlUnit?.position.x || 0;
            const positionY = this.controlUnit?.position.y || 0;
            const { rangeX, rangeY } = this.getCameraMoveableRange(positionX, positionY);
            unit.draw(layerMapCtx, {
                worldAxisX: this.worldAxisX - GAME_CONF.UNIT_CONF.DEFAULT.SIZE.X / 2 - positionX + rangeX,
                worldAxisY: this.worldAxisY - GAME_CONF.UNIT_CONF.DEFAULT.SIZE.Y / 2 - positionY + rangeY,
            });
        });
        if (this.controlUnit && this.currentMap) {
            const { worldAxisX, worldAxisY } = this.worldPosition;
            this.controlUnit.draw(layerMapCtx, {
                worldAxisX,
                worldAxisY,
            });
            this.controlUnit.around();
        }
    }
    draw(time = 0) {
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
