/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    jwtService: any;
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly jwtservice: JwtService,
            
    ) {
        console.log("jwt",this.jwtservice)
    }

    async register(createUserDto: any) {
        const { email, password, role } = createUserDto;
    
        // Check if the email already exists
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
          throw new ConflictException('Email already exists');
        }
    
        // Save the user to the database
        const user = new this.userModel({ email, password, role });
        await user.save();
    
        // Generate a JWT token
        const payload = { email: user.email, role: user.role };
        const token = this.jwtservice.sign(payload);
    
        return { user, token };
      }
    async login(credentials: LoginDto) {
        const { email, password } = credentials;
        Logger.log('Login attempt', credentials);
        const user = await this.userModel.findOne({ email });
        Logger.log(user);

        // Check if user exists
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Ensure user.password is defined and a string before calling bcrypt.compare
        if (!user.password || typeof user.password !== 'string') {
            throw new Error('Invalid credentials');
        }
        if (!password || typeof password !== 'string') {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid =  bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        return this.generateToken(user._id as string, user.role); // Use user._id as string
    }

    generateToken(userId: string, role: string) {
        Logger.log('userId', userId)
        Logger.log('JWT', process.env['JWT_SECRET']);
        const token = this.jwtservice.sign({ userId,role});
        return { token };
    }
    private async saveUserToDatabase(email: string, password: string, role: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({
            email,
            password: hashedPassword,
            role,
        });
        return newUser.save();
    }}