import {ArrowDownOutlined, ArrowUpOutlined, CheckCircleFilled, ClockCircleOutlined, DollarOutlined, TeamOutlined, UserAddOutlined} from '@ant-design/icons'
import {Avatar, Card, Col, Listy, Progress, Row, Space, Statistic, Tag, Typography} from 'antd'
import {activities, orders, users} from '../mock/data'

const metrics = [
    {title: '累计用户', value: 12840, suffix: '人', trend: 12.5, icon: <TeamOutlined />},
    {title: '今日新增', value: 286, suffix: '人', trend: 8.2, icon: <UserAddOutlined />},
    {title: '本月订单', value: 1682, suffix: '单', trend: -3.1, icon: <CheckCircleFilled />},
    {title: '本月收入', value: 268900, prefix: '¥', trend: 16.8, icon: <DollarOutlined />},
]

const orderDistribution = [
    {label: '已完成', percent: 58, color: '#2563eb'},
    {label: '处理中', percent: 22, color: '#8b5cf6'},
    {label: '待付款', percent: 14, color: '#f59e0b'},
    {label: '已取消', percent: 6, color: '#94a3b8'},
]

export default function DashboardPage() {
    const pendingUsers = users.filter(item => item.status === '待审核').length
    const pendingOrders = orders.filter(item => item.status === '待付款' || item.status === '处理中').length

    return (
        <Space orientation="vertical" size={16} className="page-stack">
            <Row gutter={[16, 16]}>
                {metrics.map(metric => (
                    <Col xs={24} sm={12} xl={6} key={metric.title}>
                        <Card className="metric-card" variant="borderless">
                            <div className="metric-top">
                                <span className="metric-icon">{metric.icon}</span>
                                <span className={metric.trend >= 0 ? 'trend trend-up' : 'trend trend-down'}>
                                    {metric.trend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(metric.trend)}%
                                </span>
                            </div>
                            <Statistic title={metric.title} value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                            <Typography.Text type="secondary" className="metric-caption">较上月同期</Typography.Text>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} xl={16}>
                    <Card title="近 7 日业务趋势" extra={<Typography.Text type="secondary">2026.09.04 - 2026.09.10</Typography.Text>} className="chart-card">
                        <div className="trend-chart" aria-label="近七日业务趋势柱状图">
                            {[42, 57, 48, 70, 64, 88, 76].map((height, index) => (
                                <div className="trend-column" key={height + index}>
                                    <span className="trend-value">{height}</span>
                                    <div className="trend-bar" style={{height: `${height}%`}} />
                                    <span className="trend-label">{['周四', '周五', '周六', '周日', '周一', '周二', '今天'][index]}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
                <Col xs={24} xl={8}>
                    <Card title="订单状态分布" className="distribution-card">
                        <div className="order-total"><span>订单总数</span><strong>1,682</strong></div>
                        <Space orientation="vertical" size={14} className="full-width">
                            {orderDistribution.map(item => (
                                <div key={item.label}>
                                    <div className="distribution-label"><span><i style={{background: item.color}} />{item.label}</span><b>{item.percent}%</b></div>
                                    <Progress percent={item.percent} showInfo={false} strokeColor={item.color} railColor="#eef2f7" size="small" />
                                </div>
                            ))}
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} xl={10}>
                    <Card title="待处理事项" className="todo-card">
                        <div className="todo-row"><span className="todo-icon warning"><ClockCircleOutlined /></span><div><b>{pendingUsers} 个账号待审核</b><span>请及时处理新成员的权限申请</span></div><Tag color="orange">待处理</Tag></div>
                        <div className="todo-row"><span className="todo-icon primary"><DollarOutlined /></span><div><b>{pendingOrders} 笔订单待跟进</b><span>包含待付款与处理中业务订单</span></div><Tag color="blue">进行中</Tag></div>
                        <div className="todo-row"><span className="todo-icon success"><CheckCircleFilled /></span><div><b>2 篇内容待审核</b><span>内容审核完成后可安排发布</span></div><Tag color="green">可处理</Tag></div>
                    </Card>
                </Col>
                <Col xs={24} xl={14}>
                    <Card title="最近动态" className="activity-card">
                        <Listy items={activities} rowKey="id" itemRender={activity => (
                            <div className="activity-list-item">
                                <Avatar className="activity-avatar">{activity.avatar}</Avatar>
                                <div className="activity-content">
                                    <span><b>{activity.actor}</b> {activity.action} <Typography.Text strong>{activity.target}</Typography.Text></span>
                                    <small>{activity.time}</small>
                                </div>
                            </div>
                        )} />
                    </Card>
                </Col>
            </Row>
        </Space>
    )
}
