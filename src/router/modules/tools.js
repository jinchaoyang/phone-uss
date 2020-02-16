import Layout from '@/layout'

const toolRoute = {
    path: '/tools',
    component: Layout,
    name: 'tools',
    meta: {
        title: '工具箱',
        icon: 'nested'
    },
    children: [
        {
            path: '/black',
            component: () => import('@/views/tool/black'),
            name: '黑名单列表',
            meta: { title: '黑名单列表', noCache: true }

        },
        {
            path: '/vip',
            component: () => import('@/views/tool/vip'),
            name: '白名单列表',
            meta: { title: '白名单列表', noCache: true }

        },
        {
            path: '/filter',
            component: () => import('@/views/tool/filter'),
            name: '号码过滤',
            meta: { title: '号码过滤', noCache: true }
  
        }

    ]

}

export default toolRoute;