// import { preUid } from '@common/feature';
// import { APP, globalEffectQueue } from '@common/global';
// import Logger from '@lib/logger';
import { $ } from '@util/$';
import Logger from '@util/Logger';
import { makeId } from '@util/makeId';
import { addConstraint, deleteConstraint } from '@variable/globalControl';
export default class Effect {
    onDestroy(cb) {
        this.events.push(cb);
    }
    constructor(name) {
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isProcessed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "events", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "startTime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "before", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "duration", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 3
        });
        Object.defineProperty(this, "effect", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "canvas", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ctx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fadeInDuration", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "fadeOutDuration", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "renderFx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = makeId('ex');
        this.name = name;
        this.logger = new Logger(this);
        this.logger.log('Loaded Effect');
    }
    setupCanvas() {
        /* UI 클래스 인스턴스 사용으로 인해 UI 생성자 반복 실행으로 대화 중복 버그 발생 */
        /* 렌더링과 관련한 객체이므로 도큐먼트 접근 허용 */
        const canvas = document.createElement('canvas');
        canvas.style.zIndex = '3000';
        const ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.canvas.id = 'effect-' + this.id;
        this.ctx = ctx;
        $('#app')?.append(this.canvas);
        this.handleResizeOnce();
        window.addEventListener('resize', this.handleResizeOnce.bind(this));
    }
    handleResizeOnce() {
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
    }
    draw(time) {
        // if (isBlockedMove()) {
        //   this.logger.debug('이펙터 종료');
        //   this.destroy();
        //   return;
        // }
        time *= 0.001;
        if (!this.startTime)
            this.startTime = time;
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
        this.renderFx?.(this.ctx, this.canvas.width / 2, this.canvas.height / 2, opacity);
        const now = Math.floor(time);
        this.before = now;
        if (elapsedTime * 2 > this.duration) {
            deleteConstraint('changeMap');
        }
        if (elapsedTime < this.duration) {
            this.effect = requestAnimationFrame(this.draw.bind(this));
        }
        else {
            cancelAnimationFrame(this.effect);
            this.startTime = 0;
            this.before = 0;
            this.fadeInDuration = 1;
            this.fadeOutDuration = 1;
            this.duration = 3;
            this.effect = undefined;
            this.canvas.remove?.();
            this.destroy();
            this.logger.log('이펙터 렌더링 완료');
        }
    }
    destroy() {
        clearInterval(this.effect);
        window.removeEventListener('resize', this.handleResizeOnce.bind(this));
        this.canvas.remove();
        this.before = 0;
        this.events.forEach((cb) => {
            cb?.();
        });
        this.events = [];
        this.isProcessed(true);
    }
    run() {
        return new Promise((resolve) => {
            this.isProcessed = resolve;
            addConstraint('changeMap');
            this.setupCanvas();
            this.effect = requestAnimationFrame(this.draw.bind(this));
        });
    }
}
