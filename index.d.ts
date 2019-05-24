/**
 * Convenience type to get a type union of the values of
 * an object's properties
 */
declare type ValueLiterals<O extends object> = O[keyof O]

/**
 * Type to unwrap a promise and get it's result type
 */
declare type Result<T> = T extends Promise<infer O> ? O : never
