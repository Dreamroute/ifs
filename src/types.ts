export type UserStatus = '正常' | '已禁用' | '待审核'
export type OrderStatus = '已完成' | '处理中' | '待付款' | '已取消'
export type ContentStatus = '已发布' | '草稿' | '待审核'

export interface User {
    id: string
    name: string
    email: string
    phone: string
    role: string
    status: UserStatus
    createdAt: string
    lastActiveAt: string
}

export interface Order {
    id: string
    userName: string
    userEmail: string
    type: string
    amount: number
    status: OrderStatus
    createdAt: string
}

export interface ContentItem {
    id: string
    title: string
    category: string
    author: string
    status: ContentStatus
    updatedAt: string
    views: number
}

export interface Role {
    id: string
    name: string
    description: string
    memberCount: number
    permissions: string[]
}

export interface Activity {
    id: string
    avatar: string
    actor: string
    action: string
    target: string
    time: string
}