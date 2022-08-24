import { FunctionComponent as FC } from 'preact'
import Form, { FormProps } from './Form'
import Field, { FieldProps as ItemProps } from './Field'
export type { FormProps, ItemProps }
export type { Rule, Rules, RuleMap } from './async-validator'
export type { FinishCallback, FinishErrCallback } from './store'

type IFormProps = FC<FormProps> & {
  Item: FC<ItemProps>
}
const IForm = Form as IFormProps
IForm.Item = Field

export default IForm
