import { h, JSX, FunctionComponent as FC } from 'preact'
import { ThemeProps } from '../Icon/Icon'

export interface ProgressProps {
  percentage: number
  barHeight?: number
  showText?: boolean
  theme?: ThemeProps
  style?: JSX.AllCSSProperties
}

const Progress: FC<ProgressProps> = (props) => {
  const { percentage, barHeight, showText, theme, style } = props
  return (
    <div
      className="lucky-progress-bar"
      style={style}
      data-testid="progress-bar"
    >
      <div
        className={'progress-bar-outter'}
        style={{ height: `${barHeight}px` }}
      >
        <div
          className={`progress-bar-inner progress-bar-${theme}`}
          style={{ width: `${percentage}%` }}
        >
          {showText && <span className="inner-text">{`${percentage}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  barHeight: 16,
  showText: true,
  theme: 'primary',
}

export default Progress
