// Validating request against the schema using zod

import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
const validate = (schema:AnyZodObject) => (req:Request, res:Response, next:NextFunction) => {
    console.log("req.body");
    try{
        schema.parse({
            body:req.body,
            query:req.query,
            params:req.params
        });
        
        next();
    }
    catch(e: any){
        // console.log(req.body, req.query, req.params);
        return res.status(400).send(e.errors);
    }
}

export default validate;