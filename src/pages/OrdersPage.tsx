import {EyeOutlined, SearchOutlined} from '@ant-design/icons'
import {Button, Card, Descriptions, Drawer, Input, Select, Space, Table, Tag, Typography} from 'antd'
import type {TableProps} from 'antd'
import {useMemo, useState} from 'react'
import {orders} from '../mock/data'
import type {Order, OrderStatus} from '../types'

const statusColor: Record<OrderStatus, string> = {已完成: 'green', 处理中: 'blue', 待付款: 'orange', 已取消: 'default'}

export default function OrdersPage() {
    const [keyword, setKeyword] = useState('')
    const [status, setStatus] = useState<OrderStatus | '全部'>('全部')
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const filteredOrders = useMemo(() => orders.filter(order => {
        const matchesKeyword = [order.id, order.userName, order.userEmail].some(value => value.toLowerCase().includes(keyword.toLowerCase()))
        return matchesKeyword && (status === '全部' || status === order.status)
    }), [keyword, status])
    const columns: TableProps<Order>['columns'] = [
        {title: '订单编号', dataIndex: 'id', width: 185, render: value => <Typography.Text strong>{value}</Typography.Text>},
        {title: '关联用户', key: 'user', render: (_, order) => <div><Typography.Text>{order.userName}</Typography.Text><br /><Typography.Text type="secondary">{order.userEmail}</Typography.Text></div>},
        {title: '业务类型', dataIndex: 'type', width: 160},
        {title: '金额', dataIndex: 'amount', width: 120, render: (value: number) => <Typography.Text strong>¥{value.toLocaleString()}</Typography.Text>},
        {title: '状态', dataIndex: 'status', width: 110, render: (value: OrderStatus) => <Tag color={statusColor[value]}>{value}</Tag>},
        {title: '创建时间', dataIndex: 'createdAt', width: 165},
        {title: '操作', key: 'actions', width: 95, render: (_, order) => <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => setSelectedOrder(order)}>详情</Button>},
    ]
    return (
        <Space orientation="vertical" size={8} className="page-stack">
            <Card className="filter-card">
                <Space wrap>
                    <Input allowClear placeholder="搜索订单号、用户名称或邮箱" prefix={<SearchOutlined />} value={keyword} onChange={event => setKeyword(event.target.value)} className="search-input" />
                    <Select value={status} onChange={setStatus} options={['全部', '已完成', '处理中', '待付款', '已取消'].map(value => ({value, label: `状态：${value}`}))} className="status-select" />
                </Space>
            </Card>
            <Card className="table-card" title="订单列表" extra={<Typography.Text type="secondary">共 {filteredOrders.length} 笔订单</Typography.Text>}>
                <Table rowKey="id" size="middle" columns={columns} dataSource={filteredOrders} scroll={{x: 980}} pagination={{pageSize: 5, showSizeChanger: false, showTotal: total => `共 ${total} 条`}} />
            </Card>
            <Drawer title="订单详情" open={Boolean(selectedOrder)} onClose={() => setSelectedOrder(null)} size={460}>
                {selectedOrder && <Space orientation="vertical" size={22} className="detail-stack">
                    <div><Typography.Text type="secondary">订单状态</Typography.Text><br /><Tag color={statusColor[selectedOrder.status]} className="large-status">{selectedOrder.status}</Tag></div>
                    <Descriptions column={1} colon={false} labelStyle={{width: 112, color: '#64748b'}} items={[
                        {key: 'id', label: '订单编号', children: selectedOrder.id},
                        {key: 'user', label: '关联用户', children: selectedOrder.userName},
                        {key: 'email', label: '用户邮箱', children: selectedOrder.userEmail},
                        {key: 'type', label: '业务类型', children: selectedOrder.type},
                        {key: 'amount', label: '订单金额', children: <Typography.Text strong>¥{selectedOrder.amount.toLocaleString()}</Typography.Text>},
                        {key: 'time', label: '创建时间', children: selectedOrder.createdAt},
                    ]} />
                    <div className="order-timeline"><b>订单进度</b><div><span />订单创建 <small>{selectedOrder.createdAt}</small></div><div><span className={selectedOrder.status === '已取消' ? 'muted' : 'active'} />状态：{selectedOrder.status}</div></div>
                </Space>}
            </Drawer>
        </Space>
    )
}
