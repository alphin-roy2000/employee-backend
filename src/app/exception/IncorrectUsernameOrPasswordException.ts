import { ErrorCodes } from "../util/errorCode";
import HttpException from "./HttpException";

class IncorrectUsernameOrPasswordException extends HttpException{
    constructor(){
        const errorDetails = ErrorCodes.INCORRECT_USERNAME_OR_PASSWORD;
        super(401, errorDetails.MESSAGE, errorDetails.CODE)
    }
}

export default IncorrectUsernameOrPasswordException;