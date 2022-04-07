import { ErrorCodes } from "../util/errorCode";
import HttpException from "./HttpException";

class UserNotAuthorizedAdminException extends HttpException{
    constructor(){
        const errorDetails = ErrorCodes.UNAUTHORIZEDADMIN;
        super(401, errorDetails.MESSAGE, errorDetails.CODE)
    }
}

export default UserNotAuthorizedAdminException;