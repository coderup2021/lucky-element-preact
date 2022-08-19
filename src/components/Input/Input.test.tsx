import { h } from 'preact'
import { render, fireEvent, RenderResult } from '@testing-library/preact'
import '@testing-library/jest-dom'
import Input from './'

let wrapper: RenderResult

describe('test Input Component', () => {
  beforeEach(() => {})
  const defaultProps = {
    placeholder: 'test input',
    onChange: jest.fn(),
  }
  it('should render correct Input based on default props', () => {
    wrapper = render(<Input {...defaultProps} />)
    const inputEle = wrapper.getByTestId('test-input-wrapper')
    expect(inputEle).toBeInTheDocument()
    expect(inputEle).toHaveClass('lucky-input-wrapper')
    expect(inputEle.getElementsByTagName('input').length).toEqual(1)
    expect(inputEle.getElementsByTagName('input')[0]).toHaveClass(
      'lucky-input-inner',
    )
    const input = wrapper.getByPlaceholderText('test input') as HTMLInputElement
    fireEvent.input(input, { target: { value: '2' } })
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(input.value).toEqual('2')
  })
  it('should render correct Input based on disabled props', () => {
    wrapper = render(<Input disabled />)
    const inputEle = wrapper.getByTestId('test-input-wrapper')
    expect(inputEle).toBeInTheDocument()
    expect(inputEle).toHaveClass('is-disable')
    expect(inputEle.getElementsByTagName('input')[0].disabled).toBeTruthy()
  })
  it('should render correct Input based on small size props', () => {
    wrapper = render(<Input size="sm" />)
    const inputEle = wrapper.getByTestId('test-input-wrapper')
    expect(inputEle).toBeInTheDocument()
    expect(inputEle).toHaveClass('lucky-input-wrapper input-size-sm')
  })
  it('should render correct Input based on lg size props', () => {
    wrapper = render(<Input size="lg" />)
    const inputEle = wrapper.getByTestId('test-input-wrapper')
    expect(inputEle).toBeInTheDocument()
    expect(inputEle).toHaveClass('lucky-input-wrapper input-size-lg')
  })
  //   it('should render correct Input based on search icon props', () => {
  //     wrapper = render(<Input icon="search" />)
  //     const inputEle = wrapper.getByTestId('test-input-wrapper')
  //     expect(inputEle).toBeInTheDocument()
  //     expect(inputEle.getElementsByClassName('icon-wrapper').length).toEqual(1)
  //   })
  it('should render correct Input based on search prepend props', () => {
    wrapper = render(<Input prepend="http://" />)

    const inputEle = wrapper.getByTestId('test-input-wrapper')
    expect(inputEle).toBeInTheDocument()
    expect(inputEle).toHaveClass(
      'lucky-input-wrapper input-group input-group-prepend',
    )
    expect(
      inputEle.getElementsByClassName('lucky-input-group-prepend').length,
    ).toEqual(1)
    expect(wrapper.getByText('http://')).toBeInTheDocument()
  })
  it('should render correct Input based on search append props', () => {
    wrapper = render(<Input append=".com" />)
    const inputEle = wrapper.getByTestId('test-input-wrapper')
    expect(inputEle).toBeInTheDocument()
    expect(inputEle).toHaveClass(
      'lucky-input-wrapper input-group input-group-append',
    )
    expect(
      inputEle.getElementsByClassName('lucky-input-group-append').length,
    ).toEqual(1)
    expect(wrapper.getByText('.com')).toBeInTheDocument()
  })
})
