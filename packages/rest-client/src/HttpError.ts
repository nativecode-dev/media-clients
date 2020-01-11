export class HttpError extends Error {
  constructor(readonly request: Request, readonly response: Response) {
    super(response.statusText)
  }
}
