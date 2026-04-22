import pool from "../config/connectdb.js";

const isUserExist = async (req,res,next) => {
    try{
        const {email} = req.body;
        const query = "SELECT * FROM auth WHERE email=?";
        const [isExist] = await pool.execute(query,[email]);
        if(isExist.length > 0){
            res.status(500).json({message: "User already exist"});
        }
        else{
            res.status(200);
            next();
        }
    }
    catch(err){
        res.json({message: "Error While checking user Existence"}).status(500);
    }
    
}
export default isUserExist