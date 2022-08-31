import { JSX, FunctionComponent as FC } from 'preact'
import { useState, useEffect, useCallback, useRef } from 'preact/hooks'
import Icon from '../Icon'
import classnames from 'classnames'
import useClickOutside from '../../hooks/useClickOutside'

export interface OptionProp extends Record<string, unknown> {
  name: string | number
  value: SelectValue
}

type SelectValue = string | number
export interface SelectProp
  extends Omit<
    JSX.HTMLAttributes<HTMLDivElement>,
    'defaultValue' | 'onChange'
  > {
  onChange?: (value: SelectValue, option: OptionProp) => void
  width?: number
  value?: SelectValue
  options: OptionProp[]
  className?: string
  error?: string
}

const getDisplayTextByValue = (value: SelectValue, options: OptionProp[]) => {
  return options.find((item) => item.value === value)
}

const Select: FC<SelectProp> = (props) => {
  const {
    onChange,
    width,
    value: defaultValue,
    options,
    className,
    error,
    ...restProps
  } = props
  console.log('error', error)
  const [optionVisible, setOptionVisible] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const componentRef = useRef<HTMLDivElement>(null)
  const klasses = classnames('lucky-select', className)

  useEffect(() => {
    const item = getDisplayTextByValue(defaultValue as SelectValue, options)
    let displayText = ''
    if (item) displayText = String(item.name)
    setDisplayText(displayText)
  }, [defaultValue, options])

  useClickOutside(componentRef, () => setOptionVisible(false))

  const toggleShow = useCallback(() => {
    setOptionVisible((v) => !v)
  }, [])

  const handleOptionClick = useCallback(
    (option: OptionProp) => {
      setDisplayText(String(option.name))
      toggleShow()
      typeof onChange === 'function' && onChange(option.value, option)
    },
    [onChange, toggleShow],
  )
  const getKey = useCallback((item: OptionProp) => {
    return `${item.name}---${item.value}`
  }, [])

  return (
    <div
      className={klasses}
      data-testid="select-test"
      style={{ width: width ? width : '100%' }}
      ref={componentRef}
      {...restProps}
    >
      <div onClick={toggleShow} className={'display'}>
        <Icon
          icon={optionVisible ? 'caret-up' : 'caret-down'}
          theme="info"
          size="sm"
          className="select-icon"
        />
        {displayText}
      </div>
      {error && <div className="lucky-form-error-info">{error}</div>}

      {optionVisible && (
        <div className="dropdown-box">
          {options.map((option) => (
            <p
              onClick={() => handleOptionClick(option)}
              className={'option'}
              key={getKey(option)}
            >
              {option.name}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default Select
