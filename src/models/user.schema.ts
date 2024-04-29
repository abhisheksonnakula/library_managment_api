import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'Member' | 'Librarian';
    isValidPassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (email: string) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: 'Please enter a valid email'
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Member', 'Librarian'],
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,  // Adds createdAt and updatedAt timestamps,
    versionKey: false  // Disable __v field
});

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
    const user = this as unknown as IUser;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// Method to check password validity
userSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;
