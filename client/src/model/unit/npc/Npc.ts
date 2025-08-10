import GAME_CONF from "@config/game.conf";
import Chatting from "@model/option/Chatting";
import { makeId } from "@util/makeId";
import { UnitState } from "@variable/constant";
import { addConstraint, deleteConstraint } from "@variable/globalControl";
import Question from "../../option/Question";
import AutoMoveable from "../implement/AutoMoveable";
import Unit from "../Unit";

export default class Npc extends Unit implements AutoMoveable {
  isChatting: boolean = false;
  chattingTime: number = 0;
  questionHistory: {
    name: string;
    type: string;
    question: Question;
  }[] = [];

  routine!: (unit: Unit) => void;

  chatting = new Chatting();
  question!: Question | null;

  constructor(name: string, option?: HealthOption) {
    super(name, option);
    this.id = makeId("npc");

    this.increaseSpeed = GAME_CONF.NPC_CONF.DEFAULT.INCREASE_SPEED;

    // this.question = new Question(this);
    // this.questionHistory = [this.question];
  }

  isIncludeQuestQuestion(quests: Map<string, QuestRealMap>) {
    console.log("🚀 ~ Npc ~ isIncludeQuestQuestion ~ quests:", quests);
    const isIncludeQuest = this.questionHistory.find((q) =>
      Array.from(quests.values()).some((quest) => quest.quest.id === q.name)
    );
    return isIncludeQuest;
  }

  addQuestion(question: Question, type?: string, name?: string) {
    this.questionHistory.push({
      name: name ?? this.name,
      type: type ?? "question",
      question: question,
    });
    this.question = question;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    labelCtx: CanvasRenderingContext2D,
    { worldAxisX, worldAxisY }: WorldAxis
  ): void {
    if (!this.boundary) {
      this.autoMove();
    } else {
      this.state = UnitState.Idle;

      const radians = Math.atan2(
        this.boundary.position.y - this.position.y,
        this.boundary.position.x - this.position.x
      );
      const value = parseInt(((radians / Math.PI) * 10 * 18 + 180).toString());

      if (45 >= value || value > 315) {
        this.engine.eventManager.joystickEvent.manualKeyDown(this, "a");
      }

      if (45 < value && value <= 135) {
        this.engine.eventManager.joystickEvent.manualKeyDown(this, "w");
      }

      if (135 < value && value <= 225) {
        this.engine.eventManager.joystickEvent.manualKeyDown(this, "d");
      }

      if (225 < value && value <= 315) {
        this.engine.eventManager.joystickEvent.manualKeyDown(this, "s");
      }
    }
    super.draw(ctx, labelCtx, { worldAxisX, worldAxisY });

    if (this.isChatting) {
      this.drawChatting(labelCtx, { worldAxisX, worldAxisY });
      if (this.chattingTime === 0) {
        if (Math.floor(Math.random() * 10) + 10 < 15) {
          this.chatting.setNextRandom();
          this.isChatting = false;
          this.chattingTime = Math.floor(Math.random() * 200) + 200;
        }
      } else {
        this.chattingTime--;
      }
    } else {
      if (this.chattingTime === 0) {
        if (Math.floor(Math.random() * 10) + 10 < 15) {
          this.chattingTime = Math.floor(Math.random() * 200) + 200;
          this.isChatting = true;
        }
      } else {
        this.chattingTime--;
      }
    }
  }

  drawChatting(
    ctx: CanvasRenderingContext2D,
    { worldAxisX, worldAxisY }: WorldAxis
  ) {
    const moveScreenX = this.position.x;
    const moveScreenY = this.position.y;
    const positionX = worldAxisX + moveScreenX;
    const positionY = worldAxisY + moveScreenY;
    const text = this.chatting.currentComment;
    const offset = 70;
    const padding = 10;
    const lineSpacing = 4; // 줄 간격 추가

    ctx.font = `bold 14px Galmuri9`;

    // text가 배열이면 각 줄의 길이를 측정하여 가장 긴 줄을 기준으로 말풍선 크기 결정
    const lines = Array.isArray(text) ? text : [text]; // string일 경우 배열로 변환
    const textMetrics = lines.map((line) => ctx.measureText(line));
    const textWidths = textMetrics.map((info) => info.width);
    const maxWidth = Math.max(...textWidths); // 가장 긴 줄의 너비를 기준으로 말풍선 크기 결정
    const textHeight = 16; // 기본 줄 높이

    // 말풍선 크기 계산
    const bubbleWidth = maxWidth + padding * 2;
    const bubbleHeight =
      textHeight * lines.length +
      padding * 2 +
      (lines.length - 1) * lineSpacing;

    // 말풍선 위치 조정
    const bubbleX = positionX - bubbleWidth / 2;
    const bubbleY = positionY - offset - bubbleHeight;

    /* stroke */
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.strokeRect(
      bubbleX + this.size.x / 2,
      bubbleY,
      bubbleWidth,
      bubbleHeight
    );

    /* 배경 */
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(bubbleX + this.size.x / 2, bubbleY, bubbleWidth, bubbleHeight);

    /* 텍스트 */
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000000";

    // 여러 줄 렌더링
    lines.forEach((line, index) => {
      const lineY =
        bubbleY + padding + textHeight / 2 + index * (textHeight + lineSpacing);
      ctx.fillText(line, positionX + this.size.x / 2, lineY);
    });
  }

  setRoutine(routine: (unit: Unit) => void) {
    this.routine = routine;
  }

  autoMove() {
    this.routine?.(this);
  }

  /* NPC 기능 */
  startConversation() {
    if (!this.question) {
      return null;
    }
    this.question?.start();
    addConstraint("move");
    return this.question;
  }

  endConversation() {
    if (!this.question) {
      return null;
    }
    deleteConstraint("move");
    this.question?.end();
  }
}
