"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObjectId = exports.isJwtBearerToken = exports.ValidationSource = void 0;
const joi_1 = __importDefault(require("joi"));
const api_errors_1 = __importDefault(require("../api/api.errors"));
const validator_1 = __importDefault(require("validator"));
var ValidationSource;
(function (ValidationSource) {
    ValidationSource["BODY"] = "body";
    ValidationSource["HEADER"] = "headers";
    ValidationSource["QUERY"] = "query";
    ValidationSource["PARAM"] = "params";
})(ValidationSource = exports.ValidationSource || (exports.ValidationSource = {}));
exports.default = (schema, isFull = false) => (req, _res, next) => {
    try {
        const errors = [];
        schema.forEach(value => {
            const { error } = value.schema.validate(req[value.source], {
                abortEarly: !isFull,
            });
            if (error) {
                errors.push({ source: value.source, error: error });
            }
        });
        if (errors.length == 0)
            return next();
        let errorMessage;
        if (isFull) {
            errorMessage = '';
            errors.forEach(result => {
                const { details } = result.error;
                const message = details
                    .map(i => i.message.replace(/['"]+/g, ''))
                    .join(', ');
                errorMessage = errorMessage.concat(`[${result.source}: ${message}]`);
            });
        }
        else {
            const result = errors[0];
            const { details } = result === null || result === void 0 ? void 0 : result.error;
            const message = details
                .map(i => i.message.replace(/['"]+/g, ''))
                .join(',');
            errorMessage = `${result === null || result === void 0 ? void 0 : result.source}: ${message}`;
        }
        next(new api_errors_1.default.BadRequestError(errorMessage));
    }
    catch (error) {
        next(error);
    }
};
const isJwtBearerToken = () => joi_1.default.string().custom((value, _helpers) => {
    if (value.startsWith('Bearer ')) {
        const token = value.split(' ')[1];
        if (!token)
            throw new api_errors_1.default.BadRequestError('access-token is invalid');
        if (!validator_1.default.isJWT(token))
            throw new api_errors_1.default.BadRequestError('access-token is not a vald JWT');
    }
    else if (!validator_1.default.isJWT(value))
        throw new api_errors_1.default.BadRequestError('access-token is not a valid JWT');
    return value;
}, 'Authorization Header Validation');
exports.isJwtBearerToken = isJwtBearerToken;
const isObjectId = () => joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Object Id');
exports.isObjectId = isObjectId;
