import { AutoMap } from "@automapper/classes";
import { Exclude } from "class-transformer";

export class UserDto {
  @AutoMap()
  id: number;

  @AutoMap()
  email: string;

  @Exclude()
  password: string;
}
