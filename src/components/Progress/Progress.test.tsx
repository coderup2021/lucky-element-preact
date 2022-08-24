import { render, RenderResult } from '@testing-library/preact'
import Progress from './'
import '@testing-library/jest-dom'

describe('test Progress Component', () => {
  let wrapper: RenderResult
  let ele: HTMLElement
  let outterBar: HTMLElement
  let innerBar: HTMLElement
  let innerText: HTMLElement
  beforeEach(() => {
    wrapper = render(<Progress percentage={30} />)
    ele = wrapper.getByTestId('progress-bar')
    outterBar = ele.getElementsByTagName('div')[0]
    innerBar = outterBar.getElementsByTagName('div')[0]
    innerText = innerBar.getElementsByTagName('span')[0]
  })
  it('should render Progress correct based on default props', () => {
    expect(wrapper.container).toBeInTheDocument()
    expect(ele).toHaveClass('lucky-progress-bar')
    expect(outterBar).toHaveClass('progress-bar-outter')
    expect(innerBar).toHaveClass('progress-bar-inner')
    expect(innerText).toHaveClass('inner-text')
    expect(innerText.textContent).toBe('30%')
  })
})
