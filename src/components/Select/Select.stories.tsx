import { FunctionComponent } from 'preact'
import { Story, Meta } from '@storybook/preact'
import { action } from '@storybook/addon-actions'
import '../../styles/index.scss'
import Select, { SelectProp } from './'

export default {
  title: 'Example/Select',
  component: Select,
  parameters: {
    docs: { iframeHeight: 300 },
  },
} as Meta<typeof Select>

export const Template: Story<typeof Select> = () => {
  const defaultProgressProps: SelectProp = {
    options: [
      { name: 'XXX', value: 'x' },
      { name: 'YYY', value: 'y' },
      { name: 'ZZZ', value: 'z' },
    ],
    onChange: action('changed'),
  }
  return <Select {...defaultProgressProps} />
}
