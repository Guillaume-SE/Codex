class CustomError extends Error {
  constructor(message: string) {
    super(message)
    this.message = message
    this.name = "Error"
  }
}

export default class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message)
    this.name = "NotFoundError"
  }
}
