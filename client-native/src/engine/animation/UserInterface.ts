import GameEngine from '@core/GameEngine';
import { $ } from '@util/$';
import Logger from '@util/Logger';
import { makeId } from '@util/makeId';
import octicons from '@primer/octicons';
import Question from '@model/unit/option/Question';

export default class UserInterface {
  logger = new Logger<UserInterface>(this);
  id = makeId('ui');
  engine: GameEngine;
  readonly INTERFACE: HTMLElement = document.getElementById('interface') as HTMLElement;
  readonly APP: HTMLElement = document.getElementById('app') as HTMLElement;
  canvasMap: Map<Id, { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D }> = new Map();
  eventMap: Map<Id, (e: Event & UIEvent & MouseEvent) => void> = new Map();

  constructor(engine: GameEngine) {
    this.engine = engine;
    this.createLayer('layer-map');
    this.createLayer('layer-unit');
    this.createInterface();
    this.createLoginDialog();
  }

  get eventManager() {
    return this.engine.eventManager;
  }

  button(content: (options?: { height?: number | undefined }) => string, size: number, helper: string) {
    return `<button class="btn rounded-circle transition helper" content="${helper}">${content({ height: size })}</button>`;
  }

  createInterface() {
    const ui = document.createElement('div');
    ui.id = 'user-interface';
    ui.classList.add('d-flex', 'rounded', 'gap-1');
    ui.innerHTML = `
      ${this.button(octicons.gear.toSVG, 30, 'setting')}
      ${this.button(octicons['three-bars'].toSVG, 30, 'menu')}
      ${this.button(octicons.home.toSVG, 30, 'home')}
    `.trim();
    const conversation = document.createElement('div');
    conversation.id = 'conversation';
    conversation.classList.add('rounded', 'centeredX', 'hide');
    conversation.insertAdjacentHTML(
      'beforeend',
      `<h2>Conversation</h2>
      <p class="conversation"></p>
      <button class="btn btn-primary">Next</button>`.trim(),
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

  createLayer(id: Id) {
    this.logger.scope('CreateLayer').debug(`${id} 레이어 생성`);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.id = id;
    ctx.globalAlpha = 1;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    window.addEventListener('resize', this.handleCanvasResize.bind(this, canvas));

    this.canvasMap.set(id, { canvas, ctx });
    return { canvas, ctx };
  }

  login(e: MouseEvent) {
    const button = e.target as HTMLElement;
    if (button.tagName === 'BUTTON') {
      this.eventManager.emit(`loginUser`);
      (e.target as HTMLElement)?.remove();
      $('#login-dialog')?.remove();
      const handler = this.eventMap.get('login');
      if (handler) {
        window.removeEventListener('click', handler);
        this.eventMap.delete('login');
      }
    }
  }

  createLoginDialog() {
    const loginDialog = document.createElement('div');
    loginDialog.id = 'login-dialog';
    loginDialog.classList.add('rounded', 'centered');
    loginDialog.innerHTML = `
        <h2>Login</h2>
        <button class="btn btn-primary">로그인</button>
    `.trim();
    const handler = this.login.bind(this);
    this.eventMap.set('login', handler);
    loginDialog.addEventListener('click', handler);
    this.INTERFACE.appendChild(loginDialog);
  }

  conversation(question: Question) {
    const conversation = $('#conversation') as HTMLDivElement;

    if (question.scripts.length > 0) {
      this.engine.eventManager.listen('conversationNext', (manager) => {
        const result = question.next();
        console.log(result);
        const current = question.current;
        if (!result) {
          conversation.classList.remove('hide');
        } else {
          const content = conversation.querySelector('.conversation') as HTMLDivElement;
          content.innerHTML = current;
        }
      });
      if (conversation.classList.contains('hide')) {
        conversation.classList.remove('hide');
      }

      question.start();
      const content = conversation.querySelector('.conversation') as HTMLDivElement;
      content.innerHTML = question.current;
    } else {
      conversation.classList.add('hide');
    }
  }
}
