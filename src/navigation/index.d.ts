import * as screens from './screenNames'

declare global {
    /**
     * Any of the string literal constants declared in screenNames
     *
     * Workaround to have a type which is 'any of the screen names as string'
     * without having to export screens as an object instead of individual
     * constants
     */
    type ScreenName = ValueLiterals<typeof screens>
}
