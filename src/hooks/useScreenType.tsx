import { RefObject } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import useMediaQuery from './useMediaQuery'

const xsScreen = '(max-width: 576px)'
const smScreen = '(min-width: 576px) and (max-width: 768px)'
const mdScreen = '(min-width: 769px) and (max-width: 992px)'
const lgScreen = '(min-width: 993px) and (max-width: 1200px)'
const xlScreen = '(min-width: 1201px) and (max-width: 1600px)'
const xxlScreen = '(min-width: 1601px)'

const useScreenType = () => {
  const [screenType, setScreenType] = useState<string>('')
  const xs = useMediaQuery(xsScreen)
  const sm = useMediaQuery(smScreen)
  const md = useMediaQuery(mdScreen)
  const lg = useMediaQuery(lgScreen)
  const xl = useMediaQuery(xlScreen)
  const xxl = useMediaQuery(xxlScreen)
  useEffect(() => {
    //prettier-ignore
    xs ? setScreenType('xs') :
    sm ? setScreenType('sm') :
    md ? setScreenType('md') :
    lg ? setScreenType('lg') :
    xl ? setScreenType('xl') :
    xxl? setScreenType('xxl'):""
  }, [xs, sm, md, lg, xl, xxl])

  return screenType
}
export default useScreenType
