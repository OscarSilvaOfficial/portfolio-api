import { Logger as NestLogger } from '@nestjs/common';
import { Request } from 'express';
import { LoggerPort } from 'src/ports/logger.port';

class Logger implements LoggerPort {
  logger: NestLogger;

  constructor() {
    this.logger = new NestLogger();
  }

  public info(request: Request, context: string): void {
    const message = `Method { ${request.method} } @ Endpoint { ${request.url} }`;
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

export { Logger };
