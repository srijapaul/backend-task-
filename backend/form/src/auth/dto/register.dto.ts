import { IsEmail, IsNotEmpty, IsString, MinLength, IsIn} from 'class-validator';
export class RegisterDto{
    
    @IsNotEmpty({ message: 'Email is required' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Email is not valid' })
    email: string | undefined;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password is too short. Minimum length is 6 characters' })
    readonly password: string | undefined;

    
    @IsIn(['user', 'admin']) // Validate role
    role!: string;
}