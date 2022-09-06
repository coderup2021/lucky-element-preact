import { fireEvent, render } from '@testing-library/preact'
import Radio, { RadioGroupProps } from './'
import '@testing-library/jest-dom'

const props: RadioGroupProps = {
  value: 'v1',
  onChange: jest.fn(),
}
describe('test Radio Component', () => {
  it('should render Progress correct based on default props', () => {
    const wrapper = render(
      <>
        <Radio.Group {...props}>
          <Radio value="v1">v1</Radio>
          <Radio value="v2">v2</Radio>
          <Radio value="v3">3</Radio>
        </Radio.Group>
      </>,
    )
    const ele = wrapper.getByTestId('radio-test')
    const input_v1 = ele.getElementsByTagName('input')[0]
    const input_v2 = ele.getElementsByTagName('input')[1]
    expect(input_v1.checked).toBe(true)
    expect(input_v1.parentNode).toHaveClass('is-checked')

    // test click item
    fireEvent.click(input_v2)
    expect(input_v2.checked).toBe(true)
    expect(input_v2.parentNode).toHaveClass('is-checked')
  })
})
