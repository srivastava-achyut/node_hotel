const eventEmitter = require('events')
const { EventEmitter } = require('stream')
const customEmiiter= new EventEmitter()
customEmiiter.on('response',()=>{
    console.log(`data received`)
})
customEmiiter.emit('response')

