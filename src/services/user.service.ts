import { UserRepository } from "../repositories/user.repository";
import { generateToken } from "../utils/generateToken";
import bcrypt from 'bcryptjs';

export class UserService {

    constructor(
        private userRepository: UserRepository,
    ) {};

    // Create New User
    async createUser(userData: any) {
        const user = await this.userRepository.findOne({ email: userData.email });
        if (user) {
            throw new Error('User already exists');
        };
        return this.userRepository.create(userData);
    };

    // Get Users with pagination
    async getUsers(page: number, limit: number) {
        const users = await this.userRepository.find({ isDeleted:false }, { page, limit, sort: { name: 1 } });
        return {
            data: users.documents,
            page: users.page,
            limit: users.limit,
            total: users.total
        }
    };

    // Get User by id
    async getUserById(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        };
        return user;
    };

    // Update User by id
    async updateUserById(id: string, userData: any) {

        if(userData.email) {
            const user = await this.userRepository.findOne({ email: userData.email });
            if (user) {
                throw new Error('User already exists');
            };
        };

        // Check for password 
        if (userData.password) {
            // Hash password before updating
            userData.password = await bcrypt.hash(userData.password, 8);
        };

        const user = await this.userRepository.findOneAndUpdate({
            _id: id
        }, userData, { new: true });
        if (!user) {
            throw new Error('User not found');
        };
        return user;
    };

    // Delete User by id
    async deleteUserById(id: string) {
        const user = this.userRepository.findOneAndUpdate({
            _id: id
        }, { isDeleted: true }, { new: true });

        if (!user) {
            throw new Error('User not found');
        };
        return {
            message: 'User Deleted Successfully',
        }
    };

    // Login User
    async loginUser(email: string, password: string) {

        const user = await this.userRepository.findOne({ email });
        if (!user) {
            // Thro error if user is not found
            throw new Error('Invalid Credentials');
        };

       // isValidPassword is a method from using schema.methods in user.schema.ts
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            // Thro error if password is invalid
            throw new Error('Invalid Credentials');
        };

        // Generating Token
        const token = generateToken({ id: user._id, email: user.email, role: user.role });

        return { 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
         };

    };

}