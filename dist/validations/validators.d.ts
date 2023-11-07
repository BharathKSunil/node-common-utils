import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
export declare enum ValidationSource {
    BODY = "body",
    HEADER = "headers",
    QUERY = "query",
    PARAM = "params"
}
type ValidationRequest = {
    source: ValidationSource;
    schema: Joi.ObjectSchema;
};
declare const _default: (schema: ValidationRequest[], isFull?: boolean) => (req: Request, _res: Response, next: NextFunction) => void;
export default _default;
export declare const isJwtBearerToken: () => Joi.StringSchema<string>;
export declare const isObjectId: () => Joi.StringSchema<string>;
//# sourceMappingURL=validators.d.ts.map