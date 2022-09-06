import { h, FunctionComponent as FC, JSX } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import classnames from 'classnames'

type CheckBoxSize = 'lg' | 'sm'

type State = {
  checked?: boolean
}

export interface CheckBoxProps
  extends Omit<h.JSX.HTMLAttributes, 'size' | 'onChange'> {
  /**
   * 禁用CheckBox
   */
  disabled?: boolean
  /**
   * 是否全选
   */
  indeterminate?: boolean
  /**
   * CheckBox的尺寸大小
   */
  size?: CheckBoxSize
  /**
   * CheckBox的onChange回调函数
   */
  onChange?: (value: boolean) => void
}

/**
 * CheckBox 是最基础的表单域的包装
 * ```
 * // 引入
 * import { CheckBox } from 'lucky-element'
 * ```
 * 支持 HTMLINPUT 的所有基本属性
 * @param props
 * @returns
 */
export const InternalCheckbox: FC<CheckBoxProps> = (props) => {
  const {
    className,
    style,
    disabled,
    checked,
    indeterminate,
    size,
    children,
    label,
    onChange,
    ...restProps
  } = props
  const data: State = { checked: checked || false }
  const [state, setState] = useState(data)

  // 监听props数据变化进行数据修改
  useEffect(() => {
    if (state.checked !== checked) {
      setState({ checked: checked || false })
    }
  }, [checked, state.checked])

  if ('value' in props) {
    restProps.value = props.value ? props.value : ''
  }

  const labelclasses = classnames('lucky-checkbox-wrapper', className, {
    'is-disable': disabled,
    'is-checked': state.checked,
    [`checkbox-size-${size}`]: size,
  })

  const spanclass = classnames('lucky-checkbox__input', className, {
    'is-disable': disabled,
    'is-checked': state.checked,
    'is-indeterminate': indeterminate,
  })

  const handleChange: JSX.GenericEventHandler<HTMLInputElement> = (ev) => {
    setState({ checked: ev.currentTarget.checked })
    typeof onChange === 'function' && onChange(ev.currentTarget.checked)
  }

  return (
    <label className={labelclasses} style={style} data-testid="checkbox-test">
      <span className={spanclass}>
        <input
          className="checkbox__original"
          type="checkbox"
          aria-hidden="false"
          aria-label
          disabled={disabled}
          checked={state.checked}
          onChange={handleChange}
          {...restProps}
        />
        <span className="lucky-checkbox-inner"></span>
      </span>
      {children || label}
    </label>
  )
}

export default InternalCheckbox
