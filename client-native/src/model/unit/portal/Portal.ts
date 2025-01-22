import { PortalSprites } from '@/source/sprites';
import GAME_CONF from '@config/game.conf';
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

  setForwardPositionByMap(gameMap: GameMap, direction?: 'top' | 'bottom' | 'left' | 'right') {
    let x = 0;
    let y = 0;
    switch (direction) {
      case 'top':
        y -= GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y;
        break;
      case 'bottom':
        y += GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y;
        break;
      case 'left':
        x -= GAME_CONF.MAP_CONF.DEFAULT.SIZE.X;
        break;
      case 'right':
        x += GAME_CONF.MAP_CONF.DEFAULT.SIZE.X;
        break;
    }
    gameMap.setForwardedPosition(this.position.x + x, this.position.y + y);
  }

  forward(unit: Unit): void {
    const forwardMap = this.forwardMap;
    const { x, y } = forwardMap.forwardedPosition;
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
