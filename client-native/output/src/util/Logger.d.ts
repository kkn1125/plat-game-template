import { ImplLogger } from "@/implement/ImplLogger";
type CapitalizeScope<T extends object> = {
    [K in keyof T]: T[K] extends Function ? Capitalize<Extract<K, string>> : never;
}[keyof T];
export default class Logger<T extends object> implements ImplLogger {
    context: Capitalize<string>;
    icons: readonly ["🪵", "✨", "🐛", "⚠️", "❌"];
    levels: readonly ["log", "info", "debug", "warn", "error"];
    colors: string[];
    range: CapitalizeScope<T> | null;
    constructor(context?: string | T);
    get timestamp(): string;
    scope(range?: CapitalizeScope<T>): this;
    log: (...message: any[]) => void;
    info: (...message: any[]) => void;
    debug: (...message: any[]) => void;
    warn: (...message: any[]) => void;
    error: (...message: any[]) => void;
    private setScope;
    private setContext;
    update(context?: string | T): void;
}
export {};
