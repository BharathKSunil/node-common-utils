import { Request, Response, NextFunction } from 'express';
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const _default: (execution: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default _default;
//# sourceMappingURL=async.handler.d.ts.map