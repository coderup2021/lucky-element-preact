import { fireEvent, render } from '@testing-library/preact'
import Select, { SelectProp } from './'
import '@testing-library/jest-dom'

const props: SelectProp = {
  options: [
    { name: 'option1', value: '1' },
    { name: 'option3', value: '3' },
    { name: 'option5', value: '5' },
    { name: 'option7', value: '7' },
  ],
  onChange: jest.fn(),
  value: '3',
}
describe('test Select Component', () => {
  it('should render Progress correct based on default props', () => {
    const wrapper = render(<Select {...props} />)
    const ele = wrapper.getByTestId('select-test')
    const display = ele.getElementsByClassName('display')[0]
    expect(wrapper.container).toBeInTheDocument()
    expect(ele).toHaveClass('lucky-select')
    expect(display.textContent).toBe('option3')
    expect(ele.getElementsByClassName('dropdown-box').length).toBe(0)

    //test show dropdown
    fireEvent.click(display)
    expect(ele.getElementsByClassName('dropdown-box').length).toBe(1)

    //test click item
    fireEvent.click(wrapper.getByText('option7'))
    expect(ele.getElementsByClassName('dropdown-box').length).toBe(0)
    expect(display.textContent).toBe('option7')
    expect(props.onChange).toHaveBeenCalledWith('7', {
      name: 'option7',
      value: '7',
    })
  })
})
