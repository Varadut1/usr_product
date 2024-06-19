import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface userDocument extends mongoose.Document{
    email: string,
    name: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    // comparePassword(password: string): Promise<Boolean>
}

export interface UserModel extends Model<userDocument> {
    comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        password: { type: String, required: true}
    }, 
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function(next){
    let user = this as userDocument;
    if(user.isModified("password")){
        const salt = await bcrypt.genSalt(config.get<number>("saltRounds"));
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    }
        next();
})

userSchema.methods.comparePassword = async function(password: string) : Promise<boolean>{
    const user = this as userDocument;
    return bcrypt.compareSync(password, user.password);
}

const User = mongoose.model<userDocument, UserModel>("User", userSchema);

export default User;