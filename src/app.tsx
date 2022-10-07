import {
  Component,
  FunctionComponent as FC,
  createRef,
  RefObject,
  JSX,
} from 'preact'
import { useState, useRef, useMemo, useEffect } from 'preact/hooks'
import './app.css'
import { h } from 'preact'
import Menu, { MenuProps } from './components/Menu'
// const {MenuItem, SubMenu, } = Menu
import './styles/index.scss'
import AutoComplete from './components/AutoComplete'
import Transition from './components/Transition'
import Button from './components/Button'
import Modal from './components/Modal'
import Row from './components/Layout/Row'
import Col from './components/Layout/Col'

const testProps: MenuProps = {
  mode: 'horizontal',
  defaultIndex: '0',
  onSelect: (item) => {
    console.log('item', item)
  },
  className: 'test',
}
const NiceMenu = (props: MenuProps) => (
  <Menu {...props}>
    <Menu.Item>active</Menu.Item>
    <Menu.Item disabled>disabled</Menu.Item>
    <Menu.Item>third item</Menu.Item>
    <Menu.SubMenu title="dropdown">
      <Menu.Item>Dropdown 1</Menu.Item>
      <Menu.Item disabled>Dropdown 2</Menu.Item>
      <Menu.Item>Dropdown 3</Menu.Item>
    </Menu.SubMenu>
  </Menu>
)

const dataSource = [
  { value: 'abc' },
  { value: 'def' },
  { value: 'xyz' },
  { value: 'ayz' },
  { value: 'abz' },
  { value: 'dez' },
  { value: 'ezf' },
]
const App: FC<any> = () => {
  const [inB, setInB] = useState(false)
  const handleTest = () => {
    // setInB((inB) => !inB)
    setShow((show) => !show)
  }
  const [show, setShow] = useState(false)
  const handleOk = () => {
    console.log('handle ok')
  }
  return (
    <>
      <div>111111111</div>
      {/* <div>
        <NiceMenu {...testProps} />
      </div> 
      <div>
        <Transition in={inB} />
      </div> */}
      <AutoComplete
        fetchSuggestions={(item) =>
          dataSource.filter((d) => {
            console.log('item', item)
            if (item === undefined || item === null || item.trim() === '')
              return true
            return d.value.indexOf(item) > -1
          })
        }
      />
      {/* <Button onClick={handleTest}>test</Button>
      <Transition
        in={inB}
        duration="2000ms"
        unmountOnExit={true}
        animation="zoom-in-center"
      >
        <div
          style={{ width: 500, height: 500, backgroundColor: 'skyblue' }}
        ></div>
      </Transition> */}

      <Modal
        title="测试sss"
        visible={show}
        onOk={handleOk}
        onCancel={() => {
          setShow(false)
        }}
        width={1000}
      >
        <div> 这是一个测试的Modal</div>
      </Modal>
      <div className="test-row-wrapper">
        <Row
          gutter={[
            { xs: 10, sm: 16, md: 22, lg: 28, xl: 34, xxl: 40 },
            { xs: 10, sm: 16, md: 22, lg: 28, xl: 34, xxl: 40 },
          ]}
        >
          <Col span={3}>
            <div>col3</div>
          </Col>
          <Col span={5}>
            <div>col5</div>
          </Col>
          <Col span={8}>
            <div>col8</div>
          </Col>
          <Col span={8}>
            <div>col8</div>
          </Col>
        </Row>
      </div>
      <div className="test-row-wrapper">
        <Row wrap={false}>
          <Col
            offset={{ xs: 3, sm: 5, md: 10 }}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={4}
          >
            <div>col3</div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <div>col5</div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <div>col5</div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <div>col8</div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <div>col8</div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <div>col8</div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <div>col8</div>
          </Col>
        </Row>
      </div>
    </>
  )
}
export default App
