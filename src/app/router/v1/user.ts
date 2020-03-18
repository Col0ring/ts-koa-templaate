import Router from 'koa-router'
import User from '@/app/models/User'
const router = new Router({
  prefix: '/v1/user'
})

router.post('/register', async ctx => {
  const user = {}
  const r = await User.create(user)
})

export default router
