const responseSuccess = (res, data, msg = '') => {
  return res.json({
    status: 'SUCCESS',
    data: data,
    message: msg ? msg : 'Process Succesfull',
  })
}

const responseNotFound = (res, field) => {
  return res.status(404).json({
    status: 'Error',
    type: 'NOT_FOUND',
    message: `${field}`,
  })
}

const responseUnauthorized = (res, msg) => {
  return res.status(401).json({
    status: 'Error',
    type: 'UNAUTHORIZED',
    message: msg ? msg : 'Access denied!',
  })
}

const responseForbidden = (res) => {
  return res.status(403).json({
    status: 'Error',
    type: 'FORBIDDEN',
    message: 'Insufficient privileges!',
  })
}

const responseValidationError = (res, errors) => {
  const isArray = Array.isArray(errors)
  const _errors = []
  if (isArray) {
    for (let i = 0; i < errors.length; i++) {
      const err = errors[i]
      _errors.push({
        label: err.context.label,
        message: err.message,
      })
    }
  }
  return res.status(400).json({
    status: 'Error',
    type: 'VALIDATION_ERROR',
    errors: isArray ? _errors : undefined,
    message: !isArray ? errors : undefined,
  })
}

const responseError = (res, err) => {
  const status = err.status || 500
  const type = err.type || 'SystemError'
  const message = err.message || err || 'Something went wrong!'
  switch (type) {
    case 'VALIDATION_ERROR':
      return responseValidationError(res, message)
    case 'NOT_FOUND':
      return responseNotFound(res, message)
    default:
      return res.status(status).json({
        status: 'Error',
        type: type,
        message: message,
      })
  }
}
module.exports = {
  responseSuccess,
  responseError,
  responseNotFound,
  responseUnauthorized,
  responseForbidden,
  responseValidationError,
}
