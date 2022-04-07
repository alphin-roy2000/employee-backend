import { plainToClass } from "class-transformer";
import { getConnection } from "typeorm";
import { CreateRoleDto } from "../dto/CreateRole";
import { Project } from "../entities/ProjectEntity";
import { Role } from "../entities/RoleEntity";
import HttpException from "../exception/HttpException";
import { RoleRepository } from "../repository/RoleRepository";

export class RoleService{
    constructor(private roleRepository: RoleRepository){
        
    }
    public async getAllRoles() {
        const roleRepo = getConnection().getRepository(Role);
        return roleRepo.findAndCount();
    }
    public async createRole(roleDetails: CreateRoleDto) {
        try {
            const newRole = plainToClass(Role, {
                role: roleDetails.role,
                description: roleDetails.description,
                salary: roleDetails.salary,
            });
            const save = await this.roleRepository.saveRoleDetails(newRole);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create role");
        }
    }

    public async updateRole(roleId: string, roleDetails: CreateRoleDto) {
        const updatedEmployee = await this.roleRepository.updateRoleDetails(roleId, roleDetails);
        return updatedEmployee;
    }

    public async deleteRole(roleId: string) {
        return this.roleRepository.deleteRoleById(roleId);
    }
}