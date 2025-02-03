import { ObjectSprites, OpacityObjectSprites } from "@/source/sprites";
import { makeId } from "@util/makeId";
import { makeObservable, observable } from "mobx";
import Building from "../Building";

export default class House extends Building {
  opacitySprites!: HTMLImageElement;

  constructor(name: string, option?: HealthOption) {
    super(name, option);
    this.id = makeId("building-house");
    this.detectable = false;
    this.sprites = ObjectSprites;
    this.opacitySprites = OpacityObjectSprites;
    this.unitColor = "#007bff";
    makeObservable(this, {
      opacitySprites: observable,
    });
    // this.size.x = GAME_CONF.UNIT_CONF.DEFAULT.SIZE.X * 5;
    // this.size.y = GAME_CONF.UNIT_CONF.DEFAULT.SIZE.Y * 5;
  }

  drawNameByScale(
    ctx: CanvasRenderingContext2D,
    { worldAxisX, worldAxisY }: WorldAxis,
    scale: number = 1
  ) {
    ctx.fillStyle = this.unitColor;
    const moveScreenX = this.position.x;
    const moveScreenY = this.position.y;
    const positionX = worldAxisX + moveScreenX;
    const positionY = worldAxisY + moveScreenY;
    ctx.font = `bold ${14 - scale * 10}px auto`;

    /* stroke */
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;

    ctx.strokeText(
      this.name.toUpperCase(),
      (positionX + (this.size.x + 3 / 2) / 2) * scale,
      (positionY - 120) * scale
    );

    /* font */
    ctx.textAlign = "center";
    ctx.fillText(
      this.name.toUpperCase(),
      (positionX + this.size.x / 2) * scale,
      (positionY - 120) * scale
    );
  }

  drawName(
    ctx: CanvasRenderingContext2D,
    { worldAxisX, worldAxisY }: WorldAxis
  ) {
    ctx.fillStyle = this.unitColor;
    const moveScreenX = this.position.x;
    const moveScreenY = this.position.y;
    const positionX = worldAxisX + moveScreenX;
    const positionY = worldAxisY + moveScreenY;
    ctx.font = "bold 20px auto";

    /* stroke */
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;

    ctx.strokeText(
      this.name.toUpperCase(),
      positionX + (this.size.x + 3 / 2) / 2,
      positionY - 220
    );

    /* font */
    ctx.textAlign = "center";
    ctx.fillText(
      this.name.toUpperCase(),
      positionX + this.size.x / 2,
      positionY - 220
    );
  }

  drawCharacterByScale(
    ctx: CanvasRenderingContext2D,
    { worldAxisX, worldAxisY }: WorldAxis,
    scale: number = 1,
    emboss: boolean = false
  ) {
    // ctx.fillStyle = this.unitColor;
    const moveScreenX = this.position.x;
    const moveScreenY = this.position.y;
    const positionX = worldAxisX + moveScreenX;
    const positionY = worldAxisY + moveScreenY;

    const padX = 100;
    const padY = 40;

    // ctx.fillRect(positionX - padX, positionY, this.size.x + padX * 2, this.size.y + 10);

    const overFlowX = 20;

    if (scale === 1) {
      if (emboss) {
        // 스프라이츠 표시
        ctx.drawImage(
          this.sprites,
          240,
          0,
          this.size.x + 105,
          this.size.y + 90,
          (positionX - padX - overFlowX) * scale,
          (positionY - padY * 2 + this.size.y - 200) * scale,
          (this.size.x + padX * 2 + overFlowX * 2) * scale,
          (this.size.y + overFlowX + padY * 2 + 70 - 15) * scale
        );
      } else {
        ctx.drawImage(
          this.sprites,
          240,
          0,
          this.size.x + 105,
          this.size.y + 180,
          (positionX - padX - overFlowX) * scale,
          (positionY - padY * 2 + this.size.y - 180) * scale,
          (this.size.x + padX * 2 + overFlowX * 2) * scale,
          (this.size.y + overFlowX + padY * 2 + 180 - 23) * scale
        );
      }
    } else {
      ctx.fillStyle = this.unitColor;
      ctx.fillRect(
        (positionX - padX / 2 - overFlowX / 2) * scale,
        (positionY + this.size.y - 120) * scale,
        (this.size.x + padX + overFlowX) * scale,
        (this.size.y + padY * 2) * scale
      );
    }

    this.frame = 0;
  }

  drawCharacter(
    ctx: CanvasRenderingContext2D,
    { worldAxisX, worldAxisY }: WorldAxis,
    emboss: boolean = false
  ) {
    // ctx.fillStyle = this.unitColor;
    const moveScreenX = this.position.x;
    const moveScreenY = this.position.y;
    const positionX = worldAxisX + moveScreenX;
    const positionY = worldAxisY + moveScreenY;

    const padX = 100;
    const padY = 40;

    // ctx.fillRect(positionX - padX, positionY, this.size.x + padX * 2, this.size.y + 10);

    const overFlowX = 20;

    if (emboss) {
      // 스프라이츠 표시
      ctx.drawImage(
        this.sprites,
        240,
        0,
        this.size.x + 105,
        this.size.y + 90,
        positionX - padX - overFlowX,
        positionY - padY * 2 + this.size.y - 200,
        this.size.x + padX * 2 + overFlowX * 2,
        this.size.y + overFlowX + padY * 2 + 70 - 15
      );
    } else {
      ctx.drawImage(
        this.sprites,
        240,
        0,
        this.size.x + 105,
        this.size.y + 180,
        positionX - padX - overFlowX,
        positionY - padY * 2 + this.size.y - 180,
        this.size.x + padX * 2 + overFlowX * 2,
        this.size.y + overFlowX + padY * 2 + 180 - 23
      );
    }

    this.frame = 0;
  }
}
