import { useState } from 'preact/hooks'
import { Story, Meta } from '@storybook/preact'
import '../../styles/index.scss'

import Loading from './index'
import Button from './../Button/Button'

export default {
  title: 'Example/Loading',
  component: Loading,
} as Meta<typeof Loading>

export const defaultLoading: Story<typeof Loading> = (args) => {
  const [loading, setLoading] = useState(true)
  return (
    <>
      <Loading loading={loading}>
        <div>
          <ul>
            <li>华硕</li>
            <li>联想</li>
            <li>华为</li>
            <li>小米</li>
          </ul>
        </div>
      </Loading>
    </>
  )
}

export const TextLoading: Story<typeof Loading> = (args) => {
  const [loading, setLoading] = useState(true)
  return (
    <>
      <Loading loading={loading} text="加载中">
        <div>
          <ul>
            <li>华硕</li>
            <li>联想</li>
            <li>华为</li>
            <li>小米</li>
          </ul>
        </div>
      </Loading>
    </>
  )
}

export const fullscreenLoading: Story<typeof Loading> = (args) => {
  const [loading, setLoading] = useState(false)
  const start = () => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
      clearTimeout(timer)
    }, 3000)
  }
  return (
    <>
      {loading && <Loading loading={loading} text="加载中" fullscreen={true} />}
      <Button btnType="primary" onClick={start}>
        显示整页加载，3 秒后消失
      </Button>
    </>
  )
}
