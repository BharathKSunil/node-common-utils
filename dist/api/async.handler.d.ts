import { Request, Response, NextFunction } from 'express';
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
declare const _default: (execution: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
export default _default;
//# sourceMappingURL=async.handler.d.ts.map