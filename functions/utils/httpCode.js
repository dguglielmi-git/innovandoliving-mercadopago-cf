/**
 * Successful Request
 */
/** @description 200 OK: The request has succeeded. The server has successfully processed
 * the request and is returning the requested resource. */
const HTTP_REQUEST_OK = 200;
/** @description  201 Created: The request has been fulfilled, and a new resource has been
 * created as a result.*/
const HTTP_REQUEST_CREATED = 201;
/** @description  202 Accepted: The request has been accepted for processing,
 * but the processing is not yet complete.
 * This status code is typically used for asynchronous operations.*/
const HTTP_REQUEST_ACCEPTED = 202;
/** @description  204 No Content: The server has successfully processed the request, but
 * there is no content to return.
 * This is commonly used for requests that don't require a response body.*/
const HTTP_REQUEST_NO_CONTENT = 204;

/**
 * Client Errors
 */
/** @description 400 Bad Request: Invalid or malformed request. */
const HTTP_BAD_REQUEST = 400;
/** @description 401 Unauthorized: Authentication is required or invalid credentials provided. */
const HTTP_UNAUTHORIZED = 401;
/** @description 403 Forbidden: Access to the requested resource is denied.*/
const HTTP_FORBIDDEN = 403;
/** @description 404 Not Found: The requested resource could not be found. */
const HTTP_NOT_FOUND = 404;

/**
 * Server Errors
 */
/** @description 500 Internal Server Error: An unexpected error occurred on the server. */
const HTTP_SERVER_ERROR = 500;

module.exports = {
  HTTP_REQUEST_OK,
  HTTP_REQUEST_CREATED,
  HTTP_REQUEST_ACCEPTED,
  HTTP_REQUEST_NO_CONTENT,
  HTTP_BAD_REQUEST,
  HTTP_UNAUTHORIZED,
  HTTP_FORBIDDEN,
  HTTP_NOT_FOUND,
  HTTP_SERVER_ERROR,
};
