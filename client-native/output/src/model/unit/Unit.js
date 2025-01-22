import { CharacterSprites } from '@/source/sprites';
import GAME_CONF from '@config/game.conf';
import Logger from '@util/Logger';
import { makeId } from '@util/makeId';
import { UnitState } from '@variable/constant';
import Equipment from './option/Equipment';
import Location from './option/Location';
import Stat from './option/Stat';
class Unit {
    constructor(name, option) {
        Object.defineProperty(this, "order", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "joystick", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                w: false,
                a: false,
                d: false,
                s: false,
            }
        });
        Object.defineProperty(this, "engine", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Logger(this)
        });
        Object.defineProperty(this, "location", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Location('Town1')
        });
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: makeId('unit')
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "position", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                x: 0,
                y: 0,
            }
        });
        Object.defineProperty(this, "size", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                x: GAME_CONF.UNIT_CONF.DEFAULT.SIZE.X,
                y: GAME_CONF.UNIT_CONF.DEFAULT.SIZE.Y,
            }
        });
        Object.defineProperty(this, "velocity", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                x: 0,
                y: 0,
            }
        });
        Object.defineProperty(this, "increaseSpeed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: GAME_CONF.UNIT_CONF.DEFAULT.INCREASE_SPEED
        });
        Object.defineProperty(this, "speed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: GAME_CONF.UNIT_CONF.DEFAULT.SPEED
        });
        Object.defineProperty(this, "hp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: GAME_CONF.UNIT_CONF.DEFAULT.HP
        });
        Object.defineProperty(this, "mp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: GAME_CONF.UNIT_CONF.DEFAULT.MP
        });
        Object.defineProperty(this, "maxHp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: GAME_CONF.UNIT_CONF.DEFAULT.HP
        });
        Object.defineProperty(this, "maxMp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: GAME_CONF.UNIT_CONF.DEFAULT.MP
        });
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: UnitState.Idle
        });
        Object.defineProperty(this, "stat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Stat(this)
        });
        Object.defineProperty(this, "equipment", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Equipment(this)
        });
        Object.defineProperty(this, "defaultDamage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: GAME_CONF.UNIT_CONF.DEFAULT.DAMAGE
        });
        Object.defineProperty(this, "unitColor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'black'
        });
        Object.defineProperty(this, "cropSizeX", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 150
        });
        Object.defineProperty(this, "cropSizeY", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 200
        });
        Object.defineProperty(this, "cropPadX", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 10
        });
        Object.defineProperty(this, "cropPadY", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 20
        });
        Object.defineProperty(this, "limitFrame", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 4
        });
        Object.defineProperty(this, "FPS", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 60
        });
        Object.defineProperty(this, "frame", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "sprites", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: CharacterSprites
        });
        Object.defineProperty(this, "gaze", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: GAME_CONF.UNIT_CONF.DEFAULT.GAZE
        });
        // GameEngine 제어 유닛 등록 부분 참조
        Object.defineProperty(this, "detectable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "boundary", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "aroundUnits", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.name = name;
        if (option) {
            option.hp && (this.hp = option.hp);
            option.hp && (this.maxHp = option.hp);
            option.mp && (this.mp = option.mp);
        }
    }
    get isControlUnit() {
        return this === this.engine.controlUnit;
    }
    get minDamage() {
        return (this.defaultDamage + this.stat.str) * 10;
    }
    get maxDamage() {
        return +Math.floor((this.defaultDamage + this.stat.str + this.stat.dex * GAME_CONF.UNIT_CONF.INCREASE_DAMAGE_RATIO) * 10).toFixed(1);
    }
    get damageGap() {
        return +(this.maxDamage - this.minDamage + 1).toFixed(1);
    }
    get damage() {
        const rangeDamage = Math.floor(Math.random() * this.damageGap);
        return +((this.minDamage + rangeDamage) / 10).toFixed(1);
    }
    get fieldPosition() {
        const fields = this.engine.gameMapManager.currentMap?.fields;
        if (!fields)
            return [];
    }
    get gazeValue() {
        switch (this.gaze) {
            case 'bottom':
                return 0;
            case 'top':
                return 200;
            case 'left':
                return 400;
            case 'right':
                return 600;
            default:
                return 0;
        }
    }
    setLocation(gameMap) {
        this.location.locate = gameMap.name;
    }
    setSprites(sprites) {
        this.sprites = sprites;
    }
    setGameEngine(engine) {
        this.engine = engine;
    }
    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
    }
    setState(state) {
        this.state = state;
    }
    changeLocation(location) {
        this.logger.debug('위치 변경:', location);
        this.location.locate = location;
    }
    move(x, y) {
        this.position.x = this.position.x + x;
        this.position.y = this.position.y + y;
    }
    detect() {
        const currentMap = this.engine.gameMapManager.currentMap;
        const controlUnit = this.engine.controlUnit;
        if (!currentMap)
            return;
        if (!controlUnit)
            return;
        // const fields = currentMap.fields;
        const mapSizeX = this.engine.gameMapManager.mapSizeX;
        const mapSizeY = this.engine.gameMapManager.mapSizeY;
        const { x, y } = this.position;
        const fieldX = Math.floor(x / mapSizeX);
        const fieldY = Math.floor(y / mapSizeY);
        const cUnitX = Math.floor(controlUnit.position.x / mapSizeX);
        const cUnitY = Math.floor(controlUnit.position.y / mapSizeY);
        if (fieldX - 1 <= cUnitX && cUnitX <= fieldX + 1 && fieldY - 1 <= cUnitY && cUnitY <= fieldY + 1) {
            this.boundary = controlUnit;
        }
        else {
            this.boundary = null;
        }
    }
    around() {
        const currentMap = this.engine.gameMapManager.currentMap;
        const units = [...this.engine.sameLocationUnits, ...this.engine.sameLocationPortals];
        if (!currentMap)
            return;
        if (units.length === 0)
            return;
        // const fields = currentMap.fields;
        const mapSizeX = this.engine.gameMapManager.mapSizeX;
        const mapSizeY = this.engine.gameMapManager.mapSizeY;
        const { x, y } = this.position;
        const fieldX = Math.floor(x / mapSizeX);
        const fieldY = Math.floor(y / mapSizeY);
        for (const unit of units) {
            const cUnitX = Math.floor(unit.position.x / mapSizeX);
            const cUnitY = Math.floor(unit.position.y / mapSizeY);
            if (fieldX - 1 <= cUnitX && cUnitX <= fieldX + 1 && fieldY - 1 <= cUnitY && cUnitY <= fieldY + 1) {
                if (!this.aroundUnits.includes(unit)) {
                    this.aroundUnits.push(unit);
                }
            }
            else {
                this.aroundUnits = this.aroundUnits.filter((u) => u !== unit);
            }
        }
    }
    get closeUnit() {
        let closeUnit = null;
        const getDistance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        const { x, y } = this.position;
        console.log(this.aroundUnits);
        for (const unit of this.aroundUnits) {
            const { x: uX, y: uY } = unit.position;
            const distance = getDistance(x, y, uX, uY);
            if (!closeUnit) {
                closeUnit = unit;
            }
            else {
                if (distance < getDistance(x, y, closeUnit.position.x, closeUnit.position.y)) {
                    closeUnit = unit;
                }
            }
        }
        return closeUnit;
    }
    draw(ctx, { worldAxisX, worldAxisY }) {
        if (!this.isControlUnit && this.detectable) {
            this.detect();
            this.drawDetect(ctx, { worldAxisX, worldAxisY });
        }
        // if (this.isControlUnit && this.aroundUnits.length > 0 && this.closeUnit) {
        //   this.boundary = this.closeUnit;
        // } else {
        //   this.boundary = null;
        // }
        // 색상 표시
        // ctx.fillRect(positionX, positionY, this.size.x, this.size.y);
        this.drawName(ctx, { worldAxisX, worldAxisY });
        this.drawCharacter(ctx, { worldAxisX, worldAxisY });
    }
    drawDetect(ctx, { worldAxisX, worldAxisY }) {
        if (this.boundary) {
            const moveScreenX = this.position.x;
            const moveScreenY = this.position.y;
            const positionX = worldAxisX + moveScreenX;
            const positionY = worldAxisY + moveScreenY;
            ctx.font = 'bold 20px auto';
            /* stroke */
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.strokeText('!', positionX + (this.size.x + 3 / 2) / 2, positionY - 30);
            /* font */
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.fillText('!', positionX + this.size.x / 2, positionY - 30);
        }
    }
    drawName(ctx, { worldAxisX, worldAxisY }) {
        ctx.fillStyle = this.unitColor;
        const moveScreenX = this.position.x;
        const moveScreenY = this.position.y;
        const positionX = worldAxisX + moveScreenX;
        const positionY = worldAxisY + moveScreenY;
        ctx.font = 'bold 16px auto';
        /* stroke */
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.strokeText(this.name.toUpperCase(), positionX + (this.size.x + 3 / 2) / 2, positionY - 20);
        /* font */
        ctx.textAlign = 'center';
        ctx.fillText(this.name.toUpperCase(), positionX + this.size.x / 2, positionY - 20);
    }
    drawCharacter(ctx, { worldAxisX, worldAxisY }) {
        // ctx.fillStyle = this.unitColor;
        const moveScreenX = this.position.x;
        const moveScreenY = this.position.y;
        const positionX = worldAxisX + moveScreenX;
        const positionY = worldAxisY + moveScreenY;
        const frame = this.state === UnitState.Idle ? 0 : Math.floor((this.frame / (this.FPS * 0.15)) % this.limitFrame);
        const cropPositionX = this.cropPadX + frame * this.cropSizeX; // next frame
        const cropPositionY = this.cropPadY + this.gazeValue; // gaze
        const cropSizeX = this.cropSizeX - this.cropPadX * 2;
        const cropSizeY = this.cropSizeY - this.cropPadY * 2;
        // 스프라이츠 표시
        ctx.drawImage(this.sprites, cropPositionX, cropPositionY, cropSizeX, cropSizeY, positionX - 5, positionY - 10, this.size.x + 10, this.size.y + 10);
        if (this.state === UnitState.Move) {
            this.frame = this.frame + 1;
        }
        else {
            this.frame = 0;
        }
    }
    attack() {
        throw new Error('Method not implemented.');
    }
    getHp() {
        throw new Error('Method not implemented.');
    }
    getMp() {
        throw new Error('Method not implemented.');
    }
    decreaseHp(amount) {
        throw new Error('Method not implemented.');
    }
    decreaseMp(amount) {
        throw new Error('Method not implemented.');
    }
    getDamage() {
        throw new Error('Method not implemented.');
    }
}
export default Unit;
