const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');
const distanceController = require('./app/controller/distance.controller')
const Koa = require('koa')
const Router = require('koa-router')

const App = new Koa()
const router = new Router()
App.use(bodyParser())
App.use(cors({
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'application/json', 'Accept']
}))

router.get('/name', (ctx) => {
    ctx.body = "name"
})

router.post('/', (ctx) => {
  ctx.body = ctx.request.body
})



router.use('/api', distanceController.routes())

App
  .use(router.routes())
  .use(router.allowedMethods())

// HTTP port 
var port = process.env.PORT || 3000
 
// Listen for connections 
App.listen(port)
 
// Log port 
console.log('Server listening on port ' + port)

