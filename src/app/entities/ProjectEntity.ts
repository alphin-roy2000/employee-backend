import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Department } from "./Department";

@Entity("project")
export class Project extends AbstractEntity{
    @PrimaryGeneratedColumn("uuid")
    public project_id: string;

    @Column({nullable: false})
    public name: string;

    @Column({nullable: false})
    public isActive: string;

    // @ManyToOne((type) => Department, {cascade: true})
    // @JoinColumn()
    // public department: Department;
}