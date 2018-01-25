const Router = require('koa-router')
const distanceController = new Router()
const distanceService = require('../service/distance.service')
var firebase = require('firebase')

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCQ1E-pG7BCAGrfYOUsR1OPtiIJgKmYxtg",
  authDomain: "maphomework-1492870415908.firebaseapp.com",
  databaseURL: "https://maphomework-1492870415908.firebaseio.com",
  projectId: "maphomework-1492870415908",
  storageBucket: "maphomework-1492870415908.appspot.com",
  messagingSenderId: "41030793868"
}
firebase.initializeApp(config)
var database = firebase.database()
let amphur = []
database.ref('tambon').once('value').then(snapshot => {
    amphur = snapshot.val()
})

distanceController.get('/name', (ctx) => {
    ctx.body = "test"
})

distanceController.post('/', (ctx) => {
    let firstAmphur = amphur.find( element => {
        return element.district == ctx.request.body.firstAmphur
    })
    let secondAmphur = amphur.find( element => {
        return element.district == ctx.request.body.secondAmphur
    })
    let res = distanceService.calDistance(firstAmphur.lat,firstAmphur.lng,secondAmphur.lat,secondAmphur.lng)
    ctx.body = res
})


module.exports = distanceController