import { capitalize } from "./capitalize";
import dayjs from "dayjs";
import { isNil } from "./isNil";
export default class Logger {
    constructor(context = this.context) {
        Object.defineProperty(this, "context", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "System"
        });
        Object.defineProperty(this, "icons", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["🪵", "✨", "🐛", "⚠️", "❌"]
        });
        Object.defineProperty(this, "levels", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["log", "info", "debug", "warn", "error"]
        });
        Object.defineProperty(this, "colors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["#ffffff", "#ffff91", "#b5ff91", "#de964d", "#c141aa"]
        });
        Object.defineProperty(this, "range", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "log", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "info", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "debug", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "warn", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "error", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.update(context);
    }
    get timestamp() {
        return dayjs().format("HH:mm:ss.SSS");
    }
    scope(range) {
        this.setScope(range || "Constructor");
        return this;
    }
    setScope(range) {
        this.range = range;
    }
    setContext(context) {
        this.context = capitalize(context);
    }
    update(context) {
        if (context) {
            if (typeof context === "string") {
                this.setContext(context);
            }
            else {
                this.setContext(context.constructor.name);
            }
        }
        for (const level of this.levels) {
            Object.defineProperty(this, level, {
                get: () => {
                    const range = this.range;
                    this.range = null;
                    return console[level].bind(this, `%c${this.icons[this.levels.indexOf(level)]} [${this.context}] >${isNil(range) ? "" : ` [${String(range)}] >`} ${this.timestamp} ---`, `color: ${this.colors[this.levels.indexOf(level)]}`);
                },
            });
        }
    }
}
