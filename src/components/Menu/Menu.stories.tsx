import { ComponentStory, ComponentMeta } from '@storybook/preact'
import '../../styles/index.scss'

import Menu from './Menu'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'

export default {
  title: 'Example/Menu',
  component: Menu,
  decorators: [
    (storyFn) => {
      return <div style={{ minHeight: 200 }}>{storyFn()}</div>
    },
  ],
} as ComponentMeta<typeof Menu>

const Template: ComponentStory<typeof Menu> = (props) => (
  <Menu {...props}>
    <MenuItem>active</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem>third item</MenuItem>
    <SubMenu title="dropdown">
      <MenuItem>Dropdown 1</MenuItem>
      <MenuItem disabled>Dropdown 2</MenuItem>
      <MenuItem>Dropdown 3</MenuItem>
    </SubMenu>
  </Menu>
)

export const Horizontal = Template.bind({})
Horizontal.args = {}

export const Vertical = Template.bind({})
Vertical.args = {
  mode: 'vertical',
}
