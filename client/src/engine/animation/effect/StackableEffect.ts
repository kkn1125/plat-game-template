import Effect from './Effect';

export default class StackableEffect extends Effect {
  static effectList: [number, Effect][] = [];
  
  constructor(name: string) {
    super(name);
  }

  draw(time: number) {
    time *= 0.001;

    if (!this.startTime) this.startTime = time;
    const elapsedTime = time - this.startTime;
    let opacity = 0;
    const holdDuration = this.duration - (this.fadeInDuration + this.fadeOutDuration);

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
      opacity = 1 - (elapsedTime - this.fadeInDuration - holdDuration) / this.fadeOutDuration;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    time += 0.1;

    this.ctx.font = 'bold 32px Galmuri9';
    this.renderFx?.(this.ctx, this.canvas.width / 2, this.canvas.height / 2, opacity);

    const now = Math.floor(time);

    this.before = now;

    if (elapsedTime < this.duration) {
      this.effect = requestAnimationFrame(this.draw.bind(this));
    } else {
      cancelAnimationFrame(this.effect as number);
      this.startTime = 0;
      this.before = 0;
      this.fadeInDuration = 1;
      this.fadeOutDuration = 1;
      this.duration = 3;
      this.effect = undefined;
      this.canvas.remove?.();
      this.logger.log('done');
      this.destroy();
    }
  }

  run() {
    return new Promise((resolve) => {
      while (StackableEffect.effectList.length > 0) {
        const effect = StackableEffect.effectList.shift();
        if (effect) {
          cancelAnimationFrame(effect[0]);
          // effect[1].destroy();
        }
      }
      this.isProcessed = resolve;
      // addConstraint('changeMap');
      this.setupCanvas();
      this.effect = requestAnimationFrame(this.draw.bind(this));
      StackableEffect.effectList.push([this.effect, this]);
    });
  }
}
