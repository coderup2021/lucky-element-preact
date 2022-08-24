import Progress, { ProgressProps } from './'
import { FunctionComponent } from 'preact'
import { Story, Meta } from '@storybook/preact'
import '../../styles/index.scss'

export default {
  title: 'Example/Progress',
  component: Progress,
} as Meta<typeof Progress>

const defaultProgressProps: ProgressProps = {
  percentage: 80,
  barHeight: 10,
  showText: false,
  theme: 'primary',
}

export const Template: Story<typeof Progress> = (args) => {
  return <Progress {...args} />
}
Template.args = defaultProgressProps as
  | Partial<FunctionComponent<ProgressProps>>
  | undefined

export const danger = Template.bind({})
danger.args = {
  theme: 'danger',
  percentage: 30,
}
