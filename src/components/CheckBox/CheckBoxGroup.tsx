import {
  h,
  FunctionComponent as FC,
  toChildArray,
  cloneElement,
  VNode,
} from 'preact'
import { useState, useEffect } from 'preact/hooks'
import classnames from 'classnames'
type CheckBoxGroupType = Array<string | number>

type State = {
  options: CheckBoxGroupType
}

export interface CheckBoxGroupProps
  extends Omit<h.JSX.HTMLAttributes, 'onChange'> {
  /**
   * CheckBoxGroup传入值
   */
  options?: CheckBoxGroupType
  disabled?: boolean
  /**
   * CheckBoxGrouponChange回调函数
   */
  onChange?: (value: CheckBoxGroupType) => void
}

export const CheckBoxGroup: FC<CheckBoxGroupProps> = (props) => {
  const { className, style, children, onChange, options, disabled } = props
  const classes = classnames('lucky-checkboxGroup', className)

  const data: State = { options: options || [] }
  const [state, setState] = useState(data)

  // 监听props数据变化进行数据修改
  useEffect(() => {
    if (state.options !== options) {
      setState({ options: options || [] })
    }
  }, [options, state.options])

  const handleChange = (value: string | number, checked: boolean): void => {
    const index = state.options.indexOf(value)

    if (checked) {
      if (index === -1) data.options.push(value)
    } else {
      data.options.splice(index, 1)
    }
    setState(data)

    typeof onChange === 'function' && onChange(state.options)
  }
  const childrens = toChildArray(children).map((child: any, index: number) => {
    if (!child) return null

    // 过滤group内部child不为CheckBox组件
    if (child?.type?.name !== 'InternalCheckbox') return null

    return cloneElement(
      child as VNode<any>,
      Object.assign({}, child.props, {
        key: index,
        checked:
          child.props.checked ||
          options?.includes(child.props.value) ||
          options?.includes(child.props.label),
        disabled: disabled,
        onChange: handleChange.bind(
          this,
          child.props.value
            ? child.props.value
            : child.props.value === 0
            ? 0
            : child.props.label,
        ),
      }),
    )
  })
  return (
    <div style={style} className={classes}>
      {childrens}
    </div>
  )
}

export default CheckBoxGroup
