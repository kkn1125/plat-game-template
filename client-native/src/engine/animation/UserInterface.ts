import GameEngine from '@core/GameEngine';
import { $ } from '@util/$';
import Logger from '@util/Logger';
import { makeId } from '@util/makeId';

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
    this.createLoginDialog();
  }

  get eventManager() {
    return this.engine.eventManager;
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
    loginDialog.innerHTML = `
      <div id="login-dialog" class="rounded centered">
        <h2>Login</h2>
        <button class="btn btn-primary">로그인</button>
      </div>  
    `.trim();
    const handler = this.login.bind(this);
    this.eventMap.set('login', handler);
    loginDialog.addEventListener('click', handler);
    this.INTERFACE.append(loginDialog);
  }
}
