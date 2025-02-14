const express=require('express')
const aiRoutes =require('./routes/ai.routes')

const app=express()
const cors=require('cors')
app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({extended:true}))
app.use('/ai',aiRoutes)
app.get('/',(req,res)=>{
    res.send("hey sanamika")
})

module.exports=app