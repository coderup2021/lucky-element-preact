import { FunctionComponent as FC } from 'preact'
import MenuItem, { MenuItemProps } from './MenuItem'
import SubMenu, { SubMenuProps } from './SubMenu'
import Menu, { MenuProps } from './Menu'

type IMenuProps = FC<MenuProps> & {
  Item: FC<MenuItemProps>
  SubMenu: FC<SubMenuProps>
}

const IMenu = Menu as IMenuProps

IMenu.Item = MenuItem
IMenu.SubMenu = SubMenu

export default IMenu
export type { MenuProps, SubMenuProps, MenuItemProps }
