import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import {AbstractEntity} from "../common/entities/abstract.entitiy";
import {UserEntity} from "./user.entity";

@Entity({name: 'user_profiles'})
export class UserProfileEntity extends AbstractEntity {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    avatar: string;

    @OneToOne(
        () => UserEntity,
        (user: UserEntity) => user.userProfile,
        {
            nullable: false,
            onDelete: 'CASCADE'
        }
    )
    @JoinColumn()
    user: UserEntity;
}
