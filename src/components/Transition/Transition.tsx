import { FunctionComponent as FC } from 'preact'
import classnames from 'classnames'
import { useEffect, useRef, useState, useMemo } from 'preact/hooks'

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

  //设置display none 和 opacity 0
  const step1 = () => {
    console.log('step1', eleRef)
    setKlasses(classnames(`${_self} ${enter} ${enterActive} `))
    setUnmount(false)
  }

  //移除display none， 保留opacity 0, (此时页面刚渲染，eleRef.current刚被赋值，可以设置css变量)
  const step2 = () => {
    eleRef.current?.style.setProperty('--lucky-opacity', '0')
    eleRef.current?.style.setProperty('--lucky-duration', duration.toString())
    setKlasses(`${_self} ${enterActive}`)
  }

  //设置opacity 1，此时页面表现为开启执行动画
  const step3 = () => {
    setKlasses(`${_self} ${enterActive}`)
    eleRef.current?.style.setProperty('--lucky-opacity', '1')
  }
  //设置opactiy 0, 此时页面表现为开始执行退出动画
  const step4 = () => {
    setKlasses(`${_self} ${enterActive}`)
    eleRef.current?.style.setProperty('--lucky-opacity', '0')
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
  }, [start, durationNum, duration, step1, step4])

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
