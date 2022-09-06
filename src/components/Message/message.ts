import errorSvg from './error.svg'
import successSvg from './success.svg'

type MessageType = 'success' | 'error'

export const removeElement = (element: Element) => {
  element.parentNode?.removeChild(element)
}

function removeItemFromArray(array: string[], item: string) {
  return array.filter((v) => item !== v)
}

const setStyle = (element: HTMLDivElement, styles: CSSStyleDeclaration) => {
  Object.keys(styles).forEach((key: string) => {
    element.style[key] = styles[key]
  })
}

function genIdCode() {
  const idLength = 6
  const letters = 'abcdefghijklmnopqrsquvwxyz'
  let id = ''
  for (let i = 0; i < idLength; i++) {
    const randomNum = Math.floor(Math.random() * letters.length)
    id += letters[randomNum]
  }
  return id
}

class Index {
  content: string
  type: string
  div: HTMLDivElement | null
  span: HTMLSpanElement | null
  img: HTMLImageElement | null
  divStyle: CSSStyleDeclaration
  divId: string
  animateTo: string
  animateFrom: string
  static divIds: string[]

  constructor(content: string, type: string) {
    this.content = content
    this.type = type
    this.div = null
    this.span = null
    this.img = null
    this.divStyle = {
      position: 'absolute',
      top: '0',
      left: document.body.clientWidth / 2 - 100 + 'px',
      zIndex: '10',
      height: '42px',
      lineHeight: '42px',
      boxSizing: 'border-box',
      // border: 'solid 1px gray',
      padding: '0 20px 0 10px',
      textAlign: 'center',
      borderRadius: '6px',
      backgroundColor: 'white',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    } as CSSStyleDeclaration
    this.divId = genIdCode()
    this.initDiv()
    this.initImg()
    this.initMessage()
    this.animateTo = Index.divIds.length * 50 + 'px'
    this.animateFrom = (Index.divIds.length - 1) * 42 + 'px'
  }

  initDiv() {
    this.div = document.createElement('div')
    this.div.setAttribute('id', this.divId)
    Index.divIds.push(this.divId)
    setStyle(this.div, this.divStyle)
  }

  initImg() {
    this.img = document.createElement('img')
    switch (this.type) {
      case 'error':
        console.log(errorSvg)
        this.img.setAttribute('src', errorSvg)
        break
      case 'success':
        this.img.setAttribute('src', successSvg)
        break
      // case 'warn':
      //     this.img.setAttribute('src', warnImg)
      //     break
      default:
    }
    this.img.setAttribute('width', '16px')
    this.img.setAttribute('height', '16px')
    this.img.style.display = 'inline-block'
    this.img.style.verticalAlign = 'middle'

    setStyle(this.img, { marginRight: '10px' } as CSSStyleDeclaration)
    this.div?.appendChild(this.img)
  }

  initMessage() {
    this.span = document.createElement('span')
    this.span.style.fontSize = '14px'
    this.span.style.color = 'rgba(0,0,0,0.65)'
    ;(this.img as HTMLImageElement).style.display = 'inline-block'
    ;(this.img as HTMLImageElement).style.verticalAlign = 'middle'
    this.span.innerHTML = this.content
    ;(this.div as HTMLDivElement).appendChild(this.span)
  }

  show(time: number) {
    time = time || 3000
    document.body.appendChild(this.div as HTMLDivElement)
    if ((this.div as HTMLDivElement).animate) {
      const animate = (this.div as HTMLDivElement).animate(
        [
          { transform: `translateY(${this.animateFrom})` },
          { transform: 'translateY(' + this.animateTo + ')' },
        ],
        {
          duration: 200,
        },
      )
      animate.addEventListener('finish', () => {
        setStyle(
          this.div as HTMLDivElement,
          { top: this.animateTo } as CSSStyleDeclaration,
        )
      })
    } else {
      //兼容ie浏览器, 不支持animate方法
      setStyle(
        this.div as HTMLDivElement,
        { top: this.animateTo } as CSSStyleDeclaration,
      )
    }
    setTimeout(() => {
      removeElement(
        document.getElementById(this.divId as string) as HTMLElement,
      )
      Index.divIds = removeItemFromArray(Index.divIds, this.divId)
    }, time)
  }
}

Index.divIds = []

function createMessage(message: string, type: MessageType) {
  return new Index(message, type)
}

export interface Message {
  success: (content: string, time?: number) => void
  error: (content: string, time?: number) => void
}

const message: Message = {
  success(content: string, time = 3000) {
    const msg = createMessage(content, 'success')
    msg.show(time)
  },
  error(content: string, time = 3000) {
    const msg = createMessage(content, 'error')
    msg.show(time)
  },
}
export default message
