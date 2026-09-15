import {EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons'
import {Button, Card, Drawer, Form, Input, message, Modal, Select, Space, Table, Tag, Typography} from 'antd'
import type {TableProps} from 'antd'
import {useMemo, useState} from 'react'
import {users as initialUsers} from '../mock/data'
import type {User, UserStatus} from '../types'

const statusColor: Record<UserStatus, string> = {正常: 'green', 已禁用: 'default', 待审核: 'orange'}

export default function UsersPage() {
    const [users, setUsers] = useState(initialUsers)
    const [keyword, setKeyword] = useState('')
    const [status, setStatus] = useState<UserStatus | '全部'>('全部')
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [form] = Form.useForm<User>()

    const filteredUsers = useMemo(() => users.filter(user => {
        const matchesKeyword = [user.name, user.email, user.id].some(value => value.toLowerCase().includes(keyword.toLowerCase()))
        return matchesKeyword && (status === '全部' || user.status === status)
    }), [users, keyword, status])

    const openEditor = (user?: User) => {
        setEditingUser(user ?? null)
        form.setFieldsValue(user ?? {name: '', email: '', phone: '', role: '运营专员', status: '正常'})
        setModalOpen(true)
    }
    const saveUser = (values: User) => {
        if (editingUser) {
            setUsers(items => items.map(item => item.id === editingUser.id ? {...item, ...values} : item))
            message.success('用户信息已更新')
        } else {
            setUsers(items => [{...values, id: `U-${10080 + items.length}`, createdAt: '刚刚', lastActiveAt: '未登录'}, ...items])
            message.success('已新增用户')
        }
        setModalOpen(false)
    }

    const columns: TableProps<User>['columns'] = [
        {title: '用户', key: 'user', render: (_, user) => <Space><span className="initial-avatar">{user.name.slice(0, 1)}</span><div><Typography.Text strong>{user.name}</Typography.Text><br /><Typography.Text type="secondary">{user.email}</Typography.Text></div></Space>},
        {title: '用户编号', dataIndex: 'id', width: 120},
        {title: '角色', dataIndex: 'role', width: 130},
        {title: '状态', dataIndex: 'status', width: 110, render: (value: UserStatus) => <Tag color={statusColor[value]}>{value}</Tag>},
        {title: '最近活跃', dataIndex: 'lastActiveAt', width: 150},
        {title: '操作', key: 'actions', width: 130, render: (_, user) => <Space size={4}><Button type="link" size="small" icon={<EyeOutlined />} onClick={() => setSelectedUser(user)}>查看</Button><Button type="link" size="small" icon={<EditOutlined />} onClick={() => openEditor(user)}>编辑</Button></Space>},
    ]

    return (
        <Space orientation="vertical" size={8} className="page-stack">
            <Card className="filter-card">
                <div className="filter-toolbar">
                    <Space wrap>
                        <Input allowClear placeholder="搜索姓名、邮箱或用户编号" prefix={<SearchOutlined />} value={keyword} onChange={event => setKeyword(event.target.value)} className="search-input" />
                        <Select value={status} onChange={setStatus} options={['全部', '正常', '待审核', '已禁用'].map(value => ({value, label: `状态：${value}`}))} className="status-select" />
                        <Button onClick={() => { setKeyword(''); setStatus('全部') }} disabled={!keyword && status === '全部'}>重置</Button>
                    </Space>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => openEditor()}>新增用户</Button>
                </div>
            </Card>
            <Table className="data-table" bordered rowClassName={(_, index) => index % 2 === 1 ? 'data-table-row-striped' : ''} rowKey="id" size="middle" columns={columns} dataSource={filteredUsers} scroll={{x: 850}} pagination={{pageSize: 5, showSizeChanger: false, showTotal: total => `共 ${total} 条`}} />
            <Drawer title="用户详情" open={Boolean(selectedUser)} onClose={() => setSelectedUser(null)} size={420}>
                {selectedUser && <Space orientation="vertical" size={22} className="detail-stack">
                    <div className="profile-summary"><span className="profile-avatar">{selectedUser.name.slice(0, 1)}</span><div><Typography.Title level={4}>{selectedUser.name}</Typography.Title><Tag color={statusColor[selectedUser.status]}>{selectedUser.status}</Tag></div></div>
                    <div className="detail-list"><span>用户编号</span><b>{selectedUser.id}</b><span>邮箱</span><b>{selectedUser.email}</b><span>联系电话</span><b>{selectedUser.phone}</b><span>所属角色</span><b>{selectedUser.role}</b><span>创建时间</span><b>{selectedUser.createdAt}</b><span>最近活跃</span><b>{selectedUser.lastActiveAt}</b></div>
                </Space>}
            </Drawer>
            <Modal title={editingUser ? '编辑用户' : '新增用户'} open={modalOpen} onCancel={() => setModalOpen(false)} onOk={() => form.submit()} okText="保存">
                <Form form={form} layout="vertical" onFinish={saveUser}>
                    <Form.Item name="name" label="姓名" rules={[{required: true, message: '请输入姓名'}]}><Input placeholder="请输入姓名" /></Form.Item>
                    <Form.Item name="email" label="邮箱" rules={[{required: true, type: 'email', message: '请输入有效邮箱'}]}><Input placeholder="name@example.com" /></Form.Item>
                    <Form.Item name="phone" label="联系电话" rules={[{required: true, message: '请输入联系电话'}]}><Input placeholder="请输入联系电话" /></Form.Item>
                    <Form.Item name="role" label="角色" rules={[{required: true}]}><Select options={['运营专员', '内容编辑', '数据分析师', '访客'].map(value => ({value}))} /></Form.Item>
                    <Form.Item name="status" label="状态" rules={[{required: true}]}><Select options={['正常', '待审核', '已禁用'].map(value => ({value}))} /></Form.Item>
                </Form>
            </Modal>
        </Space>
    )
}
