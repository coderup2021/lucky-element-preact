import {
  FunctionComponent as FC,
  ComponentChildren,
  cloneElement,
  VNode,
  ComponentType,
} from 'preact'
import { useEffect, useState, useContext } from 'preact/hooks'
import { MenuContext, MenuIndex } from './Menu'
import classnames from 'classnames'
import Icon from '../Icon/Icon'
import Transition from '../Transition'

export interface SubMenuProps {
  index?: MenuIndex
  className?: string
  title?: string
  children: ComponentChildren
}

const SubMenu: FC<SubMenuProps> = (props) => {
  const menuContext = useContext(MenuContext)
  const { mode, defaultOpened } = menuContext
  const { index, className, title, children } = props
  const [menuOpen, setMenuOpen] = useState(false)
  const classes = classnames('menu-item submenu-item', className, {
    'is-active': index === menuContext.index,
    'is-opened': menuOpen,
    'is-vertical': mode === 'vertical',
  })

  useEffect(() => {
    if (mode === 'vertical' && index && defaultOpened?.includes(index)) {
      setMenuOpen(true)
    }
  }, [defaultOpened, index, mode])

  const handleClick = (e: any) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }
  let timer: NodeJS.Timeout
  const handleHover = (e: any, toggle: boolean) => {
    timer && clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 300)
  }

  const hoverEvents = {
    onMouseEnter: (e: any) => handleHover(e, true),
    onMouseLeave: (e: any) => handleHover(e, false),
  }
  const clickEvents = {
    onClick: handleClick,
  }

  const mouseClickEvent = mode === 'vertical' ? clickEvents : {}
  const mouseHoverEvent = mode !== 'vertical' ? hoverEvents : {}

  const renderChildren = () => {
    const classes = classnames('lucky-submenu', { 'menu-opened': menuOpen })

    let children = props.children
    if (!Array.isArray(children)) {
      children = [children]
    }
    const childrenComponent = (children as []).map((child: VNode, i) => {
      //   console.log('SubMenu child', child)
      //   console.log('SubMenu child.type.displayName', child.type.displayName)
      const { displayName } = child.type as ComponentType
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return cloneElement(child, { index: `${index}-${i.toString()}` })
      } else {
        //   console.warn(
        //     "Warning: Menu Component has a child which is not MenuItem"
        //   );
        return null
      }
    })
    return menuOpen ? <ul className={classes}>{childrenComponent}</ul> : null

    // const childrenComponent = React.Children.map(children, (child, i) => {
    //   const childElement =
    //     child as React.FunctionComponentElement<SubMenuProps>;
    //   if (childElement.type.displayName === "MenuItem") {
    //     return React.cloneElement(childElement, {
    //       index: `${index}-${i.toString()}`,
    //     });
    //   } else {
    //     console.error(
    //       "Warning: SubMenu Component has a child which is not MenuItem"
    //     );
    //     return null;
    //   }
    // });
    // return (
    //   <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
    //     {() => <ul className={classes}>{childrenComponent}</ul>}
    //   </Transition>
    // );
  }

  return (
    <li key={index} className={classes} {...mouseHoverEvent}>
      <div className="submenu-title" {...mouseClickEvent}>
        {title}
        <Icon icon="caret-down" theme="info" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
