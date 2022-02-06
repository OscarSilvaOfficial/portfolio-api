import { Request } from 'express';

interface LoggerPort {
  info(request: Request, context: string): void;
  error(request: Request, context: string, trace?: string): void;
  warn(request: Request, context: string): void;
  debug(request: Request, context: string): void;
}

export { LoggerPort };
