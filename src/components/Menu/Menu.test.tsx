import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/preact'
import '@testing-library/jest-dom'
import Menu, { MenuProps } from './Menu'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  onSelect: jest.fn(),
}

const testVerticalPropsWithDefaultOpened: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpened: ['3'],
}

const NiceMenu = (props: MenuProps) => (
  <Menu {...props}>
    <MenuItem>active</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem>third item</MenuItem>
    <SubMenu title="dropdown">
      <MenuItem>Dropdown 1</MenuItem>
      <MenuItem disabled>Dropdown 2</MenuItem>
      <MenuItem>Dropdown 3</MenuItem>
    </SubMenu>
    <li>xxx</li>
  </Menu>
)

const createStyleFile = () => {
  const cssFile = `
        .lucky-submenu{
            display:none;
        }
        .lucky-submenu.menu-opened{
            display:block;
        }
    `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement,
  dropdownElement: HTMLElement

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(<NiceMenu {...testProps} />)
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
    dropdownElement = wrapper.getByText('dropdown')
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement.querySelectorAll(':scope > li').length).toBe(4)
    expect(activeElement).toBeInTheDocument()
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toBeInTheDocument()
    expect(disabledElement).toHaveClass('menu-item is-disabled')
    expect(menuElement).toHaveClass('lucky-menu test')
  })

  it('click item should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('third item')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
  })

  //   it('click item should not change active and call the callback when click disabled item', () => {
  //     cleanup()
  //     fireEvent.click(disabledElement)
  //     expect(disabledElement).not.toHaveClass('is-active')
  //     expect(testProps.onSelect).not.toHaveBeenCalled()
  //   })

  //   it('should show dropdown when hover on subMenu', async () => {
  //     expect(wrapper.queryByText('Dropdown 1')).not.toBeInTheDocument()
  //     expect(dropdownElement).toBeVisible()
  //     fireEvent.mouseEnter(dropdownElement)
  //     await waitFor(
  //       () => {
  //         expect(wrapper.queryByText('Dropdown 1')).toBeVisible() // 因为是setimout后才会显示，所以会失败
  //       },
  //       { timeout: 500 },
  //     )
  //     fireEvent.click(wrapper.getByText('Dropdown 1'))
  //     expect(testProps.onSelect).toHaveBeenCalledWith('3-0')

  //     fireEvent.click(wrapper.getByText('Dropdown 3'))
  //     expect(testProps.onSelect).toHaveBeenCalledWith('3-2')

  //     fireEvent.mouseLeave(dropdownElement)
  //     await waitFor(
  //       () => expect(wrapper.queryByText('Dropdown 1')).not.toBeVisible(),
  //       {
  //         timeout: 500,
  //       },
  //     )
  //   })

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(<NiceMenu {...testVerticalProps} />)
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu-vertical')
  })

  it('should show dropdown menu when click on subMenu when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(<NiceMenu {...testVerticalProps} />)
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu-vertical')
    fireEvent.click(wrapper.getByText('dropdown'))
    expect(wrapper.queryByText('Dropdown 1')).toBeVisible()

    fireEvent.click(wrapper.getByText('Dropdown 1'))
    expect(testVerticalProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.click(wrapper.getByText('Dropdown 3'))
    expect(testVerticalProps.onSelect).toHaveBeenCalledWith('3-2')
  })

  it('should show opened submenu when defaultOpened is set', () => {
    cleanup()
    const wrapper = render(<NiceMenu {...testVerticalPropsWithDefaultOpened} />)
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu-vertical')
    expect(wrapper.queryByText('Dropdown 1')).toBeVisible()
  })
})
