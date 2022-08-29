import {
  h,
  FunctionComponent as FC,
  ComponentChildren,
  Component,
} from 'preact'
import FieldContext from './context'
import classnames from 'classnames'
import { FieldProps } from './Field'
import { ErrorInfo } from './async-validator'
import Store from './store'

export interface FormProps {
  initValue: StoreObj
  onFinish: FinishCallback
  onFinishFail: FinishErrCallback
  children: ComponentChildren
  layout?: 'inline' | 'vertical'
  Item?: FC<FieldProps>
  refresh: (value: any) => void
}

export interface StoreObj {
  [key: string]: any
}

export type FinishCallback = (value: StoreObj) => void
export type FinishErrCallback = (errorInfo: ErrorInfo) => void
interface Callbacks {
  onFinish?: FinishCallback
  onFinishFail?: FinishErrCallback
}

export interface FormState {
  [k: string]: any
}

class Form extends Component<FormProps, FormState> {
  state: FormState = {}
  store: Store
  callbacks: Callbacks = {}
  constructor(props: FormProps) {
    super(props)
    this.store = new Store(props.initValue, props.refresh)
  }
  setStore = () => {
    const { onFinish, onFinishFail } = this.props
    this.store.setCallbacks({
      onFinish,
      onFinishFail,
    })
  }
  componentDidMount() {
    this.setStore()
  }
  onSubmit = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    this.store.submit()
  }
  getFormClass = () => {
    const { layout } = this.props
    return classnames(
      'mnt-form',
      layout === 'inline'
        ? 'mnt-form-inline'
        : layout === 'vertical'
        ? 'mnt-form-vertical'
        : 'mnt-form-horizontal',
    )
  }
  render() {
    const { children } = this.props
    return (
      <form onSubmit={this.onSubmit} className={this.getFormClass()}>
        <FieldContext.Provider value={this.store}>
          {children}
        </FieldContext.Provider>
      </form>
    )
  }
}
export default Form
