import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class LoginDto{
    @IsEmail({}, { message: 'Email is not valid' })
    @IsString({ message: 'Email must be a string' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string | undefined;
    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password is too short. Minimum length is 6 characters' })
    password: string | undefined;
    


    
}