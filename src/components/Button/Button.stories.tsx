import { h, Story, Meta, StoryFn } from '@storybook/preact'
import '../../styles/index.scss'

import Button from './Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: "color" },
  //   },
} as Meta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<typeof Button> = (args) => (
  <Button {...args}>{args.children}</Button>
)

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  btnType: 'primary',
  children: '按钮',
}

export const Size: Story<typeof Button> = (args) => (
  <>
    <Button size="lg" btnType="primary" style={{ marginRight: 10 }}>
      按钮 大
    </Button>
    <Button size="sm" btnType="primary">
      按钮 小
    </Button>
  </>
)

export const Disabled: Story<typeof Button> = (args) => (
  <>
    <Button disabled btnType="primary" style={{ marginRight: 10 }}>
      禁用按钮
    </Button>
    <Button disabled btnType="danger" style={{ marginRight: 10 }}>
      禁用按钮
    </Button>
    <Button disabled>禁用按钮</Button>
  </>
)

export const Link = Template.bind({})
Link.args = {
  btnType: 'link',
  href: 'http://baidu.com',
  target: '__blank',
  children: '百度',
}
