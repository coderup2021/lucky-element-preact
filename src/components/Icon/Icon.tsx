import { h, FunctionComponent as FC } from 'preact'
import classnames from 'classnames'
import {
  IconProp,
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from 'preact-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, far)

export type { IconProp }
export type ThemeProps =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
  icon: IconProp
}

const Icon: FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props
  const classes = classnames('lucky-icon', className, {
    [`icon-${theme}`]: theme,
  })
  return <FontAwesomeIcon className={classes} {...restProps} />
}

Icon.defaultProps = {
  theme: 'info',
}
export default Icon
