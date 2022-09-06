import { fireEvent, render } from '@testing-library/preact'
import CheckBox, { CheckBoxProps } from './'
import '@testing-library/jest-dom'

const props: CheckBoxProps = {
  disabled: false,
  checked: true,
  indeterminate: false,
  size: 'lg',
  onChange: jest.fn(),
}

describe('test CheckBox Component', () => {
  it('should render Progress correct based on default props', () => {
    const wrapper = render(<CheckBox {...props} />)
    const ele = wrapper.getByTestId('checkbox-test')
    const input = ele.getElementsByTagName('input')[0]
    expect(wrapper.container).toBeInTheDocument()
    expect(ele).toHaveClass('lucky-checkbox-wrapper')
    expect(ele).toHaveClass('checkbox-size-lg')
    expect(ele).toHaveClass('is-checked')
    expect(ele).not.toHaveClass('is-disable')
    expect(input.checked).toBe(true)

    // //test click item
    fireEvent.click(input)
    expect(ele).not.toHaveClass('is-checked')
    expect(input.checked).toBe(false)
  })
})
