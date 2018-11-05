enum ErrorSubject {
  user = 'user',
  server = 'server',
  input = 'input',
  db = 'db'
}

export class ErrorHelper {
  /**
   * The already exist typeorm error code
   */
  public static readonly duplicateError = 'ER_DUP_entry'

  /**
   * Get the error text
   * @param subject The subject of the error
   * @param cause The cause of the error (one word)
   */
  public static getError(subject: keyof typeof ErrorSubject, cause: string) {
    return `${subject}:${cause}`
  }
}
