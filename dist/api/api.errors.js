"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_responses_1 = __importDefault(require("./api.responses"));
var ErrorType;
(function (ErrorType) {
    ErrorType[ErrorType["BAD_TOKEN"] = 0] = "BAD_TOKEN";
    ErrorType[ErrorType["UNAUTHORIZED"] = 1] = "UNAUTHORIZED";
    ErrorType[ErrorType["INTERNAL"] = 2] = "INTERNAL";
    ErrorType[ErrorType["NOT_FOUND"] = 3] = "NOT_FOUND";
    ErrorType[ErrorType["BAD_REQUEST"] = 4] = "BAD_REQUEST";
    ErrorType[ErrorType["FORBIDDEN"] = 5] = "FORBIDDEN";
    ErrorType[ErrorType["CONFLICT"] = 6] = "CONFLICT";
})(ErrorType || (ErrorType = {}));
class ApiError extends Error {
    constructor(type, debugMessage = 'error', displayMessage, errorCode) {
        super(debugMessage);
        this.type = type;
        this.debugMessage = debugMessage;
        this.displayMessage = displayMessage;
        this.errorCode = errorCode;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
    static handle(err, res) {
        switch (err.type) {
            case ErrorType.BAD_TOKEN:
                return new api_responses_1.default.AuthFailureResponse(err.debugMessage, err.displayMessage, 'BAD_TOKEN').send(res);
            case ErrorType.UNAUTHORIZED:
                return new api_responses_1.default.AuthFailureResponse(err.debugMessage, err.displayMessage, err.errorCode).send(res);
            case ErrorType.INTERNAL:
                return new api_responses_1.default.InternalErrorResponse(err.debugMessage, err.displayMessage, err.errorCode).send(res);
            case ErrorType.NOT_FOUND:
                return new api_responses_1.default.NotFoundResponse(err.debugMessage, err.displayMessage, err.errorCode).send(res);
            case ErrorType.BAD_REQUEST:
                return new api_responses_1.default.BadRequestResponse(err.debugMessage, err.displayMessage, err.errorCode).send(res);
            case ErrorType.FORBIDDEN:
                return new api_responses_1.default.ForbiddenResponse(err.debugMessage, err.displayMessage, err.errorCode).send(res);
            case ErrorType.CONFLICT:
                return new api_responses_1.default.ConflictErrorResponse(err.debugMessage, err.displayMessage, err.errorCode).send(res);
            default: {
                let message = err.debugMessage;
                // Do not send failure message in production as it may send sensitive data
                if (process.env.NODE_ENV == 'production')
                    message = 'Something Went Wrong';
                return new api_responses_1.default.InternalErrorResponse(message, err.displayMessage, err.errorCode).send(res);
            }
        }
    }
}
class AuthFailureError extends ApiError {
    constructor(debugMessage, displayMessage, errorCode) {
        super(ErrorType.UNAUTHORIZED, debugMessage, displayMessage, errorCode);
        Object.setPrototypeOf(this, AuthFailureError.prototype);
    }
}
class InternalError extends ApiError {
    constructor(debugMessage, displayMessage, errorCode) {
        super(ErrorType.INTERNAL, debugMessage, displayMessage, errorCode);
        Object.setPrototypeOf(this, InternalError.prototype);
    }
}
class BadRequestError extends ApiError {
    constructor(debugMessage, displayMessage, errorCode) {
        super(ErrorType.BAD_REQUEST, debugMessage, displayMessage, errorCode);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
class NotFoundError extends ApiError {
    constructor(debugMessage, displayMessage, errorCode) {
        super(ErrorType.NOT_FOUND, debugMessage, displayMessage, errorCode);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
class ConflictError extends ApiError {
    constructor(debugMessage, displayMessage, errorCode) {
        super(ErrorType.CONFLICT, debugMessage, displayMessage, errorCode);
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}
class ForbiddenError extends ApiError {
    constructor(debugMessage, displayMessage, errorCode) {
        super(ErrorType.FORBIDDEN, debugMessage, displayMessage, errorCode);
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
class BadTokenError extends ApiError {
    constructor(debugMessage, displayMessage, errorCode) {
        super(ErrorType.BAD_TOKEN, debugMessage, displayMessage, errorCode);
        Object.setPrototypeOf(this, BadTokenError.prototype);
    }
}
exports.default = {
    ApiError,
    AuthFailureError,
    InternalError,
    BadRequestError,
    NotFoundError,
    ConflictError,
    ForbiddenError,
    BadTokenError,
};
