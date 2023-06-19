// REPONSES ARE GROUPED IN FIVE CATEGORIES

// Informational responses (100 – 199)
// Successful responses (200 – 299)
// Redirection messages (300 – 399)
// Client error responses (400 – 499)
// Server error responses (500 – 599)

const HTTP_STATUS_CODES = {
  // status codes
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403, // not allowed!
  NOT_FOUND: 404,
  PAYLOAD_TOO_LARGE: 413,
  TOO_MANY_REQUESTS: 429,

  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  INSUFFICIENT_STORAGE: 507,
};

export default HTTP_STATUS_CODES;
