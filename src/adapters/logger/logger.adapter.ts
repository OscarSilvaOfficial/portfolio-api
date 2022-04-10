import { LoggerPort } from '@/ports/logger.port';
import { Logger } from '@nestjs/common';
import { Request } from 'express';

class LoggerAdapter implements LoggerPort {
  private logger: Logger;
  constructor() {
    this.logger = new Logger();
  }

  public generalInfo(message: string, context: string): void {
    this.logger.log(message, context);
  }

  public generalError(message: string, context: string, trace: string): void {
    this.logger.error(message, trace, context);
  }

  public info(request: Request, context: string): void {
    const message = `Method { ${request.method} } | Endpoint { ${request.url} }`;
    this.logger.log(message, context);
  }

  public error(request: Request, context: string, trace: string): void {
    const message = `Method { ${request.method} } | Endpoint { ${request.url} }`;
    this.logger.error(message, trace, context);
  }

  public warn(request: Request, context: string): void {
    const message = `Method { ${request.method} } | Endpoint { ${request.url} }`;
    this.logger.warn(message, context);
  }

  public debug(request: Request, context: string): void {
    const message = `Method { ${request.method} } | Endpoint { ${request.url} }`;
    this.logger.debug(message, context);
  }
}

export { LoggerAdapter };
