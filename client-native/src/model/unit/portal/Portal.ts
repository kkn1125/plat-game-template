import { PortalSprites } from '@/source/sprites';
import GameMap from '@model/gamemap/GameMap';
import { makeId } from '@util/makeId';
import Forwardable from '../implement/Forwardable';
import Unit from '../Unit';

export default class Portal extends Unit implements Forwardable {
  forwardMap!: GameMap;

  constructor(name: string, option?: HealthOption, forwardMap?: GameMap) {
    super(name, option);
    this.id = makeId('portal');
    this.setSprites(PortalSprites);
    if (forwardMap) {
      this.forwardMap = forwardMap;
    }
  }

  setForwardMap(forwardMap: GameMap) {
    this.forwardMap = forwardMap;
  }

  forward(unit: Unit): void {
    const forwardMap = this.forwardMap;
    const { x, y } = forwardMap.defaultSpawnPosition;
    unit.location.locate = forwardMap.name;
    unit.setPosition(x, y);
  }

  drawCharacter(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis) {
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
    ctx.drawImage(
      this.sprites,
      cropPositionX,
      cropPositionY,
      cropSizeX,
      cropSizeY,
      positionX - 5,
      positionY - 10,
      this.size.x + 10,
      this.size.y + 10,
    );
    this.frame = this.frame + 1;
  }
}
