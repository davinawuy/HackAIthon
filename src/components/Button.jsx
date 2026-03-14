import { Link } from 'react-router-dom'
import { useCursorTilt } from '../hooks/useCursorTilt'

function combineHandlers(primaryHandler, secondaryHandler) {
  return (event) => {
    if (typeof primaryHandler === 'function') primaryHandler(event)
    if (typeof secondaryHandler === 'function') secondaryHandler(event)
  }
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  to,
  href,
  onClick,
  ...props
}) {
  const motion = useCursorTilt({ maxTilt: 4, lift: 3 })
  const classes = `btn btn-${variant} btn-${size} motion-surface ${className}`.trim()
  const {
    onMouseMove,
    onMouseLeave,
    onFocus,
    onBlur,
    type,
    ...restProps
  } = props

  const sharedProps = {
    className: classes,
    onMouseMove: combineHandlers(motion.onMouseMove, onMouseMove),
    onMouseLeave: combineHandlers(motion.onMouseLeave, onMouseLeave),
    onFocus: combineHandlers(motion.onFocus, onFocus),
    onBlur: combineHandlers(motion.onBlur, onBlur),
  }

  if (to) {
    return (
      <Link to={to} onClick={onClick} {...sharedProps} {...restProps}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} onClick={onClick} {...sharedProps} {...restProps}>
        {children}
      </a>
    )
  }

  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      {...sharedProps}
      {...restProps}
    >
      {children}
    </button>
  )
}
