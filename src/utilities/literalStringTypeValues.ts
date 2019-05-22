/**
 * Returns an object with its properties typed as literal string types
 * @param o The original object you want to extract the literal types from
 */
// eslint-disable-next-line import/prefer-default-export
export function literalTypes<V extends string, T extends { [key in string]: V }>(o: T): T {
    return o
}
