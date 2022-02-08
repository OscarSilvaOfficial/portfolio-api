import { Request } from 'express';

interface LoggerPort {
  generalInfo(message: string, context: string): void;
  generalError(message: string, context: string, trace: string): void;
  info(request: Request, context: string): void;
  error(request: Request, context: string, trace?: string): void;
  warn(request: Request, context: string): void;
  debug(request: Request, context: string): void;
}

export { LoggerPort };
