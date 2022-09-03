import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import {AbstractEntity} from "../common/entities/abstract.entitiy";
import {UserProfile} from "./UserProfile";

@Entity({name: 'users'})
export class User extends AbstractEntity {
    @Column({unique: true})
    email: string;

    @Column({ default: false })
    isActive: boolean;

    @Column()
    password: string;

    @OneToOne(
        () => UserProfile,
        (up: UserProfile) => up.user,
        {nullable: true}
    )
    userProfile?: UserProfile;
}
