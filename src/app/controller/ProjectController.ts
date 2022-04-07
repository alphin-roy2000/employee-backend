import { Response, NextFunction } from "express";
import APP_CONSTANTS from "../constants";
import { ProjectService } from "../services/ProjectService";
import { AbstractController } from "../util/rest/controller";
import RequestWithUser from "../util/rest/request";

class ProjectController extends AbstractController{
    constructor(private projectServce: ProjectService){
        super(`${APP_CONSTANTS.apiPrefix}/projects`);
        this.initializeRoutes();
    }

    protected initializeRoutes(): void {

       this.router.post(`${this.path}`,this.createProject) 
    }

    private createProject = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        const data = await this.projectServce.createProject(request.body);
        response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
    }

}

export default ProjectController;