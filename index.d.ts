/**
 * Convenience type to get a type union of the values of
 * an object's properties
 */
declare type ValueLiterals<O extends object> = O[keyof O]
