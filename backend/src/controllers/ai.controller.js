const aiService=require('../services/ai.service')



module.exports.getResponse =async (req,res)=>{
    try{

        const {code}=req.body
        if(!code)
            {
                return res.status(400).send("prompt is required")
            }
            
            const response=await aiService(code)
            res.send(response)
        }catch(error)
        {
            return res.status(500).send("something is wrong")
        }

}