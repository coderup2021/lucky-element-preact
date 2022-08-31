import { FunctionComponent as FC } from 'preact'
import { useCallback, useMemo } from 'preact/hooks'
import classnames from 'classnames'

export type Value = string | number | boolean
export interface SwitchProp {
  valueMap?: {
    on: Value
    off: Value
    // ['on' | 'off']: ValueType
  }
  onChange?: (value: Value) => void
  className?: string
  value?: Value
  error?: string
}
const Switch: FC<SwitchProp> = (props) => {
  const { value, valueMap, onChange, error, className, ...restProps } = props
  const _onChange: JSX.GenericEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      let value: Value = ev.currentTarget.checked
      if (valueMap) {
        if (
          value === true &&
          Object.prototype.hasOwnProperty.call(valueMap, 'on')
        ) {
          value = valueMap.on
        }
        if (
          value === false &&
          Object.prototype.hasOwnProperty.call(valueMap, 'off')
        ) {
          value = valueMap.off
        }
      }
      typeof onChange === 'function' && onChange(value)
    },
    [valueMap, onChange],
  )
  const checkedValue = useMemo(() => {
    if (valueMap) {
      if (valueMap.on === value) {
        return true
      }
    } else {
      if (value === true) {
        return true
      }
    }
    return false
  }, [value, valueMap])
  return (
    <div className={'lucky-switch-wrapper'} data-testid="test-switch">
      <input
        type="checkbox"
        checked={checkedValue}
        onInput={_onChange}
        className={classnames('switch', className)}
        {...restProps}
      />
      {error && <div className="lucky-form-error-info">{error}</div>}
    </div>
  )
}

export default Switch
