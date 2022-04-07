import { plainToClass } from "class-transformer";
import { Project } from "../entities/ProjectEntity";
import { ProjectRepository } from "../repository/ProjectRepository";

export class ProjectService{
    constructor(private projectRepository: ProjectRepository){
        
    }
    public async createProject(projectInput: any){
        const projectData = plainToClass(Project, {
            "name": projectInput.name,
            "isActive": true
        })
        const savedDetails = await this.projectRepository.createProject(projectData);
        return savedDetails;
    }
}