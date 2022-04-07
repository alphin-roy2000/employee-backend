import { getConnection, Repository } from "typeorm";
import { CreateRoleDto } from "../dto/CreateRole";

import { Role } from "../entities/RoleEntity";

export class RoleRepository extends Repository<Role>{
    public async saveRoleDetails(roleDetails: Role) {
        const roleRepo = getConnection().getRepository(Role);
        return roleRepo.save(roleDetails);
    }

    public async updateRoleDetails(role_id: string, roleDetails: CreateRoleDto) {
        const roleRepo = getConnection().getRepository(Role);
        const updateRoleDetails = await roleRepo.update({ id: role_id, deletedAt: null }, {
            role: roleDetails.role ? roleDetails.role : undefined,
            salary: roleDetails.salary ? roleDetails.salary : undefined,
            description: roleDetails.description ? roleDetails.description : undefined
        });
        return updateRoleDetails;
    }

    public async deleteRoleById(id: string) {
        const roleRepo = getConnection().getRepository(Role);
        return roleRepo.delete({
            id
        });
    }
}