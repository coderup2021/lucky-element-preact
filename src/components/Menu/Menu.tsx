import {
  createContext,
  JSX,
  VNode,
  FunctionComponent as FC,
  cloneElement,
  ComponentChildren,
  ComponentType,
} from 'preact'
import { useState } from 'preact/hooks'
import classnames from 'classnames'
import { MenuItemProps } from './MenuItem'

type MenuMode = 'horizontal' | 'vertical'
export type MenuIndex = string | undefined
type SelectCallback = (selectedIndex: MenuIndex) => void

export interface MenuProps {
  /**
   * 默认选中的index
   */
  defaultIndex?: MenuIndex
  /**
   * 自定义类名
   */
  className?: string
  /**
   * 菜单模式
   */
  mode?: MenuMode
  /**
   * 菜单选中项改变时的回调函数
   */
  onSelect?: SelectCallback
  /**
   * 自定义行内样式
   */
  style?: JSX.CSSProperties
  /**
   * 默认展开的菜单项的index
   */
  defaultOpened?: string[]
  children?: ComponentChildren
}

interface IMenuContext {
  index: MenuIndex
  onSelect?: SelectCallback
  mode?: MenuMode
  defaultOpened?: string[]
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

/**
 * Menu 菜单组件 支持横向和纵向
 * ```
 * // 引入
 * import { Menu } from 'lucky-element'
 * ```
 *
 * @param props
 * @returns
 */
const Menu: FC<MenuProps> = (props) => {
  const { defaultIndex, style, mode, onSelect, className, defaultOpened } =
    props
  const [currentActive, setActive] = useState<MenuIndex>(defaultIndex || '0')
  const classes = classnames('lucky-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })

  const handleClick = (index: MenuIndex) => {
    setActive(index)
    if (onSelect && typeof onSelect === 'function') {
      onSelect(index)
    }
  }

  const menuContext: IMenuContext = {
    index: currentActive,
    onSelect: handleClick,
    mode: mode || 'horizontal',
    defaultOpened,
  }

  const renderChildren = () => {
    let children = props.children
    if (!Array.isArray(children)) {
      children = [children]
    }
    return (children as []).map((child: VNode, i) => {
      //   console.log('child', child)
      //   console.log('child.type.displayName', child.type.displayName)
      const { displayName } = child.type as ComponentType
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return cloneElement(child, { index: i.toString() })
      } else {
        //   console.warn(
        //     "Warning: Menu Component has a child which is not MenuItem"
        //   );
        return null
      }
    })
    // return React.Children.map<React.ReactNode | null, React.ReactNode>(
    //   children as React.ReactNode,
    //   (child, i) => {
    //     const childElement =
    //       child as React.FunctionComponentElement<MenuItemProps>
    //     const { displayName } = childElement.type
    //     if (displayName === 'MenuItem' || displayName === 'SubMenu') {
    //       return React.cloneElement(childElement, { index: i.toString() })
    //     } else {
    //       //   console.warn(
    //       //     "Warning: Menu Component has a child which is not MenuItem"
    //       //   );
    //       return null
    //     }
    //   },
    // )
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={menuContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
}

export default Menu
