import { WINDOW_X_SIZE, WINDOW_Y_SIZE } from "@config/game.conf";
import { $ } from "@util/$";
import Logger from "@util/Logger";
import { makeId } from "@util/makeId";
import { addConstraint, deleteConstraint } from "@variable/globalControl";

export default class Effect {
  static effectList: [number, Effect][] = [];
  readonly logger: Logger<Effect>;

  state: "start" | "end" = "start";
  protected isProcessed!: (value: boolean) => void;

  events: Function[] = [];
  onDestroy(cb: () => void) {
    this.events.push(cb);
  }

  id: string;
  name: string;
  startTime: number = 0;
  before: number = 0;
  duration: number = 3;
  effect!: number | NodeJS.Timeout | undefined;
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  fadeInDuration: number = 1;
  fadeOutDuration: number = 1;

  constructor(name: string) {
    this.id = makeId("ex");
    this.name = name;

    this.logger = new Logger<Effect>(this);
    this.logger.log("Loaded Effect");
  }

  renderFx!: (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    opacity: number
  ) => void;

  setupCanvas() {
    /* UI 클래스 인스턴스 사용으로 인해 UI 생성자 반복 실행으로 대화 중복 버그 발생 */
    /* 렌더링과 관련한 객체이므로 도큐먼트 접근 허용 */
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    canvas.style.zIndex = "3000";
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.canvas = canvas;
    this.canvas.id = "effect-" + this.id;
    this.ctx = ctx;

    $("#root")?.append(this.canvas);

    this.handleResizeOnce();
    window.addEventListener("resize", this.handleResizeOnce.bind(this));
  }

  handleResizeOnce() {
    this.canvas.width = WINDOW_X_SIZE;
    this.canvas.height = WINDOW_Y_SIZE;
  }

  draw(time: number) {
    // if (isBlockedMove()) {
    //   this.logger.debug('이펙터 종료');
    //   this.destroy();
    //   return;
    // }
    time *= 0.001;

    if (!this.startTime) this.startTime = time;
    const elapsedTime = time - this.startTime;
    let opacity = 0;
    const holdDuration =
      this.duration - (this.fadeInDuration + this.fadeOutDuration);

    // 페이드 인
    if (elapsedTime <= this.fadeInDuration) {
      opacity = elapsedTime / this.fadeInDuration;
    }
    // 유지
    else if (elapsedTime <= this.fadeInDuration + holdDuration) {
      opacity = 1;
    }
    // 페이드 아웃
    else if (elapsedTime <= this.duration) {
      opacity =
        1 -
        (elapsedTime - this.fadeInDuration - holdDuration) /
          this.fadeOutDuration;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // time += 0.1;

    this.renderFx?.(
      this.ctx,
      this.canvas.width / 2,
      this.canvas.height / 2,
      opacity
    );

    const now = Math.floor(time);

    this.before = now;

    if (elapsedTime * 2 > this.duration) {
      deleteConstraint("changeMap");
    }
    if (elapsedTime < this.duration) {
      this.effect = requestAnimationFrame(this.draw.bind(this));
      Effect.effectList.push([this.effect, this]);
    } else {
      cancelAnimationFrame(this.effect as number);
      this.startTime = 0;
      this.before = 0;
      this.fadeInDuration = 1;
      this.fadeOutDuration = 1;
      this.duration = 3;
      this.effect = undefined;
      this.destroy();
      this.logger.log("이펙터 렌더링 완료");
    }
  }

  destroy() {
    cancelAnimationFrame(this.effect as number);
    window.removeEventListener("resize", this.handleResizeOnce.bind(this));
    this.canvas.remove();
    this.before = 0;
    this.events.forEach((cb) => {
      cb?.();
    });
    this.logger.info("이펙터 제거", this.id);
    this.events = [];
    this.isProcessed(true);
    this.state = "end";
  }

  run() {
    return new Promise((resolve) => {
      while (Effect.effectList.length > 0) {
        const effect = Effect.effectList.shift();
        if (effect) {
          cancelAnimationFrame(effect[0]);
          if (effect[1].state !== "end") {
            /* 상태 확인 및 중첩 destroy 버그 수정 */
            effect[1].destroy();
          }
        }
      }
      this.isProcessed = resolve;
      addConstraint("changeMap");
      this.setupCanvas();
      this.effect = requestAnimationFrame(this.draw.bind(this));
      Effect.effectList.push([this.effect, this]);
    });
  }
}
