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
var ApiResponse = /** @class */ (function () {
    function ApiResponse(status, message) {
        this.status = status;
        this.message = message;
    }
    ApiResponse.prototype.prepare = function (res, response) {
        return res.status(this.status).json(ApiResponse.sanitize(response).message);
    };
    ApiResponse.prototype.send = function (res) {
        return this.prepare(res, this);
    };
    ApiResponse.sanitize = function (response) {
        var clone = {};
        Object.assign(clone, response);
        // @ts-ignore
        delete clone.status;
        for (var i in clone)
            if (typeof clone[i] === 'undefined')
                delete clone[i];
        return clone;
    };
    return ApiResponse;
}());
var ErrorResponse = /** @class */ (function () {
    function ErrorResponse(error_code, display_message, error_message) {
        if (error_message === void 0) { error_message = 'Something Went Wrong'; }
        this.error_code = error_code;
        this.display_message = display_message;
        this.error_message = error_message;
    }
    return ErrorResponse;
}());
var AuthFailureResponse = /** @class */ (function (_super) {
    __extends(AuthFailureResponse, _super);
    function AuthFailureResponse(errorMessage, displayMessage, errorCode) {
        if (displayMessage === void 0) { displayMessage = 'Invalid Credentials!'; }
        if (errorCode === void 0) { errorCode = 'UNAUTHORIZED'; }
        return _super.call(this, ResponseStatus.UNAUTHORIZED, new ErrorResponse(errorCode, displayMessage, errorMessage)) || this;
    }
    return AuthFailureResponse;
}(ApiResponse));
var NotFoundResponse = /** @class */ (function (_super) {
    __extends(NotFoundResponse, _super);
    function NotFoundResponse(errorMessage, displayMessage, errorCode) {
        if (displayMessage === void 0) { displayMessage = 'Resource Not Found!'; }
        if (errorCode === void 0) { errorCode = 'NOT_FOUND'; }
        return _super.call(this, ResponseStatus.NOT_FOUND, new ErrorResponse(errorCode, displayMessage, errorMessage)) || this;
    }
    return NotFoundResponse;
}(ApiResponse));
var ForbiddenResponse = /** @class */ (function (_super) {
    __extends(ForbiddenResponse, _super);
    function ForbiddenResponse(errorMessage, displayMessage, errorCode) {
        if (displayMessage === void 0) { displayMessage = 'Access Denied!'; }
        if (errorCode === void 0) { errorCode = 'FORBIDDEN'; }
        return _super.call(this, ResponseStatus.FORBIDDEN, new ErrorResponse(errorCode, displayMessage, errorMessage)) || this;
    }
    return ForbiddenResponse;
}(ApiResponse));
var BadRequestResponse = /** @class */ (function (_super) {
    __extends(BadRequestResponse, _super);
    function BadRequestResponse(errorMessage, displayMessage, errorCode) {
        if (displayMessage === void 0) { displayMessage = 'Invalid App Request!'; }
        if (errorCode === void 0) { errorCode = 'BAD_REQUEST'; }
        return _super.call(this, ResponseStatus.BAD_REQUEST, new ErrorResponse(errorCode, displayMessage, errorMessage)) || this;
    }
    return BadRequestResponse;
}(ApiResponse));
var ConflictErrorResponse = /** @class */ (function (_super) {
    __extends(ConflictErrorResponse, _super);
    function ConflictErrorResponse(errorMessage, displayMessage, errorCode) {
        if (displayMessage === void 0) { displayMessage = 'Resource Already Exists!'; }
        if (errorCode === void 0) { errorCode = 'CONFLICT'; }
        return _super.call(this, ResponseStatus.CONFLICT, new ErrorResponse(errorCode, displayMessage, errorMessage)) || this;
    }
    return ConflictErrorResponse;
}(ApiResponse));
var InternalErrorResponse = /** @class */ (function (_super) {
    __extends(InternalErrorResponse, _super);
    function InternalErrorResponse(errorMessage, displayMessage, errorCode) {
        if (displayMessage === void 0) { displayMessage = 'Oops, Something went wrong!'; }
        if (errorCode === void 0) { errorCode = 'INTERNAL_ERROR'; }
        return _super.call(this, ResponseStatus.INTERNAL_ERROR, new ErrorResponse(errorCode, displayMessage, errorMessage)) || this;
    }
    return InternalErrorResponse;
}(ApiResponse));
var CreatedResponse = /** @class */ (function (_super) {
    __extends(CreatedResponse, _super);
    function CreatedResponse(data) {
        return _super.call(this, ResponseStatus.CREATED, data) || this;
    }
    return CreatedResponse;
}(ApiResponse));
var SuccessResponse = /** @class */ (function (_super) {
    __extends(SuccessResponse, _super);
    function SuccessResponse(data) {
        return _super.call(this, ResponseStatus.SUCCESS, data) || this;
    }
    return SuccessResponse;
}(ApiResponse));
var AcceptedResponse = /** @class */ (function (_super) {
    __extends(AcceptedResponse, _super);
    function AcceptedResponse(data) {
        return _super.call(this, ResponseStatus.ACCEPTED, data) || this;
    }
    return AcceptedResponse;
}(ApiResponse));
exports.default = {
    ApiResponse: ApiResponse,
    AuthFailureResponse: AuthFailureResponse,
    NotFoundResponse: NotFoundResponse,
    ForbiddenResponse: ForbiddenResponse,
    BadRequestResponse: BadRequestResponse,
    ConflictErrorResponse: ConflictErrorResponse,
    InternalErrorResponse: InternalErrorResponse,
    CreatedResponse: CreatedResponse,
    SuccessResponse: SuccessResponse,
    AcceptedResponse: AcceptedResponse,
};
