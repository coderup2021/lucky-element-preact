import { FunctionComponent as FC } from 'preact'
import classnames from 'classnames'
import { useEffect, useRef, useState, useMemo } from 'preact/hooks'

type AnimationName =
  | 'zoom-in-opacity'
  | 'zoom-in-top'
  | 'zoom-in-bottom'
  | 'zoom-in-left'
  | 'zoom-in-right'
  | 'zoom-in-center'

type LuckyTransitionVar =
  | '--lucky-opacity'
  | '--lucky-duration'
  | '--lucky-transform'
  | '--lucky-origin'

export type TransitionProps = {
  animation?: AnimationName
  wrapper?: boolean
  classNames?: string
  appear?: boolean
  unmountOnExit?: boolean
  in?: boolean
  duration?: string
}

const _self = 'lucky-transition'
const enter = 'lucky-transition-enter'
const enterActive = 'lucky-transition-enter-active'

interface TimeRef {
  timer1: NodeJS.Timeout | null
  timer2: NodeJS.Timeout | null
  timer3: NodeJS.Timeout | null
}

const Transition: FC<TransitionProps> = (props) => {
  const {
    animation = 'zoom-in-opacity',
    children,
    unmountOnExit = true,
    in: start,
    duration = '2000ms',
    ...restProps
  } = props

  const [unmount, setUnmount] = useState(false)
  const eleRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<TimeRef>({ timer1: null, timer2: null, timer3: null })

  useEffect(() => {
    if (unmountOnExit) setUnmount(true)
  }, [unmountOnExit])

  const [klasses, setKlasses] = useState(
    classnames(`${_self} ${enter} ${enterActive} `),
  )

  const durationNum = useMemo(() => {
    let tmp = parseInt(duration)
    if (duration.endsWith('ms')) {
      console.log('')
    } else if (duration.endsWith('s')) {
      tmp = tmp * 1000
    }
    return tmp
  }, [duration])

  const setEleCssVar = (key: LuckyTransitionVar, value: string | null) => {
    eleRef.current?.style.setProperty(key, value)
  }

  //设置display none 和 opacity 0
  const step1 = () => {
    setKlasses(classnames(`${_self} ${enter} ${enterActive} `))
    setUnmount(false)
  }

  //移除display none， 保留opacity 0, (此时页面刚渲染，eleRef.current刚被赋值，可以设置css变量)
  const step2 = () => {
    setEleCssVar('--lucky-opacity', '0')
    setEleCssVar('--lucky-duration', duration.toString())

    if (animation === 'zoom-in-top') {
      setEleCssVar('--lucky-transform', 'scaleY(0)')
      setEleCssVar('--lucky-origin', 'center top')
    } else if (animation === 'zoom-in-bottom') {
      setEleCssVar('--lucky-transform', 'scaleY(0)')
      setEleCssVar('--lucky-origin', 'center bottom')
    } else if (animation === 'zoom-in-left') {
      setEleCssVar('--lucky-transform', 'scale(0.45, 0.45)')
      setEleCssVar('--lucky-origin', 'top left')
    } else if (animation === 'zoom-in-right') {
      setEleCssVar('--lucky-transform', 'scale(0.45, 0.45)')
      setEleCssVar('--lucky-origin', 'top right')
    } else if (animation === 'zoom-in-center') {
      setEleCssVar('--lucky-transform', 'scale(0, 0)')
      setEleCssVar('--lucky-origin', 'center center')
    }
    setKlasses(`${_self} ${enterActive}`)
  }

  //设置opacity 1，此时页面表现为开启执行动画
  const step3 = () => {
    setKlasses(`${_self} ${enterActive}`)
    setEleCssVar('--lucky-opacity', '1')
    if (animation === 'zoom-in-top' || animation === 'zoom-in-bottom') {
      setEleCssVar('--lucky-transform', 'scaleY(1)')
    } else if (animation === 'zoom-in-right' || animation === 'zoom-in-left') {
      setEleCssVar('--lucky-transform', 'scale(1, 1)')
    } else if (animation === 'zoom-in-center') {
      setEleCssVar('--lucky-transform', 'scale(1, 1)')
    }
  }
  //设置opactiy 0, 此时页面表现为开始执行退出动画
  const step4 = () => {
    setKlasses(`${_self} ${enterActive}`)
    setEleCssVar('--lucky-opacity', '0')
    if (animation === 'zoom-in-top' || animation === 'zoom-in-bottom') {
      setEleCssVar('--lucky-transform', 'scaleY(0)')
    } else if (animation === 'zoom-in-right' || animation === 'zoom-in-left') {
      setEleCssVar('--lucky-transform', 'scale(0.45, 0.45)')
    } else if (animation === 'zoom-in-center') {
      setEleCssVar('--lucky-transform', 'scale(0, 0)')
    }
  }
  //设置display none, 此时页面卸载
  const step5 = () => {
    setKlasses(classnames(`${_self} ${enter} ${enterActive} `))
    setUnmount(true)
  }

  const clearTimer = (timer: NodeJS.Timeout | null) => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  useEffect(() => {
    if (start) {
      step1()
      timerRef.current.timer1 = setTimeout(step2, 20)
      timerRef.current.timer2 = setTimeout(step3, 40)
      clearTimer(timerRef.current.timer3)
    } else {
      step4()
      clearTimer(timerRef.current.timer1)
      clearTimer(timerRef.current.timer2)
      timerRef.current.timer3 = setTimeout(step5, durationNum)
    }
  }, [start, durationNum, duration])

  return (
    <>
      {unmountOnExit && unmount ? null : (
        <div className={klasses} {...restProps} ref={eleRef}>
          {children}
        </div>
      )}
    </>
  )
}

Transition.defaultProps = {
  appear: true,
  unmountOnExit: true,
}

export default Transition
