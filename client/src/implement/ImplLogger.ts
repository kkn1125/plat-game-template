export interface ImplLogger {
  context: string;
  log: (...message: any[]) => void;
  info: (...message: any[]) => void;
  debug: (...message: any[]) => void;
  warn: (...message: any[]) => void;
  error: (...message: any[]) => void;
}
