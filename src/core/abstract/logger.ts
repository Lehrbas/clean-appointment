// Defines the interface for the logger

export abstract class ILogger {
  abstract debug(context: string, message: string): void;
  abstract log(context: string, message: string): void;
  abstract logObject(obj: object): void;
  abstract error(context: string, message: string, trace?: string): void;
  abstract warn(context: string, message: string): void;
  abstract verbose(context: string, message: string): void;
}
