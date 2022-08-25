import { useEffect, useState } from 'preact/hooks'

export const useDebounce = (value: string, wait = 300) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebounceValue(value)
    }, wait)

    return () => {
      clearTimeout(timer)
    }
  }, [value, wait])

  return debounceValue
}
