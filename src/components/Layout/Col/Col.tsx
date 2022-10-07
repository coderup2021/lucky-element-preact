import { FunctionComponent, VNode, ComponentChildren } from 'preact'
import classnames from 'classnames'
import { useCallback, useEffect, useMemo, useRef } from 'preact/hooks'
import useScreenType from '../../../hooks/useScreenType'

type ColSize =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24

interface OffsetObj {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
}

export interface ColProps {
  span?: number
  children?: ComponentChildren
  className?: string
  xs?: ColSize
  sm?: ColSize
  md?: ColSize
  lg?: ColSize
  xl?: ColSize
  offset?: number | OffsetObj
}

const Col: FunctionComponent<ColProps> = (props) => {
  const { span, children, className, xs, sm, md, lg, xl, offset } = props
  const colRef = useRef<HTMLDivElement>(null)
  const screenType = useScreenType()

  const getMediaScreenSizeClass = useCallback(
    (type: string, size?: ColSize) => (size ? `lucky-col-${type}-${size}` : ''),
    [],
  )

  const getOffsetClass = useCallback(
    (offset?: number | OffsetObj) => {
      if (!offset) return
      if (typeof offset === 'number') {
        return `lucky-col-offset-${offset}`
      } else {
        //prettier-ignore
        return screenType === 'xs' && offset.xs ? `lucky-col-xs-offset-${offset.xs}` :
               screenType === 'sm' && offset.sm ? `lucky-col-sm-offset-${offset.sm}` :
               screenType === 'md' && offset.md ? `lucky-col-md-offset-${offset.md}` :
               screenType === 'lg' && offset.lg ? `lucky-col-lg-offset-${offset.lg}` :
               screenType === 'xl' && offset.xl ? `lucky-col-xl-offset-${offset.xl}` :
               screenType === 'xxl' && offset.xxl ? `lucky-col-xxl-offset-${offset.xxl}` : ""
      }
    },
    [screenType],
  )

  const klasses = useMemo(
    () =>
      classnames(
        'lucky-col',
        span === 0 ? `lucky-hidden` : `lucky-col-${span}`,
        getMediaScreenSizeClass('xs', xs),
        getMediaScreenSizeClass('sm', sm),
        getMediaScreenSizeClass('md', md),
        getMediaScreenSizeClass('lg', lg),
        getMediaScreenSizeClass('xl', xl),
        getOffsetClass(offset),
        className,
      ),
    [
      getOffsetClass,
      getMediaScreenSizeClass,
      className,
      span,
      xs,
      sm,
      md,
      lg,
      xl,
      offset,
    ],
  )

  return (
    <div ref={colRef} hidden={span === 0} className={klasses}>
      {children}
    </div>
  )
}

Col.displayName = 'Col'

export default Col
