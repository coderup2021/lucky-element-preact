import { h, FunctionComponent as FC } from 'preact'
import classnames from 'classnames'
import Icon from '../Icon'

export interface LoadingProps {
  fullscreen?: boolean
  text?: string
  loading?: boolean
}

/**
 * Radio 是最基础的表单域的包装
 * ```
 * // 引入
 * import { Radio } from 'lucky-element'
 * ```
 * 支持 HTMLINPUT 的所有基本属性
 * @param props
 * @returns
 */
export const Loading: FC<LoadingProps> = (props) => {
  const { fullscreen, text, loading, children } = props

  const getStyle = () => {
    if (fullscreen) {
      disableScroll()

      return {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 99999,
      }
    } else {
      enableScroll()

      if (loading) {
        return {
          position: 'relative',
        }
      }
      return {}
    }
  }

  const documentBody = (): HTMLElement | null => {
    return document.body
  }

  const disableScroll = (): void => {
    const body = documentBody()
    if (body) {
      body.style.setProperty('overflow', 'hidden')
    }
  }

  const enableScroll = (): void => {
    const body = documentBody()
    if (body) {
      body.style.removeProperty('overflow')
    }
  }

  return (
    <div style={getStyle()}>
      {loading && (
        <div
          style={{
            display: 'block',
            position: 'absolute',
            zIndex: 657,
            backgroundColor: 'rgba(255, 255, 255, 0.901961)',
            margin: 0,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <div
            className={classnames('lucky-loading-spinner', {
              'is-full-screen': fullscreen,
            })}
            style={{
              position: 'absolute',
              display: 'inline-block',
              left: 0,
            }}
          >
            <Icon className="circular" icon="spinner" size="lg" />
            {text && <p className="lucky-loading-text">{text}</p>}
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

export default Loading
