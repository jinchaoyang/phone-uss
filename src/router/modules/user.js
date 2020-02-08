import Layout from '@/layout'

const userRouter = {
    path: '/users',
    component: Layout,
    name: 'users',
    meta: {
        title: '用户管理',
        icon: 'chart'
    },
    children: [
        {
            path: '/index',
            component: () => import('@/views/security/user/index'),
            name: '用户列表',
            meta: { title: '用户列表', noCache: true }

        }
    ]

}

export default userRouter;