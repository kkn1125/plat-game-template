import { CharacterSprites } from "@/source/sprites";
import hitCountEffect from "@animation/effect/hitCountEffect";
import GAME_CONF from "@config/game.conf";
import GameEngine from "@core/GameEngine";
import Location from "@model/option/Location";
import { Taecho } from "@store/maps";
import { makeId } from "@util/makeId";
import { ItemState, ItemType, UnitState } from "@variable/constant";
import Stat from "../../option/Stat";
import UseStat from "../implement/UseStat";
import Monster from "../monster/Monster";
import Unit from "../Unit";

export default class Item implements UseStat {
  engine!: GameEngine;
  id = makeId("item");
  name: string;
  stat: Stat = new Stat(this);
  size: XY = {
    x: GAME_CONF.ITEM_CONF.DEFAULT.SIZE.X,
    y: GAME_CONF.ITEM_CONF.DEFAULT.SIZE.Y,
  };
  position: XY = {
    x: 0,
    y: 0,
  };
  unit!: Unit;
  location: Location = new Location(Taecho.name);
  dropped: boolean = false;
  attackSpeed: number = 1;
  boundary: Unit | null = null;
  state: ItemState = ItemState.None;
  type: ItemType = ItemType.None;
  defaultDamage: number = GAME_CONF.ITEM_CONF.DEFAULT.DAMAGE;
  unitColor: string = "black";
  detectable: boolean = true;

  cropSizeX = 150;
  cropSizeY = 200;
  cropPadX = 10;
  cropPadY = 20;
  limitFrame = 4;
  FPS: number = 60;
  frameLate = 0.15;
  frame = 0;
  sprites = CharacterSprites;

  price: number = 0;

  constructor(name: string) {
    this.name = name;
  }

  get buyPrice() {
    return this.price;
  }

  get sellPrice() {
    const discount = 0.8;
    const sellPrice = this.price * discount;

    if (sellPrice < 1000) {
      return sellPrice;
    }

    const ceilFixedSecondSellPrice = Math.ceil(sellPrice / 100) * 100;
    return ceilFixedSecondSellPrice;
  }

  setPrice(price: number) {
    this.price = price;
  }

  setUnit(unit: Unit) {
    this.unit = unit;
  }

  setGameEngine(engine: GameEngine) {
    this.engine = engine;
  }

  drawDetect(
    ctx: CanvasRenderingContext2D,
    { worldAxisX, worldAxisY }: WorldAxis
  ) {
    if (this.boundary) {
      const moveScreenX = this.position.x;
      const moveScreenY = this.position.y;

      const positionX = worldAxisX + moveScreenX;
      const positionY = worldAxisY + moveScreenY;

      ctx.font = "bold 30px auto";

      /* stroke */
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;

      ctx.strokeText(
        "!",
        positionX + (this.size.x + 3 / 2) / 2,
        positionY - 40
      );

      /* font */
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText("!", positionX + this.size.x / 2, positionY - 40);
    }
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
    ctx.font = "bold 16px auto";

    /* stroke */
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;

    ctx.strokeText(
      this.name.toUpperCase(),
      positionX + (this.size.x + 3 / 2) / 2,
      positionY - 20
    );

    /* font */
    ctx.textAlign = "center";
    ctx.fillText(
      this.name.toUpperCase(),
      positionX + this.size.x / 2,
      positionY - 20
    );
  }

  drawCharacter(
    ctx: CanvasRenderingContext2D,
    { worldAxisX, worldAxisY }: WorldAxis
  ) {
    // ctx.fillStyle = this.unitColor;
    const moveScreenX = this.position.x;
    const moveScreenY = this.position.y;
    const positionX = worldAxisX + moveScreenX;
    const positionY = worldAxisY + moveScreenY;

    const frame =
      this.state === ItemState.None
        ? 0
        : Math.floor(
            (this.frame / (this.FPS * this.frameLate)) % this.limitFrame
          );
    const cropPositionX = this.cropPadX + frame * this.cropSizeX; // next frame
    const cropPositionY = this.cropPadY; // gaze
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
      this.size.y + 10
    );
    if (this.state === ItemState.Drop) {
      this.frame = this.frame + 1;
    } else {
      this.frame = 0;
    }
  }

  detect() {
    const currentMap = this.engine.gameMapManager.currentMap;
    const controlUnit = this.engine.controlUnit;
    if (!currentMap) return;
    if (!controlUnit) return;
    if (!this.detectable) return;
    // const fields = currentMap.fields;
    const mapSizeX = this.engine.gameMapManager.mapSizeX;
    const mapSizeY = this.engine.gameMapManager.mapSizeY;

    const { x, y } = this.position;
    const fieldX = Math.floor(x / mapSizeX);
    const fieldY = Math.floor(y / mapSizeY);

    const cUnitX = Math.floor(controlUnit.position.x / mapSizeX);
    const cUnitY = Math.floor(controlUnit.position.y / mapSizeY);
    if (
      fieldX - 1 <= cUnitX &&
      cUnitX <= fieldX + 1 &&
      fieldY - 1 <= cUnitY &&
      cUnitY <= fieldY + 1
    ) {
      this.boundary = controlUnit;
    } else {
      this.boundary = null;
    }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    labelCtx: CanvasRenderingContext2D,
    { worldAxisX, worldAxisY }: WorldAxis
  ): void {
    if (this.detectable) {
      this.detect();
      if (
        GAME_CONF.MAP_CONF.DISPLAY.DETECT[
          this.constructor.name.toUpperCase() as OptionName
        ]
      ) {
        this.drawDetect(ctx, { worldAxisX, worldAxisY });
      }
    }

    if (
      GAME_CONF.MAP_CONF.DISPLAY.NAME[
        this.constructor.name.toUpperCase() as OptionName
      ]
    ) {
      this.drawName(labelCtx, { worldAxisX, worldAxisY });
    }
    this.drawCharacter(ctx, { worldAxisX, worldAxisY });
  }

  attack(monster: Unit & Monster): void {
    const controlUnit = this.engine.controlUnit;
    // console.log("monster:", monster);
    // console.log("attack:", controlUnit);
    if (!controlUnit) return;
    if (controlUnit.isAttacking()) return;
    if (!controlUnit.rangeInAttack(monster)) return;
    const damage = controlUnit.damage;
    monster.decreaseHp(damage);
    if (monster.isDead) {
      this.engine.removeUnit(monster);
      if (monster.constructor.name === "Monster") {
        const exp = (monster as Monster).reward.getExp();
        const gold = (monster as Monster).reward.getGold();
        const item = (monster as Monster).reward.getItem();
        if (item) {
          controlUnit.inventory.addItem(item);
        }
        controlUnit.gold += gold;
        controlUnit.addExp(exp);
        monster.boundary = null;
        monster.state = UnitState.Die;
        setTimeout(() => {
          monster.position.x = monster.initPosition.x;
          monster.position.y = monster.initPosition.y;
          monster.hp = monster.maxHp;
          monster.mp = monster.maxMp;
          this.engine.addMonster(monster);
          monster.state = UnitState.Idle;
        }, monster.respawnTime * 1000);
      }
    }
    controlUnit.addConstraint("attack");
    setTimeout(() => {
      controlUnit.deleteConstraint("attack");
    }, controlUnit.attackLatestSpeed * 1000);

    const getPosition = (): XY => {
      const posX = this.engine.renderer.controlUnit?.position.x || 0;
      const posY = this.engine.renderer.controlUnit?.position.y || 0;
      const { rangeX, rangeY } = this.engine.renderer.getCameraMoveableRange(
        posX,
        posY
      );

      const worldAxisX =
        this.engine.renderer.worldAxisX -
        GAME_CONF.UNIT_CONF.DEFAULT.SIZE.X / 2 -
        posX +
        rangeX;
      const worldAxisY =
        this.engine.renderer.worldAxisY -
        GAME_CONF.UNIT_CONF.DEFAULT.SIZE.Y / 2 -
        posY +
        rangeY;

      const moveScreenX = monster.position.x;
      const moveScreenY = monster.position.y;
      const positionX = worldAxisX + moveScreenX;
      const positionY = worldAxisY + moveScreenY;
      return {
        x: positionX,
        y: positionY,
      };
    };

    const fx = hitCountEffect(
      damage.toString(),
      monster,
      getPosition.bind(controlUnit),
      1,
      [controlUnit.hitColor, "#ffffff"]
    );
    fx.run();
  }
}
