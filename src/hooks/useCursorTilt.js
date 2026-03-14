import { useCallback } from 'react'

export function useCursorTilt(options = {}) {
  const { maxTilt = 7, lift = 5 } = options

  const updateMotion = useCallback(
    (element, x, y) => {
      const rotateY = (x - 0.5) * maxTilt * 2
      const rotateX = (0.5 - y) * maxTilt * 2

      element.style.setProperty('--rotate-x', `${rotateX.toFixed(2)}deg`)
      element.style.setProperty('--rotate-y', `${rotateY.toFixed(2)}deg`)
      element.style.setProperty('--lift', `${lift}px`)
      element.style.setProperty('--glow-x', `${(x * 100).toFixed(1)}%`)
      element.style.setProperty('--glow-y', `${(y * 100).toFixed(1)}%`)
    },
    [maxTilt, lift],
  )

  const resetMotion = useCallback((element) => {
    element.style.setProperty('--rotate-x', '0deg')
    element.style.setProperty('--rotate-y', '0deg')
    element.style.setProperty('--lift', '0px')
    element.style.setProperty('--glow-x', '50%')
    element.style.setProperty('--glow-y', '50%')
  }, [])

  const onMouseMove = useCallback(
    (event) => {
      if (window.matchMedia('(hover: none)').matches) return

      const rect = event.currentTarget.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height

      updateMotion(event.currentTarget, x, y)
    },
    [updateMotion],
  )

  const onMouseLeave = useCallback(
    (event) => {
      resetMotion(event.currentTarget)
    },
    [resetMotion],
  )

  const onFocus = useCallback(
    (event) => {
      updateMotion(event.currentTarget, 0.5, 0.45)
    },
    [updateMotion],
  )

  const onBlur = useCallback(
    (event) => {
      resetMotion(event.currentTarget)
    },
    [resetMotion],
  )

  return { onMouseMove, onMouseLeave, onFocus, onBlur }
}
