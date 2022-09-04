import { h, FunctionComponent as FC, JSX } from 'preact'
import classnames from 'classnames'
import { useEffect, useState } from 'preact/hooks'
import Coffee from './components/Coffee'
import Spinner from './components/Spinner'
import CaretLeft from './components/CaretLeft'
import CaretRight from './components/CaretRight'
import CaretUp from './components/CaretUp'
import CaretDown from './components/CaretDown'

export type SizeProp =
  | 'xs'
  | 'lg'
  | 'sm'
  | '1x'
  | '2x'
  | '3x'
  | '4x'
  | '5x'
  | '6x'
  | '7x'
  | '8x'
  | '9x'
  | '10x'
  | string

export type WWIconProp =
  | 'coffee'
  | 'spinner'
  | 'caret-left'
  | 'caret-right'
  | 'caret-down'
  | 'caret-up'
export interface WWIconProps {
  icon: WWIconProp
  className?: string
  theme?: ThemeProps
  size?: SizeProp
  spin?: boolean
}

export interface InnerWWIconProps extends Omit<WWIconProps, 'size'> {
  size?: number
  style?: JSX.CSSProperties
}

export type ThemeProps =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark'

const smSize = 16
const lgSize = 24
const xsSize = 32
const Icon: FC<WWIconProps> = (props) => {
  const { icon, className, size = 'sm', theme, spin = false } = props
  const [iSize, setISize] = useState(smSize)
  useEffect(() => {
    if (size.endsWith('px')) {
      setISize(Number(size.replace(/px/gi, '')))
    } else if (size === 'sm') {
      setISize(smSize)
    } else if (size === 'lg') {
      setISize(lgSize)
    } else if (size === 'xs') {
      setISize(xsSize)
    } else if (size.endsWith('x')) {
      setISize(Number(size.replace('x', '')) * smSize)
    } else if (size.match(/\d+/)) {
      setISize(Number(size))
    } else {
      setISize(smSize)
    }
  }, [size])
  const classes = classnames('lucky-icon', className, {
    [`lucky-icon-${theme}`]: theme,
    'lucky-spin-icon-rotate': spin,
  })

  switch (icon) {
    case 'coffee':
      return <Coffee icon={icon} size={iSize} className={classes} />
    case 'spinner':
      return <Spinner icon={icon} size={iSize} className={classes} />
    case 'caret-left':
      return <CaretLeft icon={icon} size={iSize} className={classes} />
    case 'caret-right':
      return <CaretRight icon={icon} size={iSize} className={classes} />
    case 'caret-up':
      return <CaretUp icon={icon} size={iSize} className={classes} />
    case 'caret-down':
      return <CaretDown icon={icon} size={iSize} className={classes} />
    default:
      return null
  }
}

Icon.defaultProps = {
  theme: 'info',
  size: 'sm',
  spin: false,
}

export default Icon
