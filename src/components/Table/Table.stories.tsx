import { h, FunctionComponent } from 'preact'
import { useState } from 'preact/hooks'
import { Story, Meta } from '@storybook/preact'
import { action } from '@storybook/addon-actions'
import '../../styles/index.scss'
import Table, { TableProps, Record, Column, DataSource } from '.'
import Button from '../Button'

export default {
  title: 'Example/Table',
  component: Table,
  parameters: {
    docs: { iframeHeight: 600 },
  },
} as Meta<typeof Table>

export const Template: Story<typeof Table> = () => {
  const columns: Column[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '性别',
      dataIndex: 'male',
      key: 'male',
      render: (record) => <span>{record.male === 0 ? '男' : '女'}</span>,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      style: {
        width: 200,
      },
      render: (record) => (
        <span>
          <Button
            size="sm"
            btnType="primary"
            onClick={action('changed')}
            style={{ marginRight: 10 }}
          >
            编辑
          </Button>
          <Button size="sm" btnType="danger" onClick={action('delete')}>
            删除
          </Button>
        </span>
      ),
    },
  ]
  const dataSource: DataSource = [
    { name: '小王', age: 20, male: 0 },
    { name: '小红', age: 18, male: 1 },
    { name: '张三', age: 22, male: 0 },
    { name: '李四', age: 24, male: 1 },
  ]
  return <Table dataSource={dataSource} columns={columns} />
}

export const TableWithPagination: Story<typeof Table> = () => {
  const columns: Column[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '性别',
      dataIndex: 'male',
      key: 'male',
      render: (record) => <span>{record.male === 0 ? '男' : '女'}</span>,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      style: {
        width: 200,
      },
      render: (record) => (
        <span>
          <Button
            size="sm"
            btnType="primary"
            onClick={action('changed')}
            style={{ marginRight: 10 }}
          >
            编辑
          </Button>
          <Button size="sm" btnType="danger" onClick={action('delete')}>
            删除
          </Button>
        </span>
      ),
    },
  ]
  const dataSource: DataSource = [
    { name: '小王', age: 20, male: 0 },
    { name: '小红', age: 18, male: 1 },
    { name: '张三', age: 22, male: 0 },
    { name: '李四', age: 24, male: 1 },
  ]
  dataSource.push(...dataSource)
  dataSource.push(...dataSource)
  dataSource.push(...dataSource)
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{
        visible: true,
        total: dataSource.length,
      }}
    />
  )
}
