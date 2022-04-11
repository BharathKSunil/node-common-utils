import { Response } from 'express';
declare enum ErrorType {
    BAD_TOKEN = 0,
    UNAUTHORIZED = 1,
    INTERNAL = 2,
    NOT_FOUND = 3,
    BAD_REQUEST = 4,
    FORBIDDEN = 5,
    CONFLICT = 6
}
declare abstract class ApiError extends Error {
    type: ErrorType;
    debugMessage: string;
    displayMessage?: string | undefined;
    errorCode?: string | undefined;
    constructor(type: ErrorType, debugMessage?: string, displayMessage?: string | undefined, errorCode?: string | undefined);
    static handle(err: ApiError, res: Response): Response;
}
declare class AuthFailureError extends ApiError {
    constructor(debugMessage?: string, displayMessage?: string, errorCode?: string);
}
declare class InternalError extends ApiError {
    constructor(debugMessage?: string, displayMessage?: string, errorCode?: string);
}
declare class BadRequestError extends ApiError {
    constructor(debugMessage?: string, displayMessage?: string, errorCode?: string);
}
declare class NotFoundError extends ApiError {
    constructor(debugMessage?: string, displayMessage?: string, errorCode?: string);
}
declare class ConflictError extends ApiError {
    constructor(debugMessage?: string, displayMessage?: string, errorCode?: string);
}
declare class ForbiddenError extends ApiError {
    constructor(debugMessage?: string, displayMessage?: string, errorCode?: string);
}
declare class BadTokenError extends ApiError {
    constructor(debugMessage?: string, displayMessage?: string, errorCode?: string);
}
declare const _default: {
    ApiError: typeof ApiError;
    AuthFailureError: typeof AuthFailureError;
    InternalError: typeof InternalError;
    BadRequestError: typeof BadRequestError;
    NotFoundError: typeof NotFoundError;
    ConflictError: typeof ConflictError;
    ForbiddenError: typeof ForbiddenError;
    BadTokenError: typeof BadTokenError;
};
export default _default;
//# sourceMappingURL=api.errors.d.ts.map