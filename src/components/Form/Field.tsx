import {
  h,
  FunctionComponent as FC,
  ComponentChildren,
  cloneElement,
  ComponentChild,
  VNode,
} from 'preact'
import {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'preact/hooks'
import { Rule, Rules, ErrorInfo } from './async-validator'
import FieldContext from './context'
import { StoreInterface } from './store'

interface FieldProps {
  label?: string
  name: string
  children: ComponentChildren
  onChange?: (value: any) => void
  rules?: Rules
}

const Field: FC<FieldProps> = (props) => {
  const { children, name, onChange: propOnChange, rules } = props
  const context = useContext<StoreInterface | null>(FieldContext)
  const [errMsg, setErrMsg] = useState<string | null>(null)

  const [update, forceUpdate] = useState(Object.create(null))

  useEffect(() => {
    const onStoreChange = () => {
      forceUpdate(Object.create(null))
    }
    const onErrChange = (errMsg: string) => {
      console.log('onErrChange:', errMsg)
      setErrMsg(errMsg)
    }
    context?.registerField({ name, onStoreChange, onErrChange, rules })
  }, [name, context])

  const fieldValue = useMemo(() => {
    return context?.getFieldValue(name)
  }, [update, context, name])

  useEffect(() => {
    context
      ?.validateField(name, fieldValue || '')
      .then(() => {
        setErrMsg(null)
      })
      .catch((errInfo) => {
        setErrMsg(errInfo.firstMessage)
      })
  }, [name, context, fieldValue])

  const getControlled = useCallback(
    (oldProps: any) => {
      return {
        ...oldProps,
        error: errMsg,
        value: fieldValue,
        onInput: (e: any) => {
          context?.setFieldValue(name, e.target.value)
          typeof propOnChange === 'function' && propOnChange(e.target.value)
        },
      }
    },
    [errMsg, fieldValue, context, propOnChange, name],
  )

  return (
    <div className={'mnt-form-item'}>
      <div className={'mnt-form-item-label'}>
        <label>{props.label}</label>
      </div>
      <div className={'mnt-form-item-content'}>
        {cloneElement(
          children as VNode,
          getControlled((children as VNode)?.props),
        )}
      </div>
    </div>
  )
}

/**
 *
 * class 版本 不完整
 *
 */
// class Field extends React.Component {
//   static contextType = FieldContext;
//   getControlled = (oldProps) => {
//     const { name, onChange: propOnChange } = this.props;
//     return {
//       ...oldProps,
//       value: this.context.getFieldValue(name),
//       onChange: (e) => {
//         this.context.setFieldValue(name, e.target.value);
//         typeof propOnChange === "function" && propOnChange(e.target.value);
//       },
//     };
//   };
//   onStoreChange = () => {
//     this.forceUpdate();
//   };
//   componentDidMount() {
//     this.context.registerField(this);
//   }
//
//   render() {
//     const { children, name, rules } = this.props;
//     return <>{React.cloneElement(children, this.getControlled(children.props))}</>;
//   }
// }
//
export default Field