"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObjectId = exports.isJwtBearerToken = exports.ValidationSource = void 0;
var joi_1 = __importDefault(require("joi"));
var api_errors_1 = __importDefault(require("../api/api.errors"));
var validator_1 = __importDefault(require("validator"));
var ValidationSource;
(function (ValidationSource) {
    ValidationSource["BODY"] = "body";
    ValidationSource["HEADER"] = "headers";
    ValidationSource["QUERY"] = "query";
    ValidationSource["PARAM"] = "params";
})(ValidationSource || (exports.ValidationSource = ValidationSource = {}));
exports.default = (function (schema, isFull) {
    if (isFull === void 0) { isFull = false; }
    return function (req, _res, next) {
        try {
            var errors_1 = [];
            schema.forEach(function (value) {
                var error = value.schema.validate(req[value.source], {
                    abortEarly: !isFull,
                }).error;
                if (error) {
                    errors_1.push({ source: value.source, error: error });
                }
            });
            if (errors_1.length == 0)
                return next();
            var errorMessage_1;
            if (isFull) {
                errorMessage_1 = '';
                errors_1.forEach(function (result) {
                    var details = result.error.details;
                    var message = details
                        .map(function (i) { return i.message.replace(/['"]+/g, ''); })
                        .join(', ');
                    errorMessage_1 = errorMessage_1.concat("[".concat(result.source, ": ").concat(message, "]"));
                });
            }
            else {
                var result = errors_1[0];
                var details = (result === null || result === void 0 ? void 0 : result.error).details;
                var message = details
                    .map(function (i) { return i.message.replace(/['"]+/g, ''); })
                    .join(',');
                errorMessage_1 = "".concat(result === null || result === void 0 ? void 0 : result.source, ": ").concat(message);
            }
            next(new api_errors_1.default.BadRequestError(errorMessage_1));
        }
        catch (error) {
            next(error);
        }
    };
});
var isJwtBearerToken = function () {
    return joi_1.default.string().custom(function (value, _helpers) {
        if (value.startsWith('Bearer ')) {
            var token = value.split(' ')[1];
            if (!token)
                throw new api_errors_1.default.BadRequestError('access-token is invalid');
            if (!validator_1.default.isJWT(token))
                throw new api_errors_1.default.BadRequestError('access-token is not a vald JWT');
        }
        else if (!validator_1.default.isJWT(value))
            throw new api_errors_1.default.BadRequestError('access-token is not a valid JWT');
        return value;
    }, 'Authorization Header Validation');
};
exports.isJwtBearerToken = isJwtBearerToken;
var isObjectId = function () {
    return joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Object Id');
};
exports.isObjectId = isObjectId;
