import {
    AppstoreOutlined,
    BellOutlined,
    FileTextOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoreOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons'
import {Avatar, Badge, Breadcrumb, Button, Dropdown, Layout, Menu, Space, Tabs} from 'antd'
import type {MenuProps, TabsProps} from 'antd'
import {useMemo, useState} from 'react'
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'
import ContentPage from '../pages/ContentPage'
import DashboardPage from '../pages/DashboardPage'
import OrdersPage from '../pages/OrdersPage'
import RolesPage from '../pages/RolesPage'
import SettingsPage from '../pages/SettingsPage'
import UsersPage from '../pages/UsersPage'

const {Header, Sider, Content} = Layout

interface WorkspaceTab {
    key: string
    icon: React.ReactNode
    label: string
    closable: boolean
    content: React.ReactNode
}

const navigation: WorkspaceTab[] = [
    {key: '/dashboard', icon: <AppstoreOutlined />, label: '仪表盘', closable: false, content: <DashboardPage />},
    {key: '/users', icon: <TeamOutlined />, label: '用户管理', closable: true, content: <UsersPage />},
    {key: '/orders', icon: <ShoppingCartOutlined />, label: '业务订单', closable: true, content: <OrdersPage />},
    {key: '/content', icon: <FileTextOutlined />, label: '内容管理', closable: true, content: <ContentPage />},
    {key: '/roles', icon: <UserOutlined />, label: '角色权限', closable: true, content: <RolesPage />},
    {key: '/settings', icon: <SettingOutlined />, label: '系统设置', closable: true, content: <SettingsPage />},
]

const dashboardTab = navigation[0]

const profileItems: MenuProps['items'] = [
    {key: 'profile', label: '个人资料'},
    {type: 'divider'},
    {key: 'logout', label: '退出登录'},
]

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const current = navigation.find((item) => item.key === location.pathname) ?? dashboardTab
    const [tabs, setTabs] = useState<WorkspaceTab[]>(() => current.key === dashboardTab.key ? [dashboardTab] : [dashboardTab, current])
    const breadcrumbItems = useMemo(() => [
        {title: <Link to="/dashboard">运营管理</Link>},
        {title: current.label},
    ], [current.label])

    const workspaceTabs = tabs.some((item) => item.key === current.key) ? tabs : [...tabs, current]

    const openTab = (key: string) => {
        const target = navigation.find((item) => item.key === key)
        if (!target) return
        setTabs((items) => {
            const currentTabs = items.some((item) => item.key === current.key) ? items : [...items, current]
            return currentTabs.some((item) => item.key === target.key) ? currentTabs : [...currentTabs, target]
        })
        navigate(target.key)
    }

    const closeTab = (key: string) => {
        if (key === dashboardTab.key) return
        const closingIndex = workspaceTabs.findIndex((item) => item.key === key)
        const remainingTabs = workspaceTabs.filter((item) => item.key !== key)
        setTabs(remainingTabs)
        if (key === current.key) {
            navigate(remainingTabs[closingIndex]?.key ?? remainingTabs[closingIndex - 1]?.key ?? dashboardTab.key)
        }
    }

    const closeOtherTabs = () => {
        const remainingTabs = current.key === dashboardTab.key ? [dashboardTab] : [dashboardTab, current]
        setTabs(remainingTabs)
    }

    const closeAllTabs = () => {
        setTabs([dashboardTab])
        navigate(dashboardTab.key)
    }

    const tabItems: TabsProps['items'] = workspaceTabs.map((tab) => ({
        key: tab.key,
        label: <Space size={6}>{tab.icon}<span>{tab.label}</span></Space>,
        closable: tab.closable,
        children: <div className="workspace-page"><div className="page-heading"></div>{tab.content}</div>,
    }))

    const tabActions: MenuProps['items'] = [
        {key: 'close-other', label: '关闭其他页签', disabled: workspaceTabs.length <= 1, onClick: closeOtherTabs},
        {key: 'close-all', label: '关闭全部页签', disabled: workspaceTabs.length <= 1, onClick: closeAllTabs},
    ]

    return (
        <Layout className="admin-shell">
            <Header className="admin-header">
                <div className="header-left">
                    <div className={collapsed ? 'brand brand-collapsed' : 'brand'}>
                        <div className="brand-mark">O</div>
                        {!collapsed && <span>One Ops</span>}
                    </div>
                    <Space size={16}>
                        <Button type="text" className="collapse-trigger" aria-label="切换侧栏" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed((value) => !value)} />
                        <Breadcrumb items={breadcrumbItems} />
                    </Space>
                </div>
                <Space size={20}>
                    <Badge dot offset={[-2, 2]}>
                        <Button type="text" className="header-icon" aria-label="通知" icon={<BellOutlined />} />
                    </Badge>
                    <Dropdown menu={{items: profileItems}} placement="bottomRight">
                        <Button type="text" className="account-button">
                            <Avatar size={32} className="account-avatar">管</Avatar>
                            <span className="account-name">管理员</span>
                        </Button>
                    </Dropdown>
                </Space>
            </Header>
            <Layout className="admin-body">
                <Sider collapsible collapsed={collapsed} trigger={null} width={248} className="admin-sider">
                    <Menu
                        mode="inline"
                        theme="light"
                        selectedKeys={[current.key]}
                        items={navigation.map(({key, icon, label}) => ({key, icon, label}))}
                        onClick={({key}) => openTab(key)}
                        className="main-menu"
                    />
                    {!collapsed && <div className="sider-footer">© 2026 OneOps</div>}
                </Sider>
                <Layout>
                    <Content className="admin-content">
                    <Tabs
                        activeKey={current.key}
                        className="workspace-tabs"
                        destroyOnHidden={false}
                        hideAdd
                        items={tabItems}
                        type="editable-card"
                        onChange={openTab}
                        onEdit={(targetKey, action) => {
                            if (action === 'remove' && typeof targetKey === 'string') closeTab(targetKey)
                        }}
                        tabBarExtraContent={{right: <Dropdown menu={{items: tabActions}} placement="bottomRight"><Button type="text" className="tab-actions" aria-label="页签操作" icon={<MoreOutlined />} /></Dropdown>}}
                    />
                    </Content>
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}
