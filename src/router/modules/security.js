import Layout from '@/layout'

const userRouter = {
  path: '/sys',
  component: Layout,
  name: 'sys',
  meta: {
    title: '系统管理',
    icon: 'user'
  },
  children: [
    {
      path: '/users',
      component: () => import('@/views/security/user/index'),
      name: '用户列表',
      meta: { title: '用户列表', noCache: true,auth:['ADMIN'] }

    }
  ]

}

export default userRouter
