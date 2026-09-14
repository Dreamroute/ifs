import {EditOutlined, PlusOutlined, SafetyCertificateOutlined} from '@ant-design/icons'
import {Button, Card, Col, Form, Input, List, message, Modal, Row, Space, Tag, Tree, Typography} from 'antd'
import {useState} from 'react'
import {permissionTree, roles as initialRoles} from '../mock/data'
import type {Role} from '../types'

export default function RolesPage() {
    const [roles, setRoles] = useState(initialRoles)
    const [selectedRole, setSelectedRole] = useState<Role>(initialRoles[0])
    const [modalOpen, setModalOpen] = useState(false)
    const [editingRole, setEditingRole] = useState<Role | null>(null)
    const [checkedKeys, setCheckedKeys] = useState<string[]>(initialRoles[0].permissions)
    const [form] = Form.useForm<Role>()
    const openEditor = (role?: Role) => {
        const target = role ?? null
        setEditingRole(target)
        setCheckedKeys(target?.permissions ?? ['dashboard'])
        form.setFieldsValue(target ?? {name: '', description: ''})
        setModalOpen(true)
    }
    const saveRole = (values: Role) => {
        if (editingRole) {
            const updated = {...editingRole, ...values, permissions: checkedKeys}
            setRoles((items) => items.map((item) => item.id === editingRole.id ? updated : item))
            setSelectedRole(updated)
            message.success('角色权限已更新')
        } else {
            const created = {...values, id: `role-${Date.now()}`, memberCount: 0, permissions: checkedKeys}
            setRoles((items) => [...items, created])
            setSelectedRole(created)
            message.success('已新增角色')
        }
        setModalOpen(false)
    }
    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} xl={9}>
                <Card title="角色列表" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => openEditor()}>新增角色</Button>} className="role-list-card">
                    <List dataSource={roles} renderItem={(role) => <List.Item className={selectedRole.id === role.id ? 'role-list-item selected' : 'role-list-item'} onClick={() => setSelectedRole(role)} actions={[<Button key="edit" type="text" size="small" icon={<EditOutlined />} onClick={(event) => { event.stopPropagation(); openEditor(role) }}>编辑</Button>]}><List.Item.Meta avatar={<span className="role-icon"><SafetyCertificateOutlined /></span>} title={<Typography.Text strong>{role.name}</Typography.Text>} description={<span>{role.description}<br />{role.memberCount} 位成员</span>} /></List.Item>} />
                </Card>
            </Col>
            <Col xs={24} xl={15}>
                <Card title="角色权限" extra={<Button type="primary" icon={<EditOutlined />} onClick={() => openEditor(selectedRole)}>编辑权限</Button>} className="permission-card">
                    <Space direction="vertical" size={16} className="page-stack">
                        <div className="role-detail-head"><span className="role-icon large"><SafetyCertificateOutlined /></span><div><Typography.Title level={4}>{selectedRole.name}</Typography.Title><Typography.Text type="secondary">{selectedRole.description}</Typography.Text></div><Tag color="blue">{selectedRole.memberCount} 位成员</Tag></div>
                        <div><Typography.Text strong>已授权模块</Typography.Text><p className="permission-note">该角色可访问以下功能模块。编辑后仅在本次演示会话内生效。</p><Tree checkedKeys={selectedRole.permissions} selectable={false} checkable treeData={permissionTree} /></div>
                    </Space>
                </Card>
            </Col>
            <Modal title={editingRole ? `编辑 ${editingRole.name}` : '新增角色'} open={modalOpen} onCancel={() => setModalOpen(false)} onOk={() => form.submit()} okText="保存角色" width={560}>
                <Form form={form} layout="vertical" onFinish={saveRole}>
                    <Form.Item name="name" label="角色名称" rules={[{required: true, message: '请输入角色名称'}]}><Input placeholder="例如：客户成功专员" /></Form.Item>
                    <Form.Item name="description" label="角色说明" rules={[{required: true, message: '请输入角色说明'}]}><Input.TextArea rows={2} placeholder="描述该角色可承担的工作" /></Form.Item>
                    <Form.Item label="功能权限"><Tree checkable defaultExpandAll checkedKeys={checkedKeys} onCheck={(keys) => setCheckedKeys(keys as string[])} treeData={permissionTree} /></Form.Item>
                </Form>
            </Modal>
        </Row>
    )
}
