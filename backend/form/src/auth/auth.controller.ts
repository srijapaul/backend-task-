/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Post, UseGuards, Req, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('/auth')

export class AuthController {
  
    constructor(private readonly authService: AuthService,
      @InjectModel(User.name) private readonly userModel: Model<User>, // Inject the User model
    ) {}
    
    @Post('/register')
    async register(@Body() registerDto: RegisterDto, @Res() res: any) {
        try {
            // Registration logic
            const user = await this.authService.register(registerDto);
            return res.status(201).json({ message: 'Registration successful', user });
        } catch (error) {
            console.error('Error during registration:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
   @Post('/login')
   async login(@Body() credentials: LoginDto){
        return this.authService.login(credentials);

   }
  @UseGuards(AuthGuard)
   @Get('/profile')
   async getUser(@Req() req: any) {
    const userId = req.user.userId; 
    const user = await this.userModel.findById(userId); 
    console.log('userId from token',userId)// Query the database for the user
    if (!user) {
      throw new Error('User not found');
    }
    return {
      message: 'Access resource',
      user: { id: user._id, email: user.email }, // Return only necessary user data
    };
  }
}


