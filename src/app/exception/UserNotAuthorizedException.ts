import { ErrorCodes } from "../util/errorCode";
import HttpException from "./HttpException";

class UserNotAuthorizedException extends HttpException{
    constructor(){
        const errorDetails = ErrorCodes.UNAUTHORIZED;
        super(401, errorDetails.MESSAGE, errorDetails.CODE)
    }
}

export default UserNotAuthorizedException;