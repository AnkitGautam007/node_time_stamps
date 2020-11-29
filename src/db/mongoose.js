const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/timestamps',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
})

const schema = mongoose.Schema({
    timeStamp:{
        type:Number,
        required:true
    }
})

const Model = mongoose.model('Timestamp',schema)

module.exports = Model