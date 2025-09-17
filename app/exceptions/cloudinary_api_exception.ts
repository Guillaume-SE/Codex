import { Exception } from '@adonisjs/core/exceptions'

/*
|--------------------------------------------------------------------------
| CloudinaryApiException
|--------------------------------------------------------------------------
|
| This exception is thrown when there's a problem communicating with
| the Cloudinary API. It allows our global ExceptionHandler to identify
| this specific error type and handle it gracefully.
|
*/
export default class CloudinaryApiException extends Exception {}
