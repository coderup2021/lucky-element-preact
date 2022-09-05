import { h, FunctionComponent as FC, VNode, JSX } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import Pagination, { PaginationProps } from './Pagination'
import Icon from '../Icon'
import classnames from 'classnames'

type ColumnKey = string
type DataIndex = string
export type Render = (record: Record) => VNode
interface Renders {
  [key: string]: Render
}
export interface Record {
  [key: DataIndex]: any
}
export type DataSource = Record[]
export interface Column {
  /**
   * 列名称
   */
  title: string
  /**
   * 数据索引
   */
  dataIndex: DataIndex
  /**
   * 唯一索引key
   */
  key: string
  /**
   * 渲染函数
   */
  render?: Render
  /**
   * 该列的表头样式
   */
  style?: JSX.CSSProperties
}
export interface TableProps {
  /**
   * 列数据
   */
  columns: Column[]
  /**
   * 数据源
   */
  dataSource?: DataSource
  /**
   * 是否正在加载
   */
  loading?: boolean
  /**
   * 表头样式
   */
  headerStyle?: JSX.AllCSSProperties
  /**
   * 表格样式
   */
  style?: JSX.AllCSSProperties
  /**
   * 分页属性
   */
  pagination?: PaginationProps
  /**
   * 空列表显示文本
   */
  emptyText?: string
}

/**
 * Table 表格 根据数据渲染表格
 * ```
 * // 引入
 * import { Table, TableProps, Column, DataSource, Record } from 'lucky-preact-element'
 * ```
 *
 * @param props
 * @returns
 */
const Table: FC<TableProps> = ({
  columns,
  dataSource: propDataSource = [],
  loading,
  headerStyle = {},
  style: propStyle = {},
  emptyText,
  pagination,
}) => {
  const visible = pagination?.visible || false
  const pageSize = pagination?.pageSize || 10
  const text = pagination?.text
  const [columnKeys, setColumnKeys] = useState<ColumnKey[]>([])
  const [renders, setRenders] = useState<Renders>({})
  const [dataSource, setDataSource] = useState<DataSource>([])
  useEffect(() => {
    const _data = propDataSource.slice(0, pageSize)
    setDataSource(_data)
  }, [propDataSource, pageSize])

  const _onPageChange = useCallback(
    (num: number, _pageSize = pageSize) => {
      const _data = propDataSource.slice((num - 1) * _pageSize, num * _pageSize)
      setDataSource(_data)
    },
    [propDataSource, pageSize],
  )

  const _onPageSizeChange = useCallback(
    (pageSize: number) => {
      const _data = propDataSource.slice(0, pageSize)
      setDataSource(_data)
    },
    [propDataSource],
  )
  const _randomString = (len: number) => {
    len = len || 12
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    const maxPos = $chars.length
    let str = ''
    for (let i = 0; i < len; i++) {
      str += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return str
  }

  const initDataRender = (columns: Column[]) => {
    if (!columns) return
    const tmpKeys: string[] = []
    const tmpRenders: Renders = {}

    for (const column of columns) {
      tmpKeys.push(column.key)
      if (column.render && typeof column.render === 'function')
        tmpRenders[column.key] = column.render
    }
    setColumnKeys(tmpKeys)
    setRenders(tmpRenders)
  }
  useEffect(() => {
    initDataRender(columns)
  }, [columns])

  return (
    <div
      className={classnames('lucky-table-wrapper', 'clearfix')}
      data-testid="test-table"
    >
      <table className={'lucky-table'} style={propStyle}>
        <thead>
          <tr>
            {columns &&
              columns.map((column) => {
                return (
                  <th
                    key={column.key}
                    style={{ ...headerStyle, ...column.style }}
                  >
                    {column.title}
                  </th>
                )
              })}
          </tr>
        </thead>
        <tbody>
          {dataSource &&
            dataSource.map((data) => {
              const id = _randomString(12)
              return (
                <tr key={id}>
                  {columnKeys.map((key) => {
                    return (
                      <td key={key}>
                        {renders[key] ? renders[key](data) : data[key]}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          {dataSource.length < 1 && <Empty text={emptyText} />}
        </tbody>
        {loading && (
          <div className="table-loading-wrapper">
            <Icon icon="spinner" theme="primary" spin size="2x" />
          </div>
        )}
      </table>
      {visible && dataSource.length > 1 && (
        <div className="pagination-box">
          <Pagination
            text={text}
            onPageChange={_onPageChange}
            onPageSizeChange={_onPageSizeChange}
            total={propDataSource.length}
          />
        </div>
      )}
    </div>
  )
}
interface EmptyProps {
  text?: string
}
const Empty: FC<EmptyProps> = ({ text = '暂无数据' }) => {
  return (
    <div className={'table-empty'}>
      <div className={'table-empty-image'}>
        <svg
          width="64"
          height="41"
          viewBox="0 0 64 41"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(0 1)" fill="none" fillRule="evenodd">
            <ellipse fill="#F5F5F5" cx="32" cy="33" rx="32" ry="7" />
            <g fillRule="nonzero" stroke="#D9D9D9">
              <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
              <path
                d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                fill="#FAFAFA"
              />
            </g>
          </g>
        </svg>
      </div>
      <p className={'tableEmptyDescription'}>{text}</p>
    </div>
  )
}

export default Table
