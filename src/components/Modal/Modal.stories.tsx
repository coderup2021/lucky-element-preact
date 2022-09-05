import { Story, Meta } from '@storybook/preact'
import { action } from '@storybook/addon-actions'
import Modal, { ModalProps } from './Modal'
import { useState } from 'preact/hooks'
import Button from '../Button'
import '../../styles/index.scss'

export default {
  title: 'Example/Modal',
  component: Modal,
  parameters: {
    docs: { iframeHeight: 600 },
  },
} as Meta<typeof Modal>

export const Template: Story<typeof Modal> = () => {
  const [show, setShow] = useState(false)
  const handleCancel = () => {
    setShow(false)
  }
  const toggle = () => {
    setShow(!show)
  }
  const handleOk = () => {
    action('ok')
  }
  const props: ModalProps = {
    visible: show,
    onCancel: handleCancel,
    onOk: handleOk,
    title: '测试',
  }
  return (
    <>
      <Button onClick={toggle} btnType="primary">
        显示/隐藏 弹窗
      </Button>
      <Modal {...props}>
        <div>123456789</div>
      </Modal>
    </>
  )
}
