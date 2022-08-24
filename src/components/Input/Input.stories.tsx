import { useState } from 'preact/hooks'
import { Story, Meta } from '@storybook/preact'
import '../../styles/index.scss'

import { Input } from './Input'

export default {
  title: 'Example/Input',
  component: Input,
} as Meta<typeof Input>

export const DefaultInput: Story<typeof Input> = (args) => {
  const [value, setValue] = useState<string>()
  const onValueChange = (value: string) => {
    setValue(value)
  }
  return (
    <>
      <Input style={{ width: 200 }} placeholder="default Input" />
      <Input
        defaultValue={value}
        value={value}
        style={{ width: 200 }}
        placeholder="controlled Input"
        onChange={onValueChange}
      />
    </>
  )
}

const Template: Story<typeof Input> = (args) => (
  <Input style={{ width: 200 }} {...args} />
)
export const disabled = Template.bind({})
disabled.args = {
  placeholder: 'disabled input',
  disabled: true,
}

export const iconInput = Template.bind({})
iconInput.args = {
  placeholder: 'icon input',
  icon: 'search',
}

export const prependInput = Template.bind({})
prependInput.args = {
  placeholder: 'append baidu',
  prepend: 'https://',
}

export const appendInput = Template.bind({})
appendInput.args = {
  placeholder: 'append input',
  append: '.com',
}
