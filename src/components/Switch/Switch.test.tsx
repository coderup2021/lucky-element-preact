import { fireEvent, render, screen } from '@testing-library/preact'
import Switch, { SwitchProp } from '.'
import '@testing-library/jest-dom'

const props: SwitchProp = {
  onChange: jest.fn(),
  className: 'test-switch-style',
  value: true,
}

describe('test Switch Component', () => {
  it('should render Switch correct based on default props', () => {
    render(<Switch {...props} />)
    const ele = screen.getByTestId('test-switch')
    expect(ele).toBeInTheDocument()
    const switchEle = ele.querySelector('.switch')
    expect(switchEle).toBeInTheDocument()
    expect(switchEle).toBeChecked()

    fireEvent.click(switchEle as Element)
    expect(props.onChange).toBeCalledWith(false)
    expect(switchEle).not.toBeChecked()
  })

  it('should render Switch correct based on default not checked props', () => {
    const props1 = { ...props, value: false }
    render(<Switch {...props1} />)
    const ele = screen.getByTestId('test-switch')
    expect(ele).toBeInTheDocument()
    const switchEle = ele.querySelector('.switch')
    expect(switchEle).toBeInTheDocument()
    expect(switchEle).not.toBeChecked()

    fireEvent.click(switchEle as Element)
    expect(props1.onChange).toBeCalledWith(true)
    expect(switchEle).toBeChecked()
  })

  it('should render Switch correct based on props with valueMap', () => {
    const props2 = {
      ...props,
      valueMap: {
        on: 100,
        off: 200,
      },
      value: 200,
    }
    render(<Switch {...props2} />)
    const ele = screen.getByTestId('test-switch')
    expect(ele).toBeInTheDocument()
    const switchEle = ele.querySelector('.switch')
    expect(switchEle).toBeInTheDocument()
    expect(switchEle).not.toBeChecked()

    fireEvent.click(switchEle as Element)
    expect(props2.onChange).toBeCalledWith(100)
    expect(switchEle).toBeChecked()
  })

  it('should render Switch correct based on props with error prop', () => {
    const errorInfo = 'this is error info'
    const props2 = {
      ...props,
      error: errorInfo,
    }
    render(<Switch {...props2} />)
    expect(screen.getByText(errorInfo)).toBeInTheDocument()
    expect(screen.getByText(errorInfo)).toHaveClass('lucky-form-error-info')
  })
})
