import { fireEvent, render, screen } from '@testing-library/preact'
import Pagination, { PaginationProps } from './'
import '@testing-library/jest-dom'

const props: PaginationProps = {
  pageSize: 10,
  onPageChange: jest.fn(),
  onPageSizeChange: jest.fn(),
  total: 100,
  pageSizeOptions: [10, 20, 50, 100],
}

describe('test Pagination Component', () => {
  let prevBtn: Element, nextBtn: Element, ele: Element, pageSelection: Element
  beforeEach(() => {
    render(<Pagination {...props} />)
    ele = screen.getByTestId('test-pagination')
    prevBtn = ele.querySelector('.lucky-pagination-item-prev') as Element
    nextBtn = ele.querySelector('.lucky-pagination-item-next') as Element
    pageSelection = ele.querySelector('.page-change-select') as Element
  })

  it('should render Pagination correct based on props', () => {
    expect(ele).toBeInTheDocument()
    expect(ele.getElementsByTagName('li').length).toBe(12)
    expect(ele.querySelector('.total-text')).toHaveTextContent('100')
    expect(ele.querySelector('.current-text')).toHaveTextContent('1')
    expect(ele.querySelector('.last-page')).toHaveTextContent('10')
    expect(pageSelection.querySelectorAll('option').length).toBe(4)
    expect(prevBtn).toHaveClass('lucky-pagination-disabled')

    // click page 2
    fireEvent.click(ele.getElementsByTagName('li')[2])
    expect(ele.querySelector('.current-text')).toHaveTextContent('2')
    expect(ele.getElementsByTagName('li')[2]).toHaveClass(
      'lucky-pagination-item-active',
    )
    expect(prevBtn).not.toHaveClass('lucky-pagination-disabled')

    // click next page button
    fireEvent.click(ele.querySelector('.lucky-pagination-item-next') as Element)
    expect(ele.querySelector('.current-text')).toHaveTextContent('3')
    expect(ele.getElementsByTagName('li')[3]).toHaveClass(
      'lucky-pagination-item-active',
    )
    expect(prevBtn).not.toHaveClass('lucky-pagination-disabled')
    expect(nextBtn).not.toHaveClass('lucky-pagination-disabled')

    // click prev page button
    fireEvent.click(ele.querySelector('.lucky-pagination-item-prev') as Element)
    expect(ele.querySelector('.current-text')).toHaveTextContent('2')
    expect(ele.getElementsByTagName('li')[2]).toHaveClass(
      'lucky-pagination-item-active',
    )
    expect(prevBtn).not.toHaveClass('lucky-pagination-disabled')
    expect(nextBtn).not.toHaveClass('lucky-pagination-disabled')

    // click last page
    fireEvent.click(ele.getElementsByTagName('li')[10])
    expect(ele.querySelector('.current-text')).toHaveTextContent('10')
    expect(ele.getElementsByTagName('li')[10]).toHaveClass(
      'lucky-pagination-item-active',
    )
    expect(prevBtn).not.toHaveClass('lucky-pagination-disabled')
    expect(nextBtn).toHaveClass('lucky-pagination-disabled')

    fireEvent.change(pageSelection, {
      target: { value: 50 },
    })
    expect(props.onPageSizeChange).toBeCalledWith(50)
    expect(ele.querySelector('.current-text')).toHaveTextContent('1')
    expect(ele.querySelector('.last-page')).toHaveTextContent('2')
  })
})
