export var __esModule: boolean;
declare namespace _default {
    export { ApiResponse };
    export { AuthFailureResponse };
    export { NotFoundResponse };
    export { ForbiddenResponse };
    export { BadRequestResponse };
    export { ConflictErrorResponse };
    export { InternalErrorResponse };
    export { CreatedResponse };
    export { SuccessResponse };
    export { AcceptedResponse };
}
export default _default;
declare class ApiResponse {
    static sanitize(response: any): {};
    constructor(status: any, message: any);
    status: any;
    message: any;
    prepare(res: any, response: any): any;
    send(res: any): any;
}
declare class AuthFailureResponse extends ApiResponse {
    constructor(errorMessage: any, displayMessage?: string, errorCode?: string);
}
declare class NotFoundResponse extends ApiResponse {
    constructor(errorMessage: any, displayMessage?: string, errorCode?: string);
}
declare class ForbiddenResponse extends ApiResponse {
    constructor(errorMessage: any, displayMessage?: string, errorCode?: string);
}
declare class BadRequestResponse extends ApiResponse {
    constructor(errorMessage: any, displayMessage?: string, errorCode?: string);
}
declare class ConflictErrorResponse extends ApiResponse {
    constructor(errorMessage: any, displayMessage?: string, errorCode?: string);
}
declare class InternalErrorResponse extends ApiResponse {
    constructor(errorMessage: any, displayMessage?: string, errorCode?: string);
}
declare class CreatedResponse extends ApiResponse {
    constructor(data: any);
}
declare class SuccessResponse extends ApiResponse {
    constructor(data: any);
}
declare class AcceptedResponse extends ApiResponse {
    constructor(data: any);
}
//# sourceMappingURL=api.responses.d.ts.map