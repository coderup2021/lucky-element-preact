import { useState } from 'preact/hooks'
import { Story, Meta } from '@storybook/preact'
import '../../styles/index.scss'

import Radio from './index'

export default {
  title: 'Example/Radio',
  component: Radio,
} as Meta<typeof Radio>

export const DefaultRadio: Story<typeof Radio> = (args) => {
  const [RadioValue, setRadioValue] = useState(1)
  const onChange = (value: string | number) => {
    setRadioValue(Number(value))
  }
  return (
    <>
      <Radio value="1" checked={RadioValue === 1} size="lg" onChange={onChange}>
        主选项
      </Radio>
      <Radio
        value="2"
        checked={RadioValue === 2}
        size="mid"
        onChange={onChange}
      >
        备选项1
      </Radio>
      <Radio
        value="3"
        checked={RadioValue === 3}
        size="sm"
        disabled
        onChange={onChange}
      >
        备选项2
      </Radio>
    </>
  )
}

export const CheckBoxGroupExample = () => {
  const [RadioGroupValue, setRadioGroupValue] = useState('v1')
  const RadioGroupChange = (value: string | number) => {
    console.log(value)
    setRadioGroupValue(String(value))
  }

  return (
    <>
      <Radio.Group value={RadioGroupValue} onChange={RadioGroupChange}>
        <Radio value="v1">v1</Radio>
        <Radio value="v2">v2</Radio>
        <Radio value="v3">3</Radio>
      </Radio.Group>
    </>
  )
}
