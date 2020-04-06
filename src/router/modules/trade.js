import Layout from '@/layout'

const tradeRouter = {
  path: '/trade',
  component: Layout,
  name: 'trade',
  meta: {
    title: '交易记录',
    icon: 'user'
  },
  children: [
    {
      path: '/charge',
      component: () => import('@/views/trade/charge'),
      name: '',
      meta: { title: '充值记录', noCache: true,auth:['ADMIN'] }

    },
    {
      path: '/consume',
      component: () => import('@/views/trade/consume'),
      name: '消费记录',
      meta: { title: '消费记录', noCache: true,auth:['ADMIN'] }
    }
  ]

}

export default tradeRouter
