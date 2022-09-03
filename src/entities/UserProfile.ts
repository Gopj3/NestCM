import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import {AbstractEntity} from "../common/entities/abstract.entitiy";
import {User} from "./User";

@Entity({name: 'user_profiles'})
export class UserProfile extends AbstractEntity {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    avatar: string;

    @OneToOne(
        () => User,
        (user: User) => user.userProfile,
        {
            nullable: false,
            onDelete: 'CASCADE'
        }
    )
    @JoinColumn()
    user: User;
}
