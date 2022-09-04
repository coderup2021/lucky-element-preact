import { h, FunctionComponent as FC, VNode, JSX, ComponentChild } from 'preact'
import classnames from 'classnames'
// import Icon, { IconProp } from '../Icon'

type InputSize = 'lg' | 'sm'
export interface InputProps
  extends Omit<h.JSX.HTMLAttributes, 'icon' | 'size' | 'onChange'> {
  /**
   * 禁用Input
   */
  disabled?: boolean
  /**
   * Input的尺寸大小
   */
  size?: InputSize
  /**
   * 带图标的Input
   */
  //   icon?: IconProp
  /**
   * 带前缀的Input
   */
  prepend?: string | VNode
  /**
   * 带后缀的Input
   */
  append?: string | VNode
  /**
   * Input的onChange回调函数
   */
  onChange?: (value: string) => void

  /**
   * Input的尾部的组件
   */
  tail?: ComponentChild
  /**
   * Input组件校验的错误信息
   */
  error?: string
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装
 * ```
 * // 引入
 * import { Input } from 'lucky-element'
 * ```
 * 支持 HTMLInput 的所有基本属性
 * @param props
 * @returns
 */
export const Input: FC<InputProps> = (props) => {
  const {
    className,
    style,
    disabled,
    size,
    prepend,
    append,
    onChange,
    tail,
    error,
    ...restProps
  } = props
  const fixedControlledValue = (value: any) => {
    if (value === undefined || value === null) {
      return ''
    }
    return value
  }
  if ('value' in props) {
    restProps.value = fixedControlledValue(props.value)
  }

  const classes = classnames('lucky-input-wrapper', className, {
    'is-disable': disabled,
    [`input-size-${size}`]: size,
    'input-group': prepend || append,
    'input-group-prepend': prepend,
    'input-group-append': append,
    'input-group-error': error,
  })
  const handleChange: JSX.GenericEventHandler<HTMLInputElement> = (ev) => {
    typeof onChange === 'function' && onChange(ev.currentTarget.value)
  }
  return (
    <div className={classes} style={style} data-testid="test-input-wrapper">
      {prepend && <div className="lucky-input-group-prepend">{prepend}</div>}
      {/* {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )} */}
      <input
        className="lucky-input-inner"
        disabled={disabled}
        onInput={handleChange}
        {...restProps}
      />
      {append && <div className="lucky-input-group-append">{append}</div>}
      {tail && <div className="lucky-input-group-tail">{tail}</div>}
      {error && <div className="lucky-form-error-info">{error}</div>}
    </div>
  )
}
export default Input
