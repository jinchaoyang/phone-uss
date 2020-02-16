import Layout from '@/layout'

const tenantRoute = {
    path: '/tenant',
    component: Layout,
    name: 'tenant',
    meta: {
        title: '企业管理',
        icon: 'table'
    },
    children: [
        {
            path: '/list',
            component: () => import('@/views/tenant/index'),
            name: '企业列表',
            meta: { title: '企业列表', noCache: true }

        }
    ]

}

export default tenantRoute;