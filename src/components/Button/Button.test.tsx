import { h } from 'preact'
import { render, fireEvent } from '@testing-library/preact'
import '@testing-library/jest-dom'

import Button, { ButtonProps } from './Button'

const defaultProps = {
  onClick: jest.fn(),
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'kclass',
}

const disabledProps = {
  disabled: true,
  onClick: jest.fn(),
}

describe('test Button Component', () => {
  it('shoulde render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
    expect(element).toBeEnabled()
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('shoulde render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn btn-primary btn-lg kclass')
  })

  it('shoulde render a link when btnType equals link and href is provided', () => {
    const wrapper = render(
      <Button btnType={'link'} href="http://baidu.com">
        Link
      </Button>,
    )
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })

  it('shoulde render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>disabled</Button>)
    const element = wrapper.getByText('disabled') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    expect(element).toBeDisabled()
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
