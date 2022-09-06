import InternalCheckbox, { CheckBoxProps } from './CheckBox'
import CheckBoxGroup, { CheckBoxGroupProps } from './CheckBoxGroup'
import { FunctionComponent } from 'preact'

export type { CheckBoxProps, CheckBoxGroupProps }

interface CompoundedComponent extends FunctionComponent<CheckBoxProps> {
  Group: typeof CheckBoxGroup
}

const CheckBox = InternalCheckbox as unknown as CompoundedComponent

CheckBox.Group = CheckBoxGroup

export default CheckBox
