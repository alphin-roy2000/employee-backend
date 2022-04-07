import express from "express";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import RequestWithUser from "../util/rest/request";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import APP_CONSTANTS from "../constants";
const authorize = () => {
 return async (
   req: RequestWithUser,
   res: express.Response,
   next: express.NextFunction
 ) => {
   try {
     const token = getTokenFromRequestHeader(req);
     console.log("de13212421343252345")
     const decoded = jsonwebtoken.decode(token)
     const payLoadString = JSON.stringify(decoded);
     console.log(JSON.parse(payLoadString).customRole);
    //  console.log(decoded.customRole)
     jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
     return next();
   } catch (error) {
     return next(new UserNotAuthorizedException());
   }
 };
};
const getTokenFromRequestHeader = (req: RequestWithUser) => {
    const tokenWithBearerHeader = req.header(
      `${APP_CONSTANTS.authorizationHeader}`
    );
    if (tokenWithBearerHeader) {
      return tokenWithBearerHeader.replace(`${APP_CONSTANTS.bearer} `, "");
    }
    return "";
   };
export default authorize;