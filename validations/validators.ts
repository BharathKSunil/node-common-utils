import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import apiErrors from '../api/api.errors';
import validator from 'validator';

export enum ValidationSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAM = 'params',
}

type ValidationResult = {
  source: ValidationSource;
  error: Joi.ValidationError;
};

type ValidationRequest = {
  source: ValidationSource;
  schema: Joi.ObjectSchema;
};

export default (schema: ValidationRequest[], isFull: boolean = false) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const errors: ValidationResult[] = [];
      schema.forEach(value => {
        const { error } = value.schema.validate(req[value.source], {
          abortEarly: !isFull,
        });
        if (error) {
          errors.push({ source: value.source, error: error });
        }
      });

      if (errors.length == 0) return next();

      let errorMessage: string;
      if (isFull) {
        errorMessage = '';
        errors.forEach(result => {
          const { details } = result.error;
          const message = details
            .map(i => i.message.replace(/['"]+/g, ''))
            .join(', ');
          errorMessage = errorMessage.concat(`[${result.source}: ${message}]`);
        });
      } else {
        const result = errors[0];
        const { details } = result?.error;
        const message = details
          .map(i => i.message.replace(/['"]+/g, ''))
          .join(',');
        errorMessage = `${result?.source}: ${message}`;
      }

      next(new apiErrors.BadRequestError(errorMessage));
    } catch (error) {
      next(error);
    }
  };

export const isJwtBearerToken = () =>
  Joi.string().custom((value: string, _helpers) => {
    if (value.startsWith('Bearer ')) {
      const token = value.split(' ')[1];
      if (!token)
        throw new apiErrors.BadRequestError('access-token is invalid');
      if (!validator.isJWT(token))
        throw new apiErrors.BadRequestError('access-token is not a vald JWT');
    } else if (!validator.isJWT(value))
      throw new apiErrors.BadRequestError('access-token is not a valid JWT');

    return value;
  }, 'Authorization Header Validation');

export const isObjectId = () =>
  Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Object Id');
