import {Entity, Column, OneToMany} from 'typeorm';
import {AbstractEntity} from "../common/entities/abstract.entitiy";
import {AutoMap} from "@automapper/classes";
import {ProjectUserEntity} from "./project-user.entity";
import {ProjectStatusEnum} from "../modules/project/enums/project.status.enum";

@Entity({name: 'projects'})
export class ProjectEntity extends AbstractEntity {
    @AutoMap()
    @Column({unique: true})
    title: string;

    @Column({ default: false })
    description: string;

    @AutoMap()
    @Column()
    startDate: Date;

    @AutoMap()
    @Column()
    potentialEndDate: Date;

    @Column({ type: 'enum', enum: ProjectStatusEnum, default: ProjectStatusEnum.PENDING })
    status: ProjectStatusEnum;

    @OneToMany(
        () => ProjectUserEntity,
        (projectUsers: ProjectUserEntity) => projectUsers.project,
        {nullable: true}
    )
    projectUsers?: ProjectUserEntity[]
}
