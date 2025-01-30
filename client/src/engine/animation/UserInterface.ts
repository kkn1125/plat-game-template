import GAME_CONF from "@config/game.conf";
import GameEngine from "@core/GameEngine";
import Question from "@model/option/Question";
import Item from "@model/unit/object/Item";
import Player from "@model/unit/player/Player";
import octicons from "@primer/octicons";
import { Gun } from "@store/items/weapon/Gun";
import { $ } from "@util/$";
import Logger from "@util/Logger";
import { makeId } from "@util/makeId";
import { GameMode, GameState } from "@variable/constant";
import { makeAutoObservable } from "mobx";

export default class UserInterface {
  logger = new Logger<UserInterface>(this);
  id = makeId("ui");
  engine: GameEngine;
  readonly INTERFACE: HTMLElement = document.getElementById(
    "interface"
  ) as HTMLElement;
  readonly APP: HTMLElement = document.getElementById("app") as HTMLElement;
  canvasMap: Map<
    Id,
    { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D }
  > = new Map();
  eventMap: Map<Id, (e: Event & UIEvent & MouseEvent) => void> = new Map();

  constructor(engine: GameEngine) {
    this.engine = engine;
    makeAutoObservable(this);
    // this.createLayer("layer-map", true);
    // this.createLayer("layer-unit", true);
    // this.createLayer("layer-portal", true);
    // this.createLayer("layer-map-object", true);
    // this.createLayer("layer-unit-label", true);
    // this.createInterface();

    // switch (engine.gameMode) {
    //   case GameMode.Test: {
    //     const user = new Player("test-user");
    //     const position =
    //       this.engine.gameMapManager.currentMap?.defaultSpawnPosition;
    //     user.setPosition(position?.x ?? 0, position?.y ?? 0);
    //     this.engine.setControlUnit(user);
    //     user.increaseSpeed =
    //       GAME_CONF.UNIT_CONF.DEFAULT.CONTROL_UNIT.INCREASE_SPEED;
    //     break;
    //   }
    //   case GameMode.Single:
    //     this.createSinglePlayLoginDialog();
    //     break;
    //   case GameMode.Multiple:
    //     this.createMultiPlayLoginDialog();
    //     break;
    //   default:
    //     break;
    // }
  }

  get eventManager() {
    return this.engine.eventManager;
  }

  button(
    content: (options?: { height?: number | undefined }) => string,
    size: number,
    helper: string
  ) {
    return `<button class="btn-circle rounded-circle transition helper" content="${helper}">${content(
      { height: size }
    )}</button>`;
  }

  createInterface() {
    const ui = document.createElement("div");
    ui.id = "user-interface";
    ui.classList.add("d-flex", "rounded", "gap-1");
    ui.innerHTML = `
      ${this.button(octicons.gear.toSVG, 30, "setting")}
      ${this.button(octicons["three-bars"].toSVG, 30, "menu")}
      ${this.button(octicons.home.toSVG, 30, "home")}
    `.trim();
    const conversation = document.createElement("div");
    conversation.id = "conversation";
    conversation.classList.add("rounded", "centeredX", "hide");
    conversation.insertAdjacentHTML(
      "beforeend",
      `<h2 class="title">Conversation</h2>
      <p class="conversation"></p>
      <div class="btn-group">
        <button class="cancel btn btn-error rounded">취소</button>
        <button class="next btn btn-primary rounded">Next</button>
      </div>`.trim()
    );
    this.INTERFACE.appendChild(conversation);
    this.INTERFACE.appendChild(ui);
  }

  /* Renderer 전용 */
  handleCanvasResize(canvas: HTMLCanvasElement) {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }

  getLayer(id: Id) {
    return this.canvasMap.get(id) as {
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
    };
  }

  addLayer({
    id,
    canvas,
    ctx,
  }: {
    id: string;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
  }) {
    ctx.globalAlpha = 1;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    window.addEventListener(
      "resize",
      this.handleCanvasResize.bind(this, canvas)
    );

    this.canvasMap.set(id, { canvas, ctx });

    // if (useScale) {
    const fields = this.engine.gameMapManager.currentMap?.fields;

    if (fields) {
      ctx.translate(
        (innerWidth * (1 - GAME_CONF.SCALE)) / 2,
        (innerHeight * (1 - GAME_CONF.SCALE)) / 2
      );
    }
    ctx.scale(GAME_CONF.SCALE, GAME_CONF.SCALE);
    // }

    this.engine.state = GameState.Prepare;
  }

  createLayer(id: Id, useScale: boolean = false) {
    this.logger.scope("CreateLayer").debug(`${id} 레이어 생성`);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.id = id;
    ctx.globalAlpha = 1;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    window.addEventListener(
      "resize",
      this.handleCanvasResize.bind(this, canvas)
    );

    this.canvasMap.set(id, { canvas, ctx });

    if (useScale) {
      const fields = this.engine.gameMapManager.currentMap?.fields;

      if (fields) {
        ctx.translate(
          (innerWidth * (1 - GAME_CONF.SCALE)) / 2,
          (innerHeight * (1 - GAME_CONF.SCALE)) / 2
        );
      }
      ctx.scale(GAME_CONF.SCALE, GAME_CONF.SCALE);
    }

    return { canvas, ctx };
  }

  login(mode: GameMode, idPw?: { id: string; pw: string }) {
    const position =
      this.engine.gameMapManager.currentMap?.defaultSpawnPosition;
    if (mode === GameMode.Multiple && idPw) {
      this.engine.gameMode = GameMode.Multiple;
      const payload = {
        type: "login",
        id: idPw.id,
        pw: idPw.pw,
        mode: mode,
        x: position?.x ?? 0,
        y: position?.y ?? 0,
      };
      this.engine.socket.send(payload);
    } else if (mode === GameMode.Single) {
      this.engine.gameMode = GameMode.Single;
      // console.log(this.engine.gameMode);
      this.engine.eventManager.emit(`loginUser`, {
        id: "Single",
        x: position?.x ?? 0,
        y: position?.y ?? 0,
      });
    } else if (mode === GameMode.Test) {
      this.engine.gameMode = GameMode.Test;
      const user = new Player("test-user");
      const position =
        this.engine.gameMapManager.currentMap?.defaultSpawnPosition;
      user.setPosition(position?.x ?? 0, position?.y ?? 0);
      this.engine.setControlUnit(user);
      user.increaseSpeed =
        GAME_CONF.UNIT_CONF.DEFAULT.CONTROL_UNIT.INCREASE_SPEED;
      user.inventory.addItem(Gun);
    }
  }

  // login(e: MouseEvent) {
  //   const button = e.target as HTMLElement;
  //   if (button && button.tagName === "BUTTON") {
  //     const id = (
  //       button
  //         .closest("#login-dialog")
  //         ?.querySelector("#id") as HTMLInputElement
  //     )?.value;
  //     const pw = (
  //       button
  //         .closest("#login-dialog")
  //         ?.querySelector("#pw") as HTMLInputElement
  //     )?.value;
  //     // this.eventManager.emit(`loginUser`, { id, pw });

  //     const position =
  //       this.engine.gameMapManager.currentMap?.defaultSpawnPosition;
  //     if (this.engine.gameMode === GameMode.Multiple) {
  //       const payload = {
  //         type: "login",
  //         id: id,
  //         pw,
  //         mode: this.engine.gameMode,
  //         x: position?.x ?? 0,
  //         y: position?.y ?? 0,
  //       };
  //       this.engine.socket.send(payload);
  //     } else if (this.engine.gameMode === GameMode.Single) {
  //       // console.log(this.engine.gameMode);
  //       this.engine.eventManager.emit(`loginUser`, {
  //         id: "Single",
  //         x: position?.x ?? 0,
  //         y: position?.y ?? 0,
  //       });
  //     }

  //     (button as HTMLElement)?.remove();
  //     this.closeLoginDialog();
  //     const handler = this.eventMap.get("login");
  //     if (handler) {
  //       window.removeEventListener("click", handler);
  //       this.eventMap.delete("login");
  //     }
  //   }
  // }

  closeLoginDialog() {
    $("#login-dialog")?.remove();
  }

  // createSinglePlayLoginDialog() {
  //   const loginDialog = document.createElement("div");
  //   loginDialog.id = "login-dialog";
  //   loginDialog.classList.add("rounded", "centered");
  //   loginDialog.innerHTML = `
  //         <h2>Login</h2>
  //         <button class="btn btn-primary">로그인</button>
  //     `.trim();
  //   const handler = this.login.bind(this);
  //   this.eventMap.set("login", handler);
  //   loginDialog.addEventListener("click", handler);
  //   this.INTERFACE.appendChild(loginDialog);
  // }

  // createMultiPlayLoginDialog() {
  //   const loginDialog = document.createElement("div");
  //   loginDialog.id = "login-dialog";
  //   loginDialog.classList.add("rounded", "centered");
  //   loginDialog.innerHTML = `
  //         <h2>Login</h2>
  //         <input id="id" placeholder="ID" type="text"></input>
  //         <input id="pw" placeholder="PASSWORD" type="password"></input>
  //         <button class="btn btn-primary">로그인</button>
  //     `.trim();

  //   const handler = this.login.bind(this);
  //   this.eventMap.set("login", handler);
  //   loginDialog.addEventListener("click", handler);
  //   this.INTERFACE.appendChild(loginDialog);
  // }

  conversation(question: Question) {
    const conversation = $("#conversation") as HTMLDivElement;
    const content = conversation.querySelector(
      ".conversation"
    ) as HTMLDivElement;
    const npcConversation = question.getNext();
    const title = conversation.querySelector(".title") as HTMLDivElement;

    let result = npcConversation.next();
    const handler = () => {
      result = npcConversation.next();
      if (result.done) {
        conversation.classList.add("hide");
        this.engine.eventManager.close("conversationCancel");
        this.engine.eventManager.close("conversationNext");
        question.npc.endConversation();
      } else {
        content.innerHTML = result.value;
      }
    };
    const handleCancel = () => {
      conversation.classList.add("hide");
      this.engine.eventManager.close("conversationCancel");
      this.engine.eventManager.close("conversationNext");
      question.npc.endConversation();
    };

    if (question.scripts.length > 0) {
      title.innerHTML = `[${question.npc.constructor.name.toUpperCase()}] ${
        question.npc.name
      }`;
      this.engine.eventManager.listen("conversationNext", handler);
      this.engine.eventManager.listen("conversationCancel", handleCancel);

      if (conversation.classList.contains("hide")) {
        conversation.classList.remove("hide");
      }

      content.innerHTML = question.current;
    } else {
      conversation.classList.add("hide");
    }
  }

  itemCell(item: Item | null, x: number, y: number) {
    if (item === null) {
      return `<td class="item" data-index-x="${x}" data-index-y="${y}">no item</td>`;
    }
    return `<td class="item" data-index-x="${x}" data-index-y="${y}">${item.name}</td>`;
  }

  openInventory() {
    if (!this.engine.controlUnit) return;
    const inventoryDialog = document.createElement("div");
    inventoryDialog.id = "inventory";
    inventoryDialog.classList.add("rounded", "centered");
    // console.log(this.engine.controlUnit);
    // console.log(this.engine.controlUnit.inventory);
    inventoryDialog.innerHTML = `
              <h2>Inventory</h2>
              <div id="inventory-wrap">
                <table>
                  <tbody>
                  ${this.engine.controlUnit.inventory.slots
                    .map((row, y) => {
                      return `<tr>
                    ${row
                      .map((cell, x) => {
                        return this.itemCell(cell, x, y);
                      })
                      .join("")}</tr>`;
                    })
                    .join("")}
                  </tbody>
                </table>
              </div>
              <hr>
              <div class="gold">${this.engine.controlUnit.gold}원</div>
      `.trim();

    // const handler = this.login.bind(this);
    // this.eventMap.set('inventory', handler);
    // inventoryDialog.addEventListener('click', handler);
    this.INTERFACE.appendChild(inventoryDialog);
  }

  closeInventory() {
    $("#inventory")?.remove();
  }

  updateInventory() {
    this.closeInventory();
    this.openInventory();
  }
}
