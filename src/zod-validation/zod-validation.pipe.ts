import {
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import * as zod from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  private readonly logger: Logger = new Logger(ZodValidationPipe.name);

  constructor(private schema: zod.ZodSchema) {}

  transform<T>(value: any): T {
    try {
      const parsedValue: T = <T>this.schema.parse(value);
      return parsedValue;
    } catch (e) {
      this.logger.error(`${this.transform.name}: Validation failed`, e);
      throw new BadRequestException('Validation failed');
    }
  }
}
