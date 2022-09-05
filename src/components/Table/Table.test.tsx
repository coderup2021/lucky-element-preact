import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import '@testing-library/jest-dom'
import Button from '../Button'
import Table, { TableProps, Column, DataSource } from './Table'

const handleItemClick = jest.fn()
const handleItemDelete = jest.fn()
const columns: Column[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '性别',
    dataIndex: 'male',
    key: 'male',
    render: (record) => <span>{record.male === 0 ? '男' : '女'}</span>,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    style: {
      width: 200,
    },
    render: (record) => (
      <span>
        <Button
          size="sm"
          btnType="primary"
          onClick={() => handleItemClick(record)}
          style={{ marginRight: 10 }}
        >
          编辑
        </Button>
        <Button
          size="sm"
          btnType="danger"
          onClick={() => handleItemDelete(record)}
        >
          删除
        </Button>
      </span>
    ),
  },
]

const dataSource: DataSource = [
  { name: '小王', age: 20, male: 0 },
  { name: '小红', age: 18, male: 1 },
  { name: '张三', age: 22, male: 0 },
  { name: '李四', age: 24, male: 1 },
]
const props: TableProps = {
  dataSource,
  columns,
}

describe('test Table Component', () => {
  it('should render Table correct based on props', () => {
    render(<Table {...props} />)
    const ele = screen.getByTestId('test-table')
    expect(ele.querySelector('.lucky-table')).toBeInTheDocument()
    const ths = ele
      .querySelector('thead')
      ?.querySelector('tr')
      ?.querySelectorAll('th')
    expect(ths?.length).toBe(4)
    expect((ths as NodeListOf<HTMLTableCellElement>)[0]).toHaveTextContent(
      '姓名',
    )
    expect((ths as NodeListOf<HTMLTableCellElement>)[1]).toHaveTextContent(
      '年龄',
    )
    expect((ths as NodeListOf<HTMLTableCellElement>)[2]).toHaveTextContent(
      '性别',
    )
    expect((ths as NodeListOf<HTMLTableCellElement>)[3]).toHaveTextContent(
      '操作',
    )

    expect(ele.querySelector('tbody')?.querySelectorAll('tr').length).toBe(4)
    const tds = ele
      .querySelector('tbody')
      ?.querySelector('tr')
      ?.querySelectorAll('td')
    expect(tds?.length).toBe(4)
    expect((tds as NodeListOf<HTMLTableCellElement>)[0]).toHaveTextContent(
      '小王',
    )
    expect((tds as NodeListOf<HTMLTableCellElement>)[1]).toHaveTextContent('20')
    expect(
      (tds as NodeListOf<HTMLTableCellElement>)[2].querySelector('span'),
    ).toHaveTextContent('男')

    const operation = (
      tds as NodeListOf<HTMLTableCellElement>
    )[3].querySelector('span')

    fireEvent.click(operation?.getElementsByTagName('button')[0] as Element)
    expect(handleItemClick).toBeCalledWith({ name: '小王', age: 20, male: 0 })

    fireEvent.click(operation?.getElementsByTagName('button')[1] as Element)
    expect(handleItemDelete).toBeCalledWith({ name: '小王', age: 20, male: 0 })
  })

  it('should render Table correct based on props with loading', () => {
    const props1 = { ...props }
    props1.loading = true
    render(<Table {...props1} />)
    const ele = screen.getByTestId('test-table')
    expect(ele.querySelector('.table-loading-wrapper')).toBeInTheDocument()
  })

  it('should render Table correct based on props with no data', () => {
    cleanup()
    const props1 = { ...props, dataSource: [] }

    render(<Table {...props1} />)
    const ele = screen.getByTestId('test-table')
    expect(ele.querySelector('.table-empty')).toBeInTheDocument()
  })

  it('should render Table correct based on props with pagination', () => {
    cleanup()
    props.pagination = {
      visible: true,
      total: 4,
    }
    render(<Table {...props} />)
    const ele = screen.getByTestId('test-table')
    expect(ele.querySelector('.pagination-box')).toBeInTheDocument()
  })
})
