const jwt=require('jsonwebtoken');
const jwtAuthMiddleware=(req,res,next)=>{
     
    const authorization=req.headers.authorization;
    if(!authorization){
        return res.status(401).json({error:"invalied token"})
    }

    //extract token fron jwt header
        const token=req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({error:'unauthorized'})
        }

        try{
           // verify token
           const decoded=jwt.verify(token,process.env.JWT_SECRET);
          // attach user information in the request object
           req.user=decoded;
           next();
        }catch(error){
           
            res.status(401).json({error:"invalid token"});
        }
}

// generate token

const generateToken=function(userData){
    // generate new JWT token to user
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:3000});

}

module.exports={jwtAuthMiddleware,generateToken};