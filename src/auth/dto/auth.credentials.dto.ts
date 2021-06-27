import { IsString, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDTO {
    @IsString()
    @MinLength(4)
    @MaxLength(10)
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}