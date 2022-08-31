import { FunctionComponent as FC, Component } from 'preact'
import Form, { FormProps } from './FormClass'
import Field, { FieldProps as ItemProps } from './Field'
import { useStore } from './store'
export type { FormProps, ItemProps }
export type { Rule, Rules, RuleMap } from './async-validator'
export type { FinishCallback, FinishErrCallback } from './store'

// type IFormProps = FC<FormProps> & {
//   Item: FC<ItemProps>
// }
type IFormClassProps = Component<FormProps> & {
  Item: FC<ItemProps>
}
const IForm = Form as unknown as IFormClassProps
IForm.Item = Field

export default IForm

export { useStore as useForm }
