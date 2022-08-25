import { ComponentChildren, FunctionComponent as FC } from 'preact'
import TransitionGroup from 'preact-transition-group'

type AnimationName =
  | 'zoom-in-top'
  | 'zoom-in-bottom'
  | 'zoom-in-left'
  | 'zoom-in-right'

export type TransitionProps = {
  animation?: AnimationName
  wrapper?: boolean
  classNames?: string
  appear?: boolean
  unmountOnExit?: boolean
  in?: boolean
  timeout?: number
}

const Transition: FC<TransitionProps> = (props) => {
  const { children, wrapper, animation, classNames, ...restProps } = props
  return (
    <TransitionGroup
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div>{children as ComponentChildren}</div> : children}
    </TransitionGroup>
  )
}

Transition.defaultProps = {
  appear: true,
  unmountOnExit: true,
}

export default Transition
