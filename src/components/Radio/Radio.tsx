import { h, FunctionComponent as FC, JSX } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import classnames from 'classnames'

type RadioSize = 'lg' | 'mid' | 'sm'

export interface RadioProps
  extends Omit<h.JSX.HTMLAttributes, 'size' | 'onChange'> {
  /**
   * 禁用Radio
   */
  disabled?: boolean
  /**
   * radio值，必填
   */
  value: string | number
  /**
   * 是否选中
   */
  ischecked?: boolean
  /**
   * Radio的尺寸大小
   */
  size?: RadioSize
  /**
   * Radio的onChange回调函数
   */
  onChange?: (value: string | number) => void
}

/**
 * Radio 是最基础的表单域的包装
 * ```
 * // 引入
 * import { Radio } from 'lucky-element'
 * ```
 * 支持 HTMLINPUT 的所有基本属性
 * @param props
 * @returns
 */
export const InternalRadio: FC<RadioProps> = (props) => {
  const {
    className,
    style,
    disabled,
    checked,
    size,
    value,
    children,
    onChange,
  } = props

  const [state, setState] = useState({ checked: checked || false })

  // 监听props数据变化进行数据修改
  useEffect(() => {
    if (state.checked !== checked) {
      setState({ checked: checked || false })
    }
  }, [checked, state.checked])

  const labelclasses = classnames('lucky-radio-wrapper', className, {
    'is-disable': disabled,
    'is-checked': state.checked,
    [`radio-size-${size}`]: size,
  })

  const spanclass = classnames('lucky-radio__span', className, {
    'is-disable': disabled,
    'is-checked': state.checked,
  })

  const handleChange: JSX.GenericEventHandler<HTMLInputElement> = (ev) => {
    if (ev.currentTarget.checked) {
      typeof onChange === 'function' && onChange(value)
    }
    setState({ checked: ev.currentTarget.checked })
  }

  return (
    <label className={labelclasses} style={style}>
      <span className={spanclass}>
        <input
          type="radio"
          className="lucky-radio__original"
          value={value}
          checked={state.checked}
          disabled={disabled}
          onChange={handleChange}
        />
        <span className="lucky-radio-inner"></span>
      </span>
      {children || value}
    </label>
  )
}

export default InternalRadio
