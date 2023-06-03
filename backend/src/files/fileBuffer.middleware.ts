import { Injectable, NestMiddleware } from '@nestjs/common';
import { raw } from 'body-parser';

@Injectable()
export class FileBufferMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void): any {
    raw({
      verify: (req, res, buffer) => {
        req['fileBuffer'] = buffer;
      },
      // limit: '5mb',
      limit: '500gb',
      type: req.headers['content-type'],
    })(req, res as any, next);
  }
}
