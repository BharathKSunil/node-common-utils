export var __esModule: boolean;
declare namespace _default {
    export { ApiError };
    export { AuthFailureError };
    export { InternalError };
    export { BadRequestError };
    export { NotFoundError };
    export { ConflictError };
    export { ForbiddenError };
    export { BadTokenError };
}
export default _default;
declare class ApiError extends Error {
    static handle(err: any, res: any): any;
    constructor(type: any, debugMessage: string | undefined, displayMessage: any, errorCode: any);
    type: any;
    debugMessage: string;
    displayMessage: any;
    errorCode: any;
}
declare class AuthFailureError extends ApiError {
    constructor(debugMessage: any, displayMessage: any, errorCode: any);
}
declare class InternalError extends ApiError {
    constructor(debugMessage: any, displayMessage: any, errorCode: any);
}
declare class BadRequestError extends ApiError {
    constructor(debugMessage: any, displayMessage: any, errorCode: any);
}
declare class NotFoundError extends ApiError {
    constructor(debugMessage: any, displayMessage: any, errorCode: any);
}
declare class ConflictError extends ApiError {
    constructor(debugMessage: any, displayMessage: any, errorCode: any);
}
declare class ForbiddenError extends ApiError {
    constructor(debugMessage: any, displayMessage: any, errorCode: any);
}
declare class BadTokenError extends ApiError {
    constructor(debugMessage: any, displayMessage: any, errorCode: any);
}
//# sourceMappingURL=api.errors.d.ts.map