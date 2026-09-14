import type {Activity, ContentItem, Order, Role, User} from '../types'

export const users: User[] = [
    {id: 'U-10086', name: '王晓明', email: 'xiaoming.wang@example.com', phone: '138 **** 1024', role: '运营专员', status: '正常', createdAt: '2026-09-09 10:24', lastActiveAt: '今天 09:32'},
    {id: 'U-10085', name: '刘思雨', email: 'siyu.liu@example.com', phone: '139 **** 3621', role: '内容编辑', status: '正常', createdAt: '2026-09-08 16:40', lastActiveAt: '今天 09:15'},
    {id: 'U-10084', name: '陈宇航', email: 'yuhang.chen@example.com', phone: '186 **** 5473', role: '数据分析师', status: '待审核', createdAt: '2026-09-08 11:05', lastActiveAt: '昨天 18:20'},
    {id: 'U-10083', name: '赵清妍', email: 'qingyan.zhao@example.com', phone: '137 **** 2168', role: '运营专员', status: '正常', createdAt: '2026-09-07 14:50', lastActiveAt: '昨天 17:48'},
    {id: 'U-10082', name: '林志远', email: 'zhiyuan.lin@example.com', phone: '158 **** 9074', role: '访客', status: '已禁用', createdAt: '2026-09-06 09:18', lastActiveAt: '2026-09-07 11:06'},
    {id: 'U-10081', name: '周可欣', email: 'kexin.zhou@example.com', phone: '181 **** 3320', role: '内容编辑', status: '正常', createdAt: '2026-09-05 18:15', lastActiveAt: '2026-09-08 15:30'},
]

export const orders: Order[] = [
    {id: 'ORD-20260910001', userName: '王晓明', userEmail: 'xiaoming.wang@example.com', type: '企业标准服务', amount: 1299, status: '已完成', createdAt: '2026-09-10 14:26'},
    {id: 'ORD-20260910002', userName: '刘思雨', userEmail: 'siyu.liu@example.com', type: '高级会员订阅', amount: 399, status: '处理中', createdAt: '2026-09-10 13:10'},
    {id: 'ORD-20260909003', userName: '陈宇航', userEmail: 'yuhang.chen@example.com', type: '数据报告服务', amount: 699, status: '待付款', createdAt: '2026-09-09 17:48'},
    {id: 'ORD-20260909002', userName: '赵清妍', userEmail: 'qingyan.zhao@example.com', type: '企业标准服务', amount: 1299, status: '已完成', createdAt: '2026-09-09 11:36'},
    {id: 'ORD-20260908001', userName: '周可欣', userEmail: 'kexin.zhou@example.com', type: '高级会员订阅', amount: 399, status: '已取消', createdAt: '2026-09-08 16:12'},
    {id: 'ORD-20260907002', userName: '孙嘉乐', userEmail: 'jiale.sun@example.com', type: '数据报告服务', amount: 699, status: '已完成', createdAt: '2026-09-07 09:44'},
]

export const contents: ContentItem[] = [
    {id: 'CNT-001', title: '九月产品更新与服务说明', category: '产品公告', author: '刘思雨', status: '已发布', updatedAt: '2026-09-10 15:42', views: 1286},
    {id: 'CNT-002', title: '企业服务使用指南（新版）', category: '帮助中心', author: '周可欣', status: '待审核', updatedAt: '2026-09-10 11:08', views: 0},
    {id: 'CNT-003', title: '运营增长案例：如何提升转化率', category: '运营洞察', author: '刘思雨', status: '已发布', updatedAt: '2026-09-09 17:20', views: 943},
    {id: 'CNT-004', title: '国庆期间服务安排', category: '产品公告', author: '周可欣', status: '草稿', updatedAt: '2026-09-08 09:26', views: 0},
    {id: 'CNT-005', title: '数据导出功能常见问题', category: '帮助中心', author: '刘思雨', status: '已发布', updatedAt: '2026-09-06 14:05', views: 627},
]

export const roles: Role[] = [
    {id: 'role-admin', name: '超级管理员', description: '拥有全部系统与业务管理权限', memberCount: 2, permissions: ['dashboard', 'users', 'orders', 'content', 'roles', 'settings']},
    {id: 'role-operator', name: '运营专员', description: '负责用户运营、订单处理与业务内容', memberCount: 12, permissions: ['dashboard', 'users', 'orders', 'content']},
    {id: 'role-editor', name: '内容编辑', description: '负责内容创建、编辑与发布', memberCount: 6, permissions: ['dashboard', 'content']},
    {id: 'role-analyst', name: '数据分析师', description: '查看运营数据与订单统计', memberCount: 4, permissions: ['dashboard', 'orders']},
]

export const activities: Activity[] = [
    {id: 'A-01', avatar: '王', actor: '王晓明', action: '完成了订单', target: 'ORD-20260910001', time: '14 分钟前'},
    {id: 'A-02', avatar: '刘', actor: '刘思雨', action: '发布了内容', target: '九月产品更新与服务说明', time: '1 小时前'},
    {id: 'A-03', avatar: '陈', actor: '陈宇航', action: '提交了账号审核申请', target: 'U-10084', time: '2 小时前'},
    {id: 'A-04', avatar: '赵', actor: '赵清妍', action: '更新了订单状态', target: 'ORD-20260909002', time: '昨天 17:48'},
]

export const permissionTree = [
    {title: '数据概览', key: 'dashboard'},
    {title: '用户管理', key: 'users'},
    {title: '业务订单', key: 'orders'},
    {title: '内容管理', key: 'content'},
    {title: '角色权限', key: 'roles'},
    {title: '系统设置', key: 'settings'},
]
