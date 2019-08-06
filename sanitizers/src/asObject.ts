import { Result, Sanitizer, SanitizerFailure, Schema } from './model'

export const asObject = <T extends object> (schema: Schema<T>): Sanitizer<T> =>
  (value, path) => {
    if (typeof value !== 'object' || value === null) {
      return Result.error([{ path, expected: 'object' }])
    }
    const results: T = {} as any
    const errors: SanitizerFailure[] = []
    for (const key in schema) {
      if (Object.hasOwnProperty.call(schema, key)) {
        const result = schema[key]((value as T)[key], `${path}.${key}`)
        if (Result.isOk(result)) {
          results[key] = result.ok
        } else {
          errors.push(...result.error)
        }
      }
    }
    return errors.length > 0
      ? Result.error(errors)
      : Result.ok(results)
  }
