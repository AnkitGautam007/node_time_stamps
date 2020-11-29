const express = require('express')
const cors = require('cors')
const Model = require('./db/mongoose')
require('./db/mongoose')

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

app.post('/', async (req, res) => {
    const object = new Model(req.body)
    try {
        await object.save()
        res.send(object)
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/', async (req, res) => {
    try {
        const data = await Model.find({})
        const result = data.map(obj => {
            return{
                timeStamp:obj.timeStamp,
                timeZones:timeStampToDate(obj.timeStamp)
            }
        })
        res.send(result)
    } catch (e) {
        res.status(500).send()
    }
})

const time = {
    delhi: '',
    london: '',
    newyork: ''
}

const offSet = {
    delhi: +5.5 * (3600 * 1000),
    london: 0,
    newyork: -5 * (3600 * 1000)
}

const timeZones = (millisecons, localoffset, offset) => {
    const total = millisecons + offset + localoffset
    const date = new Date(total)
    return date.toLocaleString()
}

const timeStampToDate = (timestamp) => {
    const GMTtimeStamp = timestamp
    const millisecons = GMTtimeStamp * 1000
    const date = new Date(millisecons)
    const localOffSet = date.getTimezoneOffset() * 60000
    for (let key in offSet) {
        time[key] = timeZones(millisecons, localOffSet, offSet[key])
    }
    return {...time}
}
// console.log(timeStampToDate(917179200))

app.listen(port, () => console.log('server is up and running'))