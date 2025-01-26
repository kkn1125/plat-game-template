import { ImplLogger } from "@/implement/ImplLogger";
import { capitalize } from "./capitalize";
import dayjs from "dayjs";
import { isNil } from "./isNil";

type CapitalizeScope<T extends object> = {
  [K in keyof T]: T[K] extends Function
    ? Capitalize<Extract<K, string>>
    : never;
}[keyof T];

export default class Logger<T extends object> implements ImplLogger {
  context: Capitalize<string> = "System";
  icons = ["🪵", "✨", "🐛", "⚠️", "❌"] as const;
  levels = ["log", "info", "debug", "warn", "error"] as const;
  colors = ["#ffffff", "#ffff91", "#b5ff91", "#de964d", "#c141aa"];
  range: CapitalizeScope<T> | null = null;

  constructor(context: string | T = this.context) {
    this.update(context);
  }

  get timestamp() {
    return dayjs().format("HH:mm:ss.SSS");
  }

  scope(range?: CapitalizeScope<T>) {
    this.setScope(range || ("Constructor" as CapitalizeScope<T>));
    return this;
  }

  log!: (...message: any[]) => void;
  info!: (...message: any[]) => void;
  debug!: (...message: any[]) => void;
  warn!: (...message: any[]) => void;
  error!: (...message: any[]) => void;

  private setScope(range: CapitalizeScope<T>) {
    this.range = range;
  }

  private setContext(context: string) {
    this.context = capitalize(context);
  }

  update(context?: string | T) {
    if (context) {
      if (typeof context === "string") {
        this.setContext(context);
      } else {
        this.setContext(context.constructor.name);
      }
    }

    for (const level of this.levels) {
      Object.defineProperty(this, level, {
        get: () => {
          const range = this.range;
          this.range = null;
          return console[level].bind(
            this,
            `%c${this.icons[this.levels.indexOf(level)]} [${this.context}] >${
              isNil(range) ? "" : ` [${String(range)}] >`
            } ${this.timestamp} ---`,
            `color: ${this.colors[this.levels.indexOf(level)]}`
          );
        },
      });
    }
  }
}
