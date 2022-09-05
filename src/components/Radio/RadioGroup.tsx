import { h, FunctionComponent as FC, toChildArray, cloneElement, VNode } from 'preact'
import classnames from 'classnames'

type RadioGroupType = string | number

type State = {
    value: RadioGroupType
};

export interface RadioGroupProps
  extends Omit<h.JSX.HTMLAttributes, 'onChange'> {

  /**
   * RadioGroup传入值
   */
  value?: RadioGroupType
  disabled?: boolean
  /**
   * RadioGrouponChange回调函数
   */
  onChange?: (value: RadioGroupType) => void
}

export const RadioGroup: FC<RadioGroupProps> = (props) => {
  const {
    className,
    style,
    children,
    onChange,
    value,
    disabled,
    ...restProps
  } = props
  const classes = classnames('lucky-radioGroup', className)

  const handleChange = (value: RadioGroupType): void => {
    typeof onChange === 'function' && onChange(value);
  }

  const childrens = toChildArray(children).map((child: any, index: number) => {
    if (!child) return null;

    // 过滤group内部child不为Radio组件
    if (child?.type?.name !== 'InternalRadio') return null;

    return cloneElement(child as VNode<any>, Object.assign({}, child.props, {
      key: index,
      disabled: disabled,
      onChange: handleChange.bind(this),
      checked: child.props.value === value
    }))
  })

  return (
    <div style={style} className={classes} data-testid="radio-test">
      {childrens}
    </div>
  )
}

export default RadioGroup