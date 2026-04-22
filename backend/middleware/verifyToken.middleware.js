import jwt from 'jsonwebtoken'
const verifyToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(500).json({message: "JWT token not found!"});
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY,(err,user) => {
        if(err){
            return res.status(500).json({message: "Invalid Token"});
        }
        req.user = user;
        next();
    });
}
export default verifyToken