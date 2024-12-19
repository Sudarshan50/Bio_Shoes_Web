import { check,validationResult } from "express-validator";
let userUtils = {};


userUtils.addToCart = [
    check("pid").isMongoId().notEmpty(),
    check("quantity").isNumeric().notEmpty(),
    async (req,res)=>{
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty())
            {
                return errorResponse(res,`${errors?.array()[0]?.path} has ${errors?.array()[0]?.msg}`,errors.array()[0],422);
            }
            

        }catch(err)
        {
            console.log(err);
            return errorResponse(res,err.message,err,500);
        }
    }
]