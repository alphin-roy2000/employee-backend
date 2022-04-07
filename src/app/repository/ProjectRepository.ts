import { getConnection, Repository } from "typeorm";
import { Project } from "../entities/ProjectEntity";

export class ProjectRepository extends Repository<Project>{
    public async createProject(projectDetails: Project){
        const projectConnection = getConnection().getRepository(Project);
        const savedDetails = await projectConnection.save(projectDetails);
        return savedDetails;
    }
}