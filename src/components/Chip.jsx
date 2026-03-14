import { useCursorTilt } from '../hooks/useCursorTilt'

export function Chip({
  label,
  selected = false,
  onClick,
  className = '',
  ariaLabel,
  type = 'button',
}) {
  const motion = useCursorTilt({ maxTilt: 4, lift: 2 })

  return (
    <button
      type={type}
      className={`chip motion-surface ${selected ? 'is-selected' : ''} ${className}`.trim()}
      onClick={onClick}
      aria-pressed={selected}
      aria-label={ariaLabel || label}
      onMouseMove={motion.onMouseMove}
      onMouseLeave={motion.onMouseLeave}
      onFocus={motion.onFocus}
      onBlur={motion.onBlur}
    >
      {label}
    </button>
  )
}
