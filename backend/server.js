const app=require('./src/app')
require('dotenv').config()
const cors=require('cors')
app.use(cors())

app.listen(3000,()=>{
    console.log("server is running");  
})