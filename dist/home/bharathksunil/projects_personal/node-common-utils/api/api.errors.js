"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_responses_1 = __importDefault(require("./api.responses"));
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
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(type, debugMessage, displayMessage, errorCode) {
        if (debugMessage === void 0) { debugMessage = 'error'; }
        var _this = _super.call(this, debugMessage) || this;
        _this.type = type;
        _this.debugMessage = debugMessage;
        _this.displayMessage = displayMessage;
        _this.errorCode = errorCode;
        Object.setPrototypeOf(_this, ApiError.prototype);
        return _this;
    }
    ApiError.handle = function (err, res) {
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
                var message = err.debugMessage;
                // Do not send failure message in production as it may send sensitive data
                if (process.env.NODE_ENV == 'production')
                    message = 'Something Went Wrong';
                return new api_responses_1.default.InternalErrorResponse(message, err.displayMessage, err.errorCode).send(res);
            }
        }
    };
    return ApiError;
}(Error));
var AuthFailureError = /** @class */ (function (_super) {
    __extends(AuthFailureError, _super);
    function AuthFailureError(debugMessage, displayMessage, errorCode) {
        var _this = _super.call(this, ErrorType.UNAUTHORIZED, debugMessage, displayMessage, errorCode) || this;
        Object.setPrototypeOf(_this, AuthFailureError.prototype);
        return _this;
    }
    return AuthFailureError;
}(ApiError));
var InternalError = /** @class */ (function (_super) {
    __extends(InternalError, _super);
    function InternalError(debugMessage, displayMessage, errorCode) {
        var _this = _super.call(this, ErrorType.INTERNAL, debugMessage, displayMessage, errorCode) || this;
        Object.setPrototypeOf(_this, InternalError.prototype);
        return _this;
    }
    return InternalError;
}(ApiError));
var BadRequestError = /** @class */ (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(debugMessage, displayMessage, errorCode) {
        var _this = _super.call(this, ErrorType.BAD_REQUEST, debugMessage, displayMessage, errorCode) || this;
        Object.setPrototypeOf(_this, BadRequestError.prototype);
        return _this;
    }
    return BadRequestError;
}(ApiError));
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(debugMessage, displayMessage, errorCode) {
        var _this = _super.call(this, ErrorType.NOT_FOUND, debugMessage, displayMessage, errorCode) || this;
        Object.setPrototypeOf(_this, NotFoundError.prototype);
        return _this;
    }
    return NotFoundError;
}(ApiError));
var ConflictError = /** @class */ (function (_super) {
    __extends(ConflictError, _super);
    function ConflictError(debugMessage, displayMessage, errorCode) {
        var _this = _super.call(this, ErrorType.CONFLICT, debugMessage, displayMessage, errorCode) || this;
        Object.setPrototypeOf(_this, ConflictError.prototype);
        return _this;
    }
    return ConflictError;
}(ApiError));
var ForbiddenError = /** @class */ (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(debugMessage, displayMessage, errorCode) {
        var _this = _super.call(this, ErrorType.FORBIDDEN, debugMessage, displayMessage, errorCode) || this;
        Object.setPrototypeOf(_this, ForbiddenError.prototype);
        return _this;
    }
    return ForbiddenError;
}(ApiError));
var BadTokenError = /** @class */ (function (_super) {
    __extends(BadTokenError, _super);
    function BadTokenError(debugMessage, displayMessage, errorCode) {
        var _this = _super.call(this, ErrorType.BAD_TOKEN, debugMessage, displayMessage, errorCode) || this;
        Object.setPrototypeOf(_this, BadTokenError.prototype);
        return _this;
    }
    return BadTokenError;
}(ApiError));
exports.default = {
    ApiError: ApiError,
    AuthFailureError: AuthFailureError,
    InternalError: InternalError,
    BadRequestError: BadRequestError,
    NotFoundError: NotFoundError,
    ConflictError: ConflictError,
    ForbiddenError: ForbiddenError,
    BadTokenError: BadTokenError,
};
