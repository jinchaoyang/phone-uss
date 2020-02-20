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
      meta: { title: '用户列表', noCache: true }

    },
    {
      path: '/organs',
      component: () => import('@/views/security/organ/index'),
      name: '部门列表',
      meta: { title: '部门列表', noCache: true }

    },

    {
      path: '/roles',
      component: () => import('@/views/security/role/index'),
      name: '角色列表',
      meta: { title: '角色列表', noCache: true }
    }

  ]

}

export default userRouter
