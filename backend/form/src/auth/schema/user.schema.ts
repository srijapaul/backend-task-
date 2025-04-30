/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema({
    timestamps: true,
})
export class User extends Document {
    @Prop({ type: String, required: true, unique: true })
    email: string | undefined;
    @Prop({ type: String, required: true })
    password: string | undefined;
    @Prop({required:true,enum: ['admin', 'user'], default: 'user' })
    role!: string;
   
    
}
export const UserSchema = SchemaFactory.createForClass(User);
