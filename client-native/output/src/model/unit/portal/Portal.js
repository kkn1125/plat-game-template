import { PortalSprites } from '@/source/sprites';
import { makeId } from '@util/makeId';
import Unit from '../Unit';
export default class Portal extends Unit {
    constructor(name, option, forwardMap) {
        super(name, option);
        Object.defineProperty(this, "forwardMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = makeId('portal');
        this.setSprites(PortalSprites);
        if (forwardMap) {
            this.forwardMap = forwardMap;
        }
    }
    setForwardMap(forwardMap) {
        this.forwardMap = forwardMap;
    }
    forward(unit) {
        const forwardMap = this.forwardMap;
        const { x, y } = forwardMap.defaultSpawnPosition;
        unit.location.locate = forwardMap.name;
        unit.setPosition(x, y);
    }
    drawCharacter(ctx, { worldAxisX, worldAxisY }) {
        // ctx.fillStyle = this.unitColor;
        const moveScreenX = this.position.x;
        const moveScreenY = this.position.y;
        const positionX = worldAxisX + moveScreenX;
        const positionY = worldAxisY + moveScreenY;
        const frame = Math.floor((this.frame / (this.FPS * 0.15)) % this.limitFrame);
        const cropPositionX = this.cropPadX + frame * this.cropPadX; // next frame
        const cropPositionY = this.cropPadY + this.gazeValue; // gaze
        const cropSizeX = this.cropSizeX - this.cropPadX * 2;
        const cropSizeY = this.cropSizeY - this.cropPadY * 2;
        // 스프라이츠 표시
        ctx.drawImage(this.sprites, cropPositionX, cropPositionY, cropSizeX, cropSizeY, positionX - 5, positionY - 10, this.size.x + 10, this.size.y + 10);
        this.frame = this.frame + 1;
    }
}
