import Portal from './Portal';

export default class AreaPortal extends Portal {
  drawCharacter(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis) {
    // ctx.fillStyle = this.unitColor;
    const moveScreenX = this.position.x;
    const moveScreenY = this.position.y;
    const positionX = worldAxisX + moveScreenX;
    const positionY = worldAxisY + moveScreenY;

    // ctx.fillRect(positionX, positionY, this.size.x, this.size.y);

    // const frame = Math.floor((this.frame / (this.FPS * 0.15)) % this.limitFrame);
    // const cropPositionX = this.cropPadX + frame * this.cropPadX; // next frame
    // const cropPositionY = this.cropPadY + this.gazeValue; // gaze
    // const cropSizeX = this.cropSizeX - this.cropPadX * 2;
    // const cropSizeY = this.cropSizeY - this.cropPadY * 2;
    // 스프라이츠 표시
    ctx.drawImage(
      this.sprites,
      33.5, // aaa
      0,
      32.5, // a
      32.5,
      positionX - 10, // aaa * 2
      positionY - 5, // 육지 나무 Y 축 위치
      this.size.x + 20, // a * 2
      this.size.y + 20, // 물 위 나무 Y 축 위치
      // this.sprites,
      // 33,
      // 0,
      // 33,
      // 33,
      // positionX - 5,
      // positionY - 10,
      // this.size.x + 10,
      // this.size.y + 10,
    );
    // this.frame = this.frame + 1;
  }
}
