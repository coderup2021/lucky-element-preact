import { h, FunctionComponent as FC, ComponentChildren } from 'preact'
import { useCallback } from 'preact/hooks'
import FieldContext from './context'
import { useStore, FinishCallback, FinishErrCallback, StoreObj } from './store'
import classnames from 'classnames'
import { FieldProps } from './Field'

export interface FormProps {
  initValue: StoreObj
  onFinish: FinishCallback
  onFinishFail: FinishErrCallback
  children: ComponentChildren
  layout?: 'inline' | 'vertical'
  Item?: FC<FieldProps>
}

const Form = (props: FormProps) => {
  const { initValue, onFinish, onFinishFail, children, layout } = props
  const [store] = useStore(initValue)
  store.setCallbacks({ onFinish, onFinishFail })
  const _onSubmit = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    store.submit()
  }

  const getFormClass = useCallback(() => {
    return classnames(
      'mnt-form',
      layout === 'inline'
        ? 'mnt-form-inline'
        : layout === 'vertical'
        ? 'mnt-form-vertical'
        : 'mnt-form-horizontal',
    )
  }, [layout])
  return (
    <form onSubmit={_onSubmit} className={getFormClass()}>
      <FieldContext.Provider value={store}>{children}</FieldContext.Provider>
    </form>
  )
}

export default Form
