import Layout from '@/layout'

const cdrRouter = {
  path: '/cdr',
  component: Layout,
  name: 'cdr',
  meta: {
    title: '话单管理',
    icon: 'user'
  },
  children: [
    {
      path: '/qc',
      component: () => import('@/views/cdr/qc'),
      name: '质检记录',
      meta: { title: '质检记录', noCache: true }
    },
    {
      path: '/blackCdr',
      component: () => import('@/views/cdr/black'),
      name: '黑名单记录',
      meta: { title: '黑名单话单', noCache: true }

    },
    {
      path: '/vipCdr',
      component: () => import('@/views/cdr/vip'),
      name: '白名单记录',
      meta: { title: '白名单话单', noCache: true }
    },
    {
      path: '/stat',
      component: () => import('@/views/cdr/stat'),
      name: '呼叫统计',
      meta: { title: '呼叫统计', noCache: true }
    }
  ]

}

export default cdrRouter
