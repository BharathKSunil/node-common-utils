import { Response } from 'express';

enum ResponseStatus {
  SUCCESS = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_ERROR = 500,
}

abstract class ApiResponse {
  constructor(
    protected status?: ResponseStatus,
    protected message?: unknown,
  ) {}

  protected prepare<T extends ApiResponse>(
    res: Response,
    response: T,
  ): Response {
    return res
      .status(this.status ?? ResponseStatus.INTERNAL_ERROR)
      .json(ApiResponse.sanitize(response).message);
  }

  public send(res: Response): Response {
    return this.prepare<ApiResponse>(res, this);
  }

  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    delete clone.status;
    for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
    return clone;
  }
}

class ErrorResponse {
  constructor(
    public error_code: string,
    public display_message: string,
    public error_message = 'Something Went Wrong',
  ) {}
}

class AuthFailureResponse extends ApiResponse {
  constructor(
    errorMessage?: string,
    displayMessage = 'Invalid Credentials!',
    errorCode = 'UNAUTHORIZED',
  ) {
    super(
      ResponseStatus.UNAUTHORIZED,
      new ErrorResponse(errorCode, displayMessage, errorMessage),
    );
  }
}

class NotFoundResponse extends ApiResponse {
  constructor(
    errorMessage?: string,
    displayMessage = 'Resource Not Found!',
    errorCode = 'NOT_FOUND',
  ) {
    super(
      ResponseStatus.NOT_FOUND,
      new ErrorResponse(errorCode, displayMessage, errorMessage),
    );
  }
}

class ForbiddenResponse extends ApiResponse {
  constructor(
    errorMessage?: string,
    displayMessage = 'Access Denied!',
    errorCode = 'FORBIDDEN',
  ) {
    super(
      ResponseStatus.FORBIDDEN,
      new ErrorResponse(errorCode, displayMessage, errorMessage),
    );
  }
}

class BadRequestResponse extends ApiResponse {
  constructor(
    errorMessage?: string,
    displayMessage = 'Invalid App Request!',
    errorCode = 'BAD_REQUEST',
  ) {
    super(
      ResponseStatus.BAD_REQUEST,
      new ErrorResponse(errorCode, displayMessage, errorMessage),
    );
  }
}

class ConflictErrorResponse extends ApiResponse {
  constructor(
    errorMessage?: string,
    displayMessage = 'Resource Already Exists!',
    errorCode = 'CONFLICT',
  ) {
    super(
      ResponseStatus.CONFLICT,
      new ErrorResponse(errorCode, displayMessage, errorMessage),
    );
  }
}

class InternalErrorResponse extends ApiResponse {
  constructor(
    errorMessage?: string,
    displayMessage = 'Oops, Something went wrong!',
    errorCode = 'INTERNAL_ERROR',
  ) {
    super(
      ResponseStatus.INTERNAL_ERROR,
      new ErrorResponse(errorCode, displayMessage, errorMessage),
    );
  }
}

class CreatedResponse<T> extends ApiResponse {
  constructor(data: T) {
    super(ResponseStatus.CREATED, data);
  }
}

class SuccessResponse<T> extends ApiResponse {
  constructor(data: T) {
    super(ResponseStatus.SUCCESS, data);
  }
}

class AcceptedResponse<T> extends ApiResponse {
  constructor(data: T) {
    super(ResponseStatus.ACCEPTED, data);
  }
}

export default {
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
