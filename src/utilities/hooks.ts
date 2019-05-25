import { EffectCallback, useEffect, useRef } from 'react'

//Adapted from Dan Abramov's https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// eslint-disable-next-line import/prefer-default-export
export function useInterval(callback: () => void, delay: number): void {
    const savedCallback = useRef<typeof callback>()

    // Remember the latest callback.
    useEffect((): void => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect((): ReturnType<EffectCallback> => {
        function tick(): void {
            if (savedCallback.current !== undefined) savedCallback.current()
        }
        if (delay !== null) {
            let id = setInterval(tick, delay)
            return (): void => clearInterval(id)
        }
    }, [delay])
}
