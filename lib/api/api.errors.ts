import { Response } from 'express';
import apiResponse from './api.responses';

enum ErrorType {
  BAD_TOKEN,
  UNAUTHORIZED,
  INTERNAL,
  NOT_FOUND,
  BAD_REQUEST,
  FORBIDDEN,
  CONFLICT,
}

abstract class ApiError extends Error {
  constructor(
    public type: ErrorType,
    public debugMessage = 'error',
    public displayMessage?: string,
    public errorCode?: string,
  ) {
    super(debugMessage);
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  public static handle(err: ApiError, res: Response): Response {
    switch (err.type) {
      case ErrorType.BAD_TOKEN:
        return new apiResponse.AuthFailureResponse(
          err.debugMessage,
          err.displayMessage,
          'BAD_TOKEN',
        ).send(res);
      case ErrorType.UNAUTHORIZED:
        return new apiResponse.AuthFailureResponse(
          err.debugMessage,
          err.displayMessage,
          err.errorCode,
        ).send(res);
      case ErrorType.INTERNAL:
        return new apiResponse.InternalErrorResponse(
          err.debugMessage,
          err.displayMessage,
          err.errorCode,
        ).send(res);
      case ErrorType.NOT_FOUND:
        return new apiResponse.NotFoundResponse(
          err.debugMessage,
          err.displayMessage,
          err.errorCode,
        ).send(res);
      case ErrorType.BAD_REQUEST:
        return new apiResponse.BadRequestResponse(
          err.debugMessage,
          err.displayMessage,
          err.errorCode,
        ).send(res);
      case ErrorType.FORBIDDEN:
        return new apiResponse.ForbiddenResponse(
          err.debugMessage,
          err.displayMessage,
          err.errorCode,
        ).send(res);
      case ErrorType.CONFLICT:
        return new apiResponse.ConflictErrorResponse(
          err.debugMessage,
          err.displayMessage,
          err.errorCode,
        ).send(res);
      default: {
        let message = err.debugMessage;
        // Do not send failure message in production as it may send sensitive data
        if (process.env.NODE_ENV == 'production')
          message = 'Something Went Wrong';
        return new apiResponse.InternalErrorResponse(
          message,
          err.displayMessage,
          err.errorCode,
        ).send(res);
      }
    }
  }
}

class AuthFailureError extends ApiError {
  constructor(
    debugMessage?: string,
    displayMessage?: string,
    errorCode?: string,
  ) {
    super(ErrorType.UNAUTHORIZED, debugMessage, displayMessage, errorCode);
    Object.setPrototypeOf(this, AuthFailureError.prototype);
  }
}

class InternalError extends ApiError {
  constructor(
    debugMessage?: string,
    displayMessage?: string,
    errorCode?: string,
  ) {
    super(ErrorType.INTERNAL, debugMessage, displayMessage, errorCode);
    Object.setPrototypeOf(this, InternalError.prototype);
  }
}

class BadRequestError extends ApiError {
  constructor(
    debugMessage?: string,
    displayMessage?: string,
    errorCode?: string,
  ) {
    super(ErrorType.BAD_REQUEST, debugMessage, displayMessage, errorCode);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

class NotFoundError extends ApiError {
  constructor(
    debugMessage?: string,
    displayMessage?: string,
    errorCode?: string,
  ) {
    super(ErrorType.NOT_FOUND, debugMessage, displayMessage, errorCode);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

class ConflictError extends ApiError {
  constructor(
    debugMessage?: string,
    displayMessage?: string,
    errorCode?: string,
  ) {
    super(ErrorType.CONFLICT, debugMessage, displayMessage, errorCode);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

class ForbiddenError extends ApiError {
  constructor(
    debugMessage?: string,
    displayMessage?: string,
    errorCode?: string,
  ) {
    super(ErrorType.FORBIDDEN, debugMessage, displayMessage, errorCode);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

class BadTokenError extends ApiError {
  constructor(
    debugMessage?: string,
    displayMessage?: string,
    errorCode?: string,
  ) {
    super(ErrorType.BAD_TOKEN, debugMessage, displayMessage, errorCode);
    Object.setPrototypeOf(this, BadTokenError.prototype);
  }
}

export default {
  ApiError,
  AuthFailureError,
  InternalError,
  BadRequestError,
  NotFoundError,
  ConflictError,
  ForbiddenError,
  BadTokenError,
};
