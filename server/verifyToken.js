import jwt from "jsonwebtoken";
import {createError} from "./error.js";

// verify user using web token middleware
export const verifyToken = (req, res, next) =>{
    const token =  req.cookies.access_token;
    console.log(`cookies: ${req.cookies}`);
    console.log(`cookie header: ${req.headers.cookie ? req.headers.cookie.split("; ") : '[]'}`);

    // console.log(token)
    // throw error if no token found
    if(!token) return next(createError(401, "You are not authenticated!"));

    // verify web token
    jwt.verify(token, process.env.JWT, (err, user)=>{
        
        // throw error if wrong token
        if(err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    })
}
