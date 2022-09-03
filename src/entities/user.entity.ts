import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import {AbstractEntity} from "../common/entities/abstract.entitiy";
import {UserProfileEntity} from "./user-profile.entity";
import {AutoMap} from "@automapper/classes";

@Entity({name: 'users'})
export class UserEntity extends AbstractEntity {
    @AutoMap()
    @Column({unique: true})
    email: string;

    @Column({ default: false })
    isActive: boolean;

    @AutoMap()
    @Column()
    password: string;

    @OneToOne(
        () => UserProfileEntity,
        (up: UserProfileEntity) => up.user,
        {nullable: true}
    )
    userProfile?: UserProfileEntity;
}
