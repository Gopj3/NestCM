import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";
import {IsEqualTo} from "../../../decorators/is.equal.to";
import { AutoMap } from "@automapper/classes";

export class RegisterUserDto {
    @AutoMap()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @AutoMap()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsEqualTo('password')
    confirmPassword: string;
}
