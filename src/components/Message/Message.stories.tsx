import { Story, Meta } from '@storybook/preact'
import { action } from '@storybook/addon-actions'
import message from './Message'
import { useState } from 'preact/hooks'
import Button from '../Button'
import '../../styles/index.scss'

export default {
  title: 'Example/message',
  parameters: {
    docs: { iframeHeight: 300 },
  },
}

export const Template: Story = () => {
  const showSuccess = () => {
    message.success('成功啦')
  }
  const showError = () => {
    message.error('出错啦')
  }
  return (
    <>
      <Button
        onClick={showSuccess}
        btnType="primary"
        style={{ marginRight: 10 }}
      >
        success
      </Button>
      <Button onClick={showError} btnType="primary">
        error
      </Button>
    </>
  )
}
