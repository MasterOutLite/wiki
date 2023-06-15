const createError = (status, errorType) => {
  const newError = function (msg) {
    this.message = msg;
    this.errorType = errorType;
    this.statusCode = status;
  };

  newError.prototype = Object.create(Error.prototype);
  newError.prototype.constructor = newError;

  return newError;
};

export const Auth = createError(401, 'AuthError', 'errors.auth.default');
export const Validation = createError(400, 'ValidationError', 'errors.validation.default');
export const BadRequest = createError(400, 'BadRequestError', 'errors.badRequest.default');
export const InvalidPassword = createError(400, 'InvalidPasswordError', 'errors.invalidPassword.default');
export const InvalidPasswordByUserName = createError(
  400,
  'InvalidPasswordByUserNameError',
  'errors.invalidPasswordByUserName.default'
);
export const InvalidPassCode = createError(400, 'InvalidPassCode', 'errors.invalidPassCode.default');
export const InvalidToken = createError(401, 'InvalidTokenError', 'errors.invalidToken.default');
export const SessionExpired = createError(401, 'SessionExpiredError', 'errors.sessionExpired.default');
export const NotFound = createError(404, 'NotFoundError', 'errors.notFound.default');
export const BadQuery = createError(400, 'BadQueryError', 'errors.badQuery.default');
export const Forbidden = createError(403, 'Forbidden', 'errors.forbidden.default');
export const NoContent = createError(204, 'NotFoundError', 'errors.noContent.default');
export const InvalidData = createError(400, 'InvalidDataError', 'errors.invalidData.default');
