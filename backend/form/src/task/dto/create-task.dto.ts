import { IsString, IsOptional, IsIn, IsDateString } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    title!: string; // Required field

    @IsOptional()
    @IsString()
    description?: string; // Optional field

    @IsString()
    @IsIn(['todo', 'doing', 'done']) // Restrict status to specific values
    status!: string; // Required field

    @IsDateString()
    dueDate!: string; // Required field, must be a valid date string
}