import { JSX, VNode, FunctionComponent as FC, ComponentChildren } from 'preact'
import { useContext } from 'preact/hooks'
import classnames from 'classnames'
import { MenuContext, MenuIndex } from './Menu'

export interface MenuItemProps {
  index?: MenuIndex
  disabled?: boolean
  className?: string
  style?: JSX.CSSProperties
  children: ComponentChildren
}

const MenuItem: FC<MenuItemProps> = (props) => {
  const ctx = useContext(MenuContext)
  const { index, disabled, className, style, children } = props
  const classes = classnames('menu-item', className, {
    'is-active': index === ctx.index,
    'is-disabled': disabled,
  })
  const handleClick = () => {
    if (ctx.onSelect && typeof ctx.onSelect === 'function' && !disabled) {
      ctx.onSelect(index?.toString())
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
