"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["SUCCESS"] = 200] = "SUCCESS";
    ResponseStatus[ResponseStatus["CREATED"] = 201] = "CREATED";
    ResponseStatus[ResponseStatus["ACCEPTED"] = 202] = "ACCEPTED";
    ResponseStatus[ResponseStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseStatus[ResponseStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResponseStatus[ResponseStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResponseStatus[ResponseStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseStatus[ResponseStatus["CONFLICT"] = 409] = "CONFLICT";
    ResponseStatus[ResponseStatus["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
})(ResponseStatus || (ResponseStatus = {}));
class ApiResponse {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
    prepare(res, response) {
        return res.status(this.status).json(ApiResponse.sanitize(response).message);
    }
    send(res) {
        return this.prepare(res, this);
    }
    static sanitize(response) {
        const clone = {};
        Object.assign(clone, response);
        // @ts-ignore
        delete clone.status;
        for (const i in clone)
            if (typeof clone[i] === 'undefined')
                delete clone[i];
        return clone;
    }
}
class ErrorResponse {
    constructor(error_code, display_message, error_message = 'Something Went Wrong') {
        this.error_code = error_code;
        this.display_message = display_message;
        this.error_message = error_message;
    }
}
class AuthFailureResponse extends ApiResponse {
    constructor(errorMessage, displayMessage = 'Invalid Credentials!', errorCode = 'UNAUTHORIZED') {
        super(ResponseStatus.UNAUTHORIZED, new ErrorResponse(errorCode, displayMessage, errorMessage));
    }
}
class NotFoundResponse extends ApiResponse {
    constructor(errorMessage, displayMessage = 'Resource Not Found!', errorCode = 'NOT_FOUND') {
        super(ResponseStatus.NOT_FOUND, new ErrorResponse(errorCode, displayMessage, errorMessage));
    }
}
class ForbiddenResponse extends ApiResponse {
    constructor(errorMessage, displayMessage = 'Access Denied!', errorCode = 'FORBIDDEN') {
        super(ResponseStatus.FORBIDDEN, new ErrorResponse(errorCode, displayMessage, errorMessage));
    }
}
class BadRequestResponse extends ApiResponse {
    constructor(errorMessage, displayMessage = 'Invalid App Request!', errorCode = 'BAD_REQUEST') {
        super(ResponseStatus.BAD_REQUEST, new ErrorResponse(errorCode, displayMessage, errorMessage));
    }
}
class ConflictErrorResponse extends ApiResponse {
    constructor(errorMessage, displayMessage = 'Resource Already Exists!', errorCode = 'CONFLICT') {
        super(ResponseStatus.CONFLICT, new ErrorResponse(errorCode, displayMessage, errorMessage));
    }
}
class InternalErrorResponse extends ApiResponse {
    constructor(errorMessage, displayMessage = 'Oops, Something went wrong!', errorCode = 'INTERNAL_ERROR') {
        super(ResponseStatus.INTERNAL_ERROR, new ErrorResponse(errorCode, displayMessage, errorMessage));
    }
}
class CreatedResponse extends ApiResponse {
    constructor(data) {
        super(ResponseStatus.CREATED, data);
    }
}
class SuccessResponse extends ApiResponse {
    constructor(data) {
        super(ResponseStatus.SUCCESS, data);
    }
}
class AcceptedResponse extends ApiResponse {
    constructor(data) {
        super(ResponseStatus.ACCEPTED, data);
    }
}
exports.default = {
    ApiResponse,
    AuthFailureResponse,
    NotFoundResponse,
    ForbiddenResponse,
    BadRequestResponse,
    ConflictErrorResponse,
    InternalErrorResponse,
    CreatedResponse,
    SuccessResponse,
    AcceptedResponse,
};
