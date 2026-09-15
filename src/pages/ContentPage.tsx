import {EditOutlined, EyeOutlined, FileAddOutlined, SearchOutlined} from '@ant-design/icons'
import {Button, Card, Form, Input, message, Modal, Select, Space, Table, Tag, Typography} from 'antd'
import type {TableProps} from 'antd'
import {useMemo, useState} from 'react'
import {contents as initialContents} from '../mock/data'
import type {ContentItem, ContentStatus} from '../types'

const statusColor: Record<ContentStatus, string> = {已发布: 'green', 草稿: 'default', 待审核: 'orange'}

export default function ContentPage() {
    const [contents, setContents] = useState(initialContents)
    const [keyword, setKeyword] = useState('')
    const [status, setStatus] = useState<ContentStatus | '全部'>('全部')
    const [modalOpen, setModalOpen] = useState(false)
    const [editingContent, setEditingContent] = useState<ContentItem | null>(null)
    const [form] = Form.useForm<ContentItem>()
    const filteredContents = useMemo(() => contents.filter(content => content.title.includes(keyword) && (status === '全部' || content.status === status)), [contents, keyword, status])
    const openEditor = (content?: ContentItem) => {
        setEditingContent(content ?? null)
        form.setFieldsValue(content ?? {title: '', category: '产品公告', author: '管理员', status: '草稿'})
        setModalOpen(true)
    }
    const saveContent = (values: ContentItem) => {
        if (editingContent) {
            setContents(items => items.map(item => item.id === editingContent.id ? {...item, ...values, updatedAt: '刚刚'} : item))
            message.success('内容已更新')
        } else {
            setContents(items => [{...values, id: `CNT-${String(items.length + 1).padStart(3, '0')}`, updatedAt: '刚刚', views: 0}, ...items])
            message.success('内容已创建')
        }
        setModalOpen(false)
    }
    const columns: TableProps<ContentItem>['columns'] = [
        {title: '内容标题', dataIndex: 'title', render: value => <Typography.Text strong>{value}</Typography.Text>},
        {title: '分类', dataIndex: 'category', width: 130},
        {title: '作者', dataIndex: 'author', width: 110},
        {title: '状态', dataIndex: 'status', width: 110, render: (value: ContentStatus) => <Tag color={statusColor[value]}>{value}</Tag>},
        {title: '浏览量', dataIndex: 'views', width: 100},
        {title: '最后更新', dataIndex: 'updatedAt', width: 165},
        {title: '操作', key: 'actions', width: 160, render: (_, content) => <Space size={4}><Button type="link" size="small" icon={<EyeOutlined />} onClick={() => message.info(`正在预览「${content.title}」`)}>预览</Button><Button type="link" size="small" icon={<EditOutlined />} onClick={() => openEditor(content)}>编辑</Button></Space>},
    ]
    return (
        <Space orientation="vertical" size={8} className="page-stack">
            <Card className="filter-card">
                <div className="filter-toolbar"><Space wrap><Input allowClear placeholder="搜索内容标题" prefix={<SearchOutlined />} value={keyword} onChange={event => setKeyword(event.target.value)} className="search-input" /><Select value={status} onChange={setStatus} options={['全部', '已发布', '待审核', '草稿'].map(value => ({value, label: `状态：${value}`}))} className="status-select" /></Space><Button type="primary" icon={<FileAddOutlined />} onClick={() => openEditor()}>新建内容</Button></div>
            </Card>
            <Card className="table-card" title="内容列表" extra={<Typography.Text type="secondary">共 {filteredContents.length} 篇内容</Typography.Text>}>
                <Table rowKey="id" size="middle" columns={columns} dataSource={filteredContents} scroll={{x: 900}} pagination={{pageSize: 5, showSizeChanger: false, showTotal: total => `共 ${total} 条`}} />
            </Card>
            <Modal title={editingContent ? '编辑内容' : '新建内容'} open={modalOpen} onCancel={() => setModalOpen(false)} onOk={() => form.submit()} okText="保存" width={620}>
                <Form form={form} layout="vertical" onFinish={saveContent}>
                    <Form.Item name="title" label="标题" rules={[{required: true, message: '请输入标题'}]}><Input placeholder="请输入内容标题" /></Form.Item>
                    <Space className="full-width" size={16}><Form.Item name="category" label="分类" rules={[{required: true}]} className="half-field"><Select options={['产品公告', '帮助中心', '运营洞察'].map(value => ({value}))} /></Form.Item><Form.Item name="status" label="状态" rules={[{required: true}]} className="half-field"><Select options={['草稿', '待审核', '已发布'].map(value => ({value}))} /></Form.Item></Space>
                    <Form.Item name="author" label="作者" rules={[{required: true}]}><Input placeholder="请输入作者名称" /></Form.Item>
                    <Form.Item label="正文"><Input.TextArea rows={5} placeholder="请输入内容正文（演示版本不会持久化保存）" /></Form.Item>
                </Form>
            </Modal>
        </Space>
    )
}
