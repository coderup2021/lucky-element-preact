import { h, FunctionComponent as FC, JSX, VNode } from 'preact'
import { useCallback } from 'preact/hooks'
import Button, { ButtonProps } from '../Button'
import Icon from '../Icon'
import classnames from 'classnames'
import Transition from '../Transition'

export interface ModalProps {
  title: string
  onCancel: () => void
  visible?: boolean
  children?: VNode
  onOk?: () => void
  okText?: string
  cancelText?: string
  width?: number
  style?: JSX.CSSProperties
  className?: string
  btnStyle?: JSX.CSSProperties
  okButtonProps?: ButtonProps
}
const Modal: FC<ModalProps> = ({
  visible,
  width,
  style,
  title,
  children,
  onOk,
  onCancel,
  okText,
  cancelText,
  okButtonProps,
  className,
}) => {
  const _onOk = useCallback(() => {
    onOk && onOk()
  }, [onOk])
  const getModalStyle = useCallback(() => {
    let _style: JSX.CSSProperties = {}
    if (width) {
      _style.width = width
    }
    if (style) {
      _style = {
        ...style,
        ..._style,
      }
    }
    return _style
  }, [style, width])
  return (
    <Transition
      animation="zoom-in-left"
      in={visible}
      duration={'500ms'}
      unmountOnExit={true}
    >
      <div className={classnames('lucky-modal-wrapper', className)}>
        <div className={'lucky-modal'} style={getModalStyle()}>
          <div className={'lucky-modal-header'}>
            <div className={'header-title'}>{title}</div>
            <span className={'close-btn'} onClick={onCancel}>
              <Icon icon="close" />
            </span>
          </div>
          <div className={'lucky-modal-body'}>{children}</div>
          <div className={'lucky-modal-footer'}>
            <Button
              btnType="primary"
              onClick={_onOk}
              {...okButtonProps}
              style={{ marginRight: 10 }}
            >
              {okText ? okText : 'OK'}
            </Button>
            <Button btnType={'default'} onClick={onCancel}>
              {cancelText ? cancelText : 'Cancel'}
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  )
}
Modal.defaultProps = {
  visible: false,
}

export default Modal
