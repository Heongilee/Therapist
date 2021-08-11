const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4:uuidV4 } = require('uuid')

// 제발 되라...
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
	// 랜덤 UUID 생성하기 (like 9dd113f7-d2b3-43d3-b6eb-f90c9846632b || d9ce880b-b0c1-4c46-957f-42dcebb420aa)
	res.redirect(`/${uuidV4()}`)
})

io.on('connection', socket => {
	socket.on('join-room', (roomId, userId) => {
		socket.join(roomId)
		socket.to(roomId).broadcast.emit('user-connected', userId)
	})
})

app.get('/:room', (req, res) => {
	res.render('room', { roomId: req.params.room })
})

server.listen(3000)