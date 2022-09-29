import { VNode, FunctionComponent as FC } from 'preact'
import { useState, useEffect, useRef } from 'preact/hooks'
import Input, { InputProps } from '../Input'
import Icon from '../Icon/Icon'
import { useDebounce } from '../../hooks/useDebounce'
import classnames from 'classnames'
import useClickOutside from '../../hooks/useClickOutside'
import Transition from '../Transition'

export interface DataSourceObject {
  value: string
}

export type DataSourceType<T = {}> = DataSourceObject & T

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (
    query: string,
  ) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => VNode
}
const isPromise = (p: any) =>
  Object.prototype.toString.call(p) === '[object Promise]'

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { onSelect, value, fetchSuggestions, renderOption, ...restProps } =
    props
  const [inputValue, setInputValue] = useState(value)
  const [showDropDown, setShowDropDown] = useState(false)
  const debouncedValue = useDebounce(inputValue as string, 300)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)

  useClickOutside(componentRef, () => setSuggestions([]))

  useEffect(() => {
    if (suggestions.length > 0) {
      setShowDropDown(true)
    } else {
      setShowDropDown(false)
    }
  }, [suggestions])

  useEffect(() => {
    if (
      triggerSearch.current &&
      debouncedValue !== undefined &&
      debouncedValue !== null &&
      debouncedValue !== ''
    ) {
      const res = fetchSuggestions(debouncedValue as string)
      if (isPromise(res)) {
        setLoading(true)
        ;(res as Promise<DataSourceType[]>).then((data) => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(res as DataSourceType[])
      }
      setHighlightedIndex(-1)
    }
  }, [debouncedValue, fetchSuggestions])

  const handleChange = (value: string) => {
    triggerSearch.current = true
    setInputValue(value)
  }

  const highlight = (index: number) => {
    if (index < 0) index = 0

    if (index > suggestions.length - 1) index = suggestions.length - 1

    setHighlightedIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case 13: //'enter'
        handleSelect(highlightedIndex)
        break

      case 38: //'arrow up'
        highlight(highlightedIndex - 1)
        break

      case 40: //'arrow down'
        highlight(highlightedIndex + 1)
        break

      case 27: //'esc' 我的mac电脑 按下esc键后，不会触发该事件，只会让input失去焦点
        setSuggestions([])
        break

      default:
        break
    }
  }

  const handleSelect = (index: number) => {
    triggerSearch.current = false
    const item = suggestions[index]
    if (!item) return
    setInputValue(item.value)
    setSuggestions([])
    if (typeof onSelect === 'function') {
      onSelect(item)
    }
  }

  const generateDropdown = (suggestions: DataSourceType[]) => {
    const getCnames = (index: number) =>
      classnames('suggestion-item', {
        'suggestion-item-highlighted': index === highlightedIndex,
      })

    return (
      <Transition
        animation="zoom-in-top"
        in={showDropDown || loading}
        duration={'300ms'}
      >
        {suggestions.length === 0 && loading && (
          <div className="suggestion-list suggestion-loading-icon">
            <Icon icon="spinner" theme="primary" spin size="2x" />
          </div>
        )}
        {suggestions.length > 0 && (
          <ul className="suggestion-list">
            {loading && (
              <div className="suggestion-loading-icon">
                <Icon icon="spinner" theme="primary" spin size="2x" />
              </div>
            )}
            {suggestions.length > 0 &&
              suggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={getCnames(index)}
                >
                  {renderOption ? renderOption(item) : item.value}
                </li>
              ))}
          </ul>
        )}
      </Transition>
    )
  }

  return (
    <div
      className="lucky-auto-complete"
      data-testid="test-auto-complete"
      ref={componentRef}
    >
      <Input
        value={inputValue as string}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {generateDropdown(suggestions)}
    </div>
  )
}

export default AutoComplete
