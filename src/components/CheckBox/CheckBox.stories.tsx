import { useState } from 'preact/hooks'
import { Story, Meta } from '@storybook/preact'
import '../../styles/index.scss'

import CheckBox from './index'

export default {
  title: 'Example/CheckBox',
  component: CheckBox,
} as Meta<typeof CheckBox>

export const DefaultCheckBox: Story<typeof CheckBox> = (args) => {
  const [checked, setChecked] = useState<boolean>(true)
  const onValueChange = (value: boolean) => {
    setChecked(value)
  }
  return (
    <>
      <CheckBox> <span>默认状态</span>  </CheckBox>
      <CheckBox onChange={onValueChange} checked={checked} ><span>默认选中状态</span></CheckBox>
    </>
  )
}

export const disableCheckBox = () => <CheckBox disabled={true} />;

export const sizeCheckBox = () => {
  return (
    <>
      <CheckBox size='sm' />
      <CheckBox size='lg' />
    </>
  )
};

export const indeterminateCheckBox = () => {
  return (
    <>
      <CheckBox indeterminate={true}></CheckBox>
    </>
  )
};

export const CheckBoxGroupExample = () => {
  const [options, setOptions] = useState<Array<string | number>>([1, 2])
  const CheckBoxGrouChange = (options :Array<string | number>) => {
    setOptions(options)
  }
  return (
    <>
      <CheckBox.Group options={options} onChange={CheckBoxGrouChange}>
        <CheckBox label="1" value={1}></CheckBox>
        <CheckBox label="2" value={2}></CheckBox>
      </CheckBox.Group>
    </>
  )
};
