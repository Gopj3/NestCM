import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import {AbstractEntity} from "../common/entities/abstract.entitiy";
import {ProjectEntity} from "./project.entity";
import { UserEntity } from './user.entity';
import {ProjectUsersRoleEnum} from "../modules/user/enums/project.users.role.enum";

@Entity({name: 'projects_users'})
export class ProjectUserEntity extends AbstractEntity {
    @JoinColumn()
    @ManyToOne(
        () => ProjectEntity,
        (project: ProjectEntity) => project.projectUsers,
        {nullable: false}
    )
    project: ProjectEntity;

    @JoinColumn({name: 'user_id'})
    @ManyToOne(
        () => UserEntity,
        (user: UserEntity) => user.projectUsers,
        {nullable: false}
    )
    user: UserEntity;

    @Column({ type: 'enum', enum: ProjectUsersRoleEnum, default: ProjectUsersRoleEnum.DEFAULT })
    userProjectRole: ProjectUsersRoleEnum;
}
