import { h, FunctionComponent as FC } from 'preact'
import { InnerWWIconProps } from '../Icon'

const CaretUp: FC<InnerWWIconProps> = (props) => {
  const { size, className, style, ...restProps } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      style={{ width: size, height: size, ...style }}
      className={className}
      {...restProps}
    >
      <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
    </svg>
  )
}

export default CaretUp
