const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const adminRouter = require('./adminRouter')
const writerRouter = require('./writerRouter')

router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/writer', writerRouter)

module.exports = router