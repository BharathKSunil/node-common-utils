import { Response } from 'express';
declare enum ResponseStatus {
    SUCCESS = 200,
    CREATED = 201,
    ACCEPTED = 202,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_ERROR = 500
}
declare abstract class ApiResponse {
    protected status?: ResponseStatus | undefined;
    protected message?: unknown;
    constructor(status?: ResponseStatus | undefined, message?: unknown);
    protected prepare<T extends ApiResponse>(res: Response, response: T): Response;
    send(res: Response): Response;
    private static sanitize;
}
declare class AuthFailureResponse extends ApiResponse {
    constructor(errorMessage?: string, displayMessage?: string, errorCode?: string);
}
declare class NotFoundResponse extends ApiResponse {
    constructor(errorMessage?: string, displayMessage?: string, errorCode?: string);
}
declare class ForbiddenResponse extends ApiResponse {
    constructor(errorMessage?: string, displayMessage?: string, errorCode?: string);
}
declare class BadRequestResponse extends ApiResponse {
    constructor(errorMessage?: string, displayMessage?: string, errorCode?: string);
}
declare class ConflictErrorResponse extends ApiResponse {
    constructor(errorMessage?: string, displayMessage?: string, errorCode?: string);
}
declare class InternalErrorResponse extends ApiResponse {
    constructor(errorMessage?: string, displayMessage?: string, errorCode?: string);
}
declare class CreatedResponse<T> extends ApiResponse {
    constructor(data: T);
}
declare class SuccessResponse<T> extends ApiResponse {
    constructor(data: T);
}
declare class AcceptedResponse<T> extends ApiResponse {
    constructor(data: T);
}
declare const _default: {
    ApiResponse: typeof ApiResponse;
    AuthFailureResponse: typeof AuthFailureResponse;
    NotFoundResponse: typeof NotFoundResponse;
    ForbiddenResponse: typeof ForbiddenResponse;
    BadRequestResponse: typeof BadRequestResponse;
    ConflictErrorResponse: typeof ConflictErrorResponse;
    InternalErrorResponse: typeof InternalErrorResponse;
    CreatedResponse: typeof CreatedResponse;
    SuccessResponse: typeof SuccessResponse;
    AcceptedResponse: typeof AcceptedResponse;
};
export default _default;
//# sourceMappingURL=api.responses.d.ts.map