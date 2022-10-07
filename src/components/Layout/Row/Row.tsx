import {
  h,
  FunctionComponent,
  ComponentChildren,
  cloneElement,
  VNode,
  ComponentType,
  JSX,
} from 'preact'
import classnames from 'classnames'
import { ColProps } from '../Col'
import { useCallback, useEffect, useMemo, useRef } from 'preact/hooks'
import useScreenType from '../../../hooks/useScreenType'

type ScreenType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
type LuckyRowPropertyVar = '--lucky-row-gutter' | '--lucky-row-gap'
interface GutterObj {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
}

interface RowProps {
  children: ComponentChildren
  gutter?: number | GutterObj | GutterObj[]
  wrap?: boolean
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
}

const Row: FunctionComponent<RowProps> = (props) => {
  const { children, gutter, justify, wrap } = props
  const rowRef = useRef<HTMLDivElement>(null)
  const screenType = useScreenType()
  const horizontalGutter = useMemo(() => {
    if (Array.isArray(gutter)) return gutter[0]
    return gutter || 0
  }, [gutter])
  const verticalGap = useMemo(() => {
    if (Array.isArray(gutter)) return gutter[1]
    return 0
  }, [gutter])

  const style = useMemo(() => {
    const obj: JSX.AllCSSProperties = {}
    if (justify) {
      obj['justify-content'] = justify
    }
    if (wrap === false) {
      obj['flex-wrap'] = 'nowrap'
    }
    return obj
  }, [justify, wrap])

  //prettier-ignore
  const setGutter = useCallback((property:LuckyRowPropertyVar ,gutter?: number, screenTypeStr?: ScreenType) => {
    if (gutter === undefined || gutter === null) return 
    if (screenTypeStr) {
      if (screenTypeStr !== screenType) return
      //prettier-ignore
      rowRef.current?.style?.setProperty( property, `${gutter}px`)
    } else {
      rowRef.current?.style?.setProperty( property, `${gutter}px`)
    }
  }, [screenType])

  useEffect(() => {
    if (horizontalGutter && typeof horizontalGutter === 'number') {
      setGutter('--lucky-row-gutter', horizontalGutter)
    } else {
      setGutter('--lucky-row-gutter', (horizontalGutter as GutterObj).xs!, 'xs')
      setGutter('--lucky-row-gutter', (horizontalGutter as GutterObj).sm!, 'sm')
      setGutter('--lucky-row-gutter', (horizontalGutter as GutterObj).md!, 'md')
      setGutter('--lucky-row-gutter', (horizontalGutter as GutterObj).lg!, 'lg')
      setGutter('--lucky-row-gutter', (horizontalGutter as GutterObj).xl!, 'xl')
      //prettier-ignore
      setGutter('--lucky-row-gutter', (horizontalGutter as GutterObj).xxl!, 'xxl')
    }
  }, [screenType, horizontalGutter])

  useEffect(() => {
    if (verticalGap && typeof verticalGap === 'number') {
      setGutter('--lucky-row-gap', verticalGap)
    } else {
      setGutter('--lucky-row-gap', (verticalGap as GutterObj).xs!, 'xs')
      setGutter('--lucky-row-gap', (verticalGap as GutterObj).sm!, 'sm')
      setGutter('--lucky-row-gap', (verticalGap as GutterObj).md!, 'md')
      setGutter('--lucky-row-gap', (verticalGap as GutterObj).lg!, 'lg')
      setGutter('--lucky-row-gap', (verticalGap as GutterObj).xl!, 'xl')
      //prettier-ignore
      setGutter('--lucky-row-gap', (verticalGap as GutterObj).xxl!, 'xxl')
    }
  }, [screenType, verticalGap])

  const renderChild = (child: VNode<ColProps>) => {
    return cloneElement(child, {
      className: classnames(child.props.className, 'lucky-col-gutter'),
    })
  }

  const renderNewChildren = (children: ComponentChildren) => {
    if (children instanceof Array) {
      return (children as VNode<ColProps>[]).map((child) => {
        const { displayName } = child.type as ComponentType
        if (displayName !== 'Col') {
          console.error('Row Children should Col Component')
          return null
        }
        return renderChild(child)
      })
    } else {
      const { displayName } = (children as VNode<ColProps>)
        ?.type as ComponentType
      if (displayName !== 'Col') {
        console.error('Row Children should Col Component')
        return null
      }
      return renderChild(children as VNode<ColProps>)
    }
  }

  return (
    <div className="lucky-row" ref={rowRef} style={style}>
      {renderNewChildren(children)}
    </div>
  )
}

Row.defaultProps = {
  gutter: 0,
}

export default Row
