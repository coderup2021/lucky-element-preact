import { FunctionComponent as FC, JSX } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import Icon from '../../Icon'
import classnames from 'classnames'

const defaultText = {
  nextPage: '下一页',
  prevPage: '上一页',
  total: '共',
  page: '页',
  item: '条',
}
type textKey = 'nextPage' | 'prevPage' | 'total' | 'page' | 'item'
export interface PaginationProps {
  visible?: boolean
  pageSize?: number
  onPageSizeChange?: (pageSize: number) => void
  onPageChange?: (page: number, pageSize: number) => void
  total: number
  style?: JSX.AllCSSProperties
  pageSizeOptions?: number[]
  text?: {
    nextPage: string
    prevPage: string
    total: string
    page: string
    item: string
  }
}

const Pagination: FC<PaginationProps> = ({
  pageSize: propPageSize = 10,
  onPageSizeChange,
  onPageChange,
  total,
  style: propStyle = {},
  pageSizeOptions = [10, 20, 50, 100, 200],
  text,
}) => {
  const [pageNums, setPageNums] = useState<number[]>([])
  const [lastPage, setLastPage] = useState<number>(1)
  const [current, setCurrent] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(1)
  useEffect(() => {
    setPageSize(propPageSize)
  }, [propPageSize])
  useEffect(() => {
    const pages = Math.ceil(total / pageSize)
    const tmp: number[] = []
    for (let i = 1; i <= pages; i++) {
      tmp.push(i)
    }
    setPageNums(tmp)
    setLastPage(pages)
  }, [total, pageSize])

  const _onPageNumClick = useCallback(
    (num: number) => {
      if (Number(num) === Number(current)) return
      if (num > lastPage) {
        num = lastPage
      } else if (num < 1) {
        num = 1
      }
      setCurrent(num)
      typeof onPageChange === 'function' && onPageChange(num, pageSize)
    },
    [setCurrent, lastPage, onPageChange, current, pageSize],
  )

  const _onPageSizeChange: JSX.GenericEventHandler<HTMLSelectElement> =
    useCallback(
      (e) => {
        const { value } = e.currentTarget
        setCurrent(1)
        setPageSize(Number(value))
        typeof onPageSizeChange === 'function' &&
          onPageSizeChange(Number(value))
      },
      [onPageSizeChange],
    )

  const getDisplayText = (key: textKey) => {
    if (text && text[key]) return text[key]
    return defaultText[key]
  }

  return (
    <section
      class={'lucky-pagination-wrapper'}
      style={{ ...propStyle }}
      data-testid="test-pagination"
    >
      <span className={'total-and-page'}>
        {getDisplayText('total')}{' '}
        <span className="primary total-text ">{total}</span>{' '}
        {getDisplayText('item')}{' '}
        <span className="primary current-text">{current}</span>/
        <span className="last-page">{lastPage}</span>
        {getDisplayText('page')}
      </span>
      <ul className={'lucky-pagination'}>
        <li
          title={getDisplayText('prevPage')}
          className={classnames(
            'lucky-pagination-item',
            'lucky-pagination-item-prev',
            current === 1 ? 'lucky-pagination-disabled' : '',
          )}
          onClick={() =>
            _onPageNumClick(current - 1 > 0 ? current - 1 : current)
          }
        >
          <Icon icon={'caret-left'} size="sm" />
        </li>
        {pageNums.length > 0 &&
          pageNums.map((num) => {
            return (
              <li
                key={num}
                title="1"
                className={classnames(
                  'lucky-pagination-item',
                  current === num ? 'lucky-pagination-item-active' : '',
                )}
                tabIndex={num}
                onClick={() => _onPageNumClick(num)}
              >
                <span>{num}</span>
              </li>
            )
          })}
        <li
          title={getDisplayText('nextPage')}
          tabIndex={0}
          className={classnames(
            'lucky-pagination-item',
            'lucky-pagination-item-next',
            current === lastPage ? 'lucky-pagination-disabled' : '',
          )}
          onClick={() =>
            _onPageNumClick(current + 1 < lastPage ? current + 1 : lastPage)
          }
        >
          <Icon icon={'caret-right'} size="sm" />
        </li>
      </ul>
      <select className={'page-change-select'} onChange={_onPageSizeChange}>
        {pageSizeOptions.map((item) => {
          return (
            <option key={item} value={item}>{`${item} ${getDisplayText(
              'item',
            )}/${getDisplayText('page')}`}</option>
          )
        })}
      </select>
    </section>
  )
}
export default Pagination
