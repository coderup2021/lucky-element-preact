import { Story, Meta } from '@storybook/preact'
import '../../styles/index.scss'

import AutoComplete, { AutoCompleteProps, DataSourceType } from './index'

export default {
  title: 'Example/Autocomplete',
  component: AutoComplete,
} as Meta<typeof AutoComplete>

const Template: Story<typeof AutoComplete> = (args) => (
  <AutoComplete {...args}>{args.children}</AutoComplete>
)

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {}

export const Size: Story<typeof AutoComplete> = (args) => {
  const memberList: DataSourceType<{ level: number }>[] = [
    { value: 'Nike', level: 1 },
    { value: 'Lining', level: 1 },
    { value: '361', level: 1 },
    { value: 'Anta', level: 1 },
    { value: 'Hongshuangxi', level: 1 },
    { value: 'Tianlan', level: 1 },
    { value: 'Xunchangbu', level: 1 },
    { value: 'Feiyan', level: 1 },
    { value: 'Byd', level: 1 },
    { value: 'Jili', level: 1 },
    { value: 'Qirui', level: 1 },
  ]
  const defaultAutoCompleteProps: AutoCompleteProps = {
    onSelect: (value) => {
      console.log('value', value)
    },
    fetchSuggestions: (value: string) => {
      console.log('value', value)
      return memberList.filter(
        (item) => item.value.toLowerCase().indexOf(value) > -1,
      )
    },
  }
  return <AutoComplete {...defaultAutoCompleteProps} />
}
