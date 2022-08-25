import AutoComplete, { AutoCompleteProps, DataSourceType } from './AutoComplete'
import {
  render,
  fireEvent,
  waitFor,
  RenderResult,
} from '@testing-library/preact'
import '@testing-library/jest-dom'

const memberListNew: DataSourceType<{ level: number }>[] = [
  { value: 'Nike', level: 1 },
  { value: 'Lining', level: 1 },
  { value: '361', level: 1 },
  { value: 'Anta', level: 1 },
  { value: 'Hongshuangxi', level: 1 },
  { value: 'Tianlan', level: 1 },
  { value: 'Xunchangbu', level: 1 },
  { value: 'Feiyan', level: 1 },
  { value: 'Byd', level: 1 },
  { value: 'Jili', level: 1 },
  { value: 'Qirui', level: 1 },
]
const defaultProps: AutoCompleteProps = {
  onSelect: jest.fn(),
  fetchSuggestions: (value: string) =>
    memberListNew.filter(
      (item) => item.value.toLowerCase().indexOf(value.toLowerCase()) > -1,
    ),
  placeholder: 'auto-complete',
}

let wrapper: RenderResult
let inputNode: HTMLInputElement
describe('test AutoComplete component', () => {
  beforeEach(
    () => {
    // wrapper = render(<AutoComplete {...defaultProps} />);
    //prettier-ignore
  },
  )

  it('should render correct AutoComplet based on default props', async () => {
    wrapper = render(<AutoComplete {...defaultProps} />)
    inputNode = wrapper.getByPlaceholderText(
      'auto-complete',
    ) as HTMLInputElement
    fireEvent.input(inputNode, { target: { value: 'byd' } })
    await waitFor(
      () => {
        //prettier-ignore
        expect(wrapper.container.querySelectorAll(".suggestion-list").length).toBe(1);
      },
      { timeout: 1000 },
    )

    await waitFor(
      () => {
        //prettier-ignore
        expect(wrapper.container.querySelectorAll(".suggestion-item").length).toBe(1);
      },
      { timeout: 1000 },
    )
    fireEvent.click(wrapper.getByText('Byd'))
    expect(defaultProps.onSelect).toHaveBeenCalledWith({
      level: 1,
      value: 'Byd',
    })
    expect(inputNode.value).toBe('Byd')
    await waitFor(
      () => {
        //prettier-ignore
        expect(wrapper.container.querySelectorAll(".suggestion-list").length).toBe(0);
      },
      { timeout: 1000 },
    )
    fireEvent.input(inputNode, { target: { value: 'an' } })
    await waitFor(() => {
      //prettier-ignore
      expect(wrapper.container.querySelectorAll(".suggestion-list").length).toBe(1);
    })
    //prettier-ignore
    expect(wrapper.container.querySelectorAll(".suggestion-item").length).toBe(5);
    fireEvent.click(wrapper.getByText('Tianlan'))
    expect(defaultProps.onSelect).toHaveBeenCalledWith({
      level: 1,
      value: 'Tianlan',
    })
    expect(inputNode.value).toBe('Tianlan')
    //prettier-ignore
    expect(wrapper.container.querySelectorAll(".suggestion-list").length).toBe(0);
  })

  it('AutoComplete should support keyboard event', async () => {
    wrapper = render(<AutoComplete {...defaultProps} />)
    inputNode = wrapper.getByPlaceholderText(
      'auto-complete',
    ) as HTMLInputElement
    fireEvent.input(inputNode, { target: { value: 'an' } })
    await waitFor(() => {
      expect(wrapper.getByText('Anta')).toBeInTheDocument()
    })

    const firstItem = wrapper.getByText('Anta')
    const secondItem = wrapper.getByText('Hongshuangxi')
    const thirdItem = wrapper.getByText('Tianlan')
    //arrow-down
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(firstItem).toHaveClass('suggestion-item-highlighted')
    //arrow-down
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(secondItem).toHaveClass('suggestion-item-highlighted')
    //arrow-down
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(thirdItem).toHaveClass('suggestion-item-highlighted')
    //arrow-up
    fireEvent.keyDown(inputNode, { keyCode: 38 })
    expect(secondItem).toHaveClass('suggestion-item-highlighted')
    //enter
    fireEvent.keyDown(inputNode, { keyCode: 13 })
    expect(inputNode.value).toEqual('Hongshuangxi')
    //prettier-ignore
    expect(wrapper.container.querySelectorAll(".suggestion-list").length).toBe(0)
  })

  it('click outside should hide dropdown', async () => {
    wrapper = render(<AutoComplete {...defaultProps} />)
    inputNode = wrapper.getByPlaceholderText(
      'auto-complete',
    ) as HTMLInputElement
    fireEvent.input(inputNode, { target: { value: 'an' } })
    await waitFor(() => {
      expect(wrapper.getByText('Anta')).toBeInTheDocument()
    })

    fireEvent.click(document)
    expect(wrapper.queryByText('Anta')).not.toBeInTheDocument()
  })

  it('should render correct template based on renderOption prop', async () => {
    defaultProps.renderOption = (item) => (
      <p className="test-render">{item.value}</p>
    )
    wrapper = render(<AutoComplete {...defaultProps} />)
    //prettier-ignore
    inputNode = wrapper.getByPlaceholderText("auto-complete") as HTMLInputElement;

    fireEvent.input(inputNode, { target: { value: 'an' } })
    await waitFor(() => {
      expect(wrapper.getByText('Anta')).toBeInTheDocument()
    })

    expect(wrapper.container.querySelectorAll('p.test-render').length).toBe(5)
  })

  it('should render correct AutoComplet based on async props', async () => {
    defaultProps.fetchSuggestions = (query: string) => {
      if (query === undefined || query === null || query === '') return []
      const data = memberListNew.filter(
        (item) => item.value.toLowerCase().indexOf(query.toLowerCase()) > -1,
      )
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(data)
        }, 1000)
      })
      //   return Promise.resolve(data)
    }
    wrapper = render(<AutoComplete {...defaultProps} />)
    //prettier-ignore
    inputNode = wrapper.getByPlaceholderText( "auto-complete") as HTMLInputElement;

    fireEvent.input(inputNode, { target: { value: 'an' } })
    await waitFor(
      () => {
        //prettier-ignore
        expect(wrapper.container.querySelectorAll(".suggestion-loading-icon").length).toBe(1);
      },
      {
        timeout: 1000,
      },
    )
    await waitFor(
      () => {
        expect(wrapper.getByText('Anta')).toBeInTheDocument()
      },
      {
        timeout: 1100,
      },
    )
  })
})
