import { h, FunctionComponent as FC, ComponentChildren } from 'preact'
import classnames from 'classnames'

type ButtonSize = 'lg' | 'sm'

type ButtonType = 'primary' | 'default' | 'danger' | 'link'

export interface BaseButtonProps {
  /**
   * Custom Class
   */
  className?: string
  /**
   * Set Disabled
   */
  disabled?: boolean
  /**
   * Button Size
   */
  size?: ButtonSize
  /**
   * Button Type
   */
  btnType?: ButtonType
  children: ComponentChildren
  /**
   * href of 'a' tag, only valid when set btnType to 'link'
   */
  href?: string
  onClick: (event: MouseEvent) => void
}

//prettier-ignore
type NativeButtonProps = BaseButtonProps & Omit<h.JSX.HTMLAttributes<HTMLButtonElement>, 'size'>;
//prettier-ignore
type AnchorButtonProps = BaseButtonProps & Omit<h.JSX.HTMLAttributes<HTMLAnchorElement>, 'size'>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: FC<ButtonProps> = (props) => {
  //prettier-ignore
  const { btnType, onClick, size, disabled, children, href, className, ...restProps } = props;

  const classes = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: disabled,
  })

  const handleClick = (event: MouseEvent) => {
    if (!disabled) onClick && onClick(event)
  }

  if (btnType === 'link' && href) {
    return (
      <a href={href} className={classes} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button
        onClick={handleClick}
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
  size: 'sm',
}

export default Button
