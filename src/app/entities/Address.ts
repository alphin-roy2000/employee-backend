
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";

@Entity("address")
export class Address extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public address: string;

    @Column()
    public state: string;
}