import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface userDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    let user = this as userDocument;
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(process.env.saltRounds as number | undefined);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    }
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as userDocument;
    return bcrypt.compare(candidatePassword, user.password);
};

const User = mongoose.model<userDocument>('User', userSchema);

export default User;
