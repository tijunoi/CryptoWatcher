// eslint-disable-next-line import/prefer-default-export
export function isUndefined<T = any>(o: T | undefined): o is undefined {
    return o === undefined
}
