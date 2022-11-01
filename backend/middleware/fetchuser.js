const jwt = require('jsonwebtoken');
const JWT_SECRET = 'pratyushisagoodb$oy';
const fetchuser =(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error : "Please authenticate using valid token"});
    };
    try {
        data = jwt.verify(token, JWT_SECRET);
        console.log(data)
        req.user = data.user;
        next();
        
    } catch (error) {
        return res.status(401).send({error : "Please authenticate using valid token 1234"});
    }


}
module.exports=fetchuser;