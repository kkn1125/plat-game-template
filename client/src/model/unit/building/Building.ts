import GAME_CONF from "@config/game.conf";
import GameMap from "@model/gamemap/GameMap";
import { makeId } from "@util/makeId";
import { makeObservable, observable } from "mobx";
import Forwardable from "../implement/Forwardable";
import Unit from "../Unit";

export default class Building extends Unit implements Forwardable {
  forwardMap!: GameMap<Maps>;
  forwardPosition: XY = { x: 0, y: 0 };
  forwardUrl!: string;

  constructor(name: string, option?: HealthOption, forwardMap?: GameMap<Maps>) {
    super(name, option);
    this.id = makeId("building");
    if (forwardMap) {
      this.forwardMap = forwardMap;
    }
    makeObservable(this, {
      forwardMap: observable,
      forwardPosition: observable,
    });
  }

  setForwardSite(site: string) {
    this.forwardUrl = site;
  }

  setForwardMap(
    forwardMap: GameMap<Maps>,
    forwardPosition: XY,
    direction?: "top" | "bottom" | "left" | "right"
  ) {
    this.forwardMap = forwardMap;

    let x = 0;
    let y = 0;
    switch (direction) {
      case "top":
        y -= GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y;
        break;
      case "bottom":
        y += GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y;
        break;
      case "left":
        x -= GAME_CONF.MAP_CONF.DEFAULT.SIZE.X;
        break;
      case "right":
        x += GAME_CONF.MAP_CONF.DEFAULT.SIZE.X;
        break;
    }

    // this.forwardPositionMap.set(forwardMap.id, { x: forwardPosition.x + x, y: forwardPosition.y + y });
    this.forwardPosition = {
      x: forwardPosition.x * GAME_CONF.MAP_CONF.DEFAULT.SIZE.X + x,
      y: forwardPosition.y * GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y + y,
    };
  }

  // setForwardPositionByMap(gameMap: GameMap, direction?: 'top' | 'bottom' | 'left' | 'right') {
  //   let x = 0;
  //   let y = 0;
  //   switch (direction) {
  //     case 'top':
  //       y -= GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y;
  //       break;
  //     case 'bottom':
  //       y += GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y;
  //       break;
  //     case 'left':
  //       x -= GAME_CONF.MAP_CONF.DEFAULT.SIZE.X;
  //       break;
  //     case 'right':
  //       x += GAME_CONF.MAP_CONF.DEFAULT.SIZE.X;
  //       break;
  //   }
  //   console.log(this.name, '->', gameMap.name, x, y);
  //   // gameMap.setForwardedPosition(this.position.x + x, this.position.y + y);
  // }

  forwardSite() {
    if (confirm("사이트로 이동하시겠습니까?")) {
      const link = document.createElement("a");
      link.href = this.forwardUrl;
      link.target = "_blank";
      document.body.append(link);
      link.click();
      link.remove();
    }
  }

  forward(unit: Unit): void {
    const forwardMap = this.forwardMap;
    // const { x, y } = forwardMap.forwardedPosition.get(forwardMap);
    const { x, y } = this.forwardPosition;
    // const position = this.forwardPositionMap.get(this.id);
    // if (!position) return;
    // const { x, y } = position;
    unit.location.locate = forwardMap.name;
    unit.setPosition(x, y);
  }

  drawCharacterByScale(
    ctx: CanvasRenderingContext2D,
    { worldAxisX, worldAxisY }: WorldAxis,
    scale: number = 1,
    emboss: boolean = false
  ) {
    super.drawCharacterByScale(ctx, { worldAxisX, worldAxisY }, scale);
  }

  drawCharacter(
    ctx: CanvasRenderingContext2D,
    { worldAxisX, worldAxisY }: WorldAxis,
    emboss: boolean = false
  ) {
    super.drawCharacter(ctx, { worldAxisX, worldAxisY });
  }
}
