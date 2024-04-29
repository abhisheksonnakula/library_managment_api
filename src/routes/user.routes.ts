import express from 'express';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';
import User from '../models/user.schema';
import { UserController } from '../controllers/user.controller';
import { validateLogin, validateUser } from '../validations/user.validation';
import { authenticate } from '../middlewares/authenticate';

const router = express.Router();
const userService = new UserService(new UserRepository(User));
const userController = new UserController(userService);

// Post a new user
router.post('/', authenticate(['Librarian']) , validateUser , userController.createUser);

// Get all users
router.get('/', authenticate(['Librarian']), userController.getUsers);

// Get user by id
router.get('/:id', authenticate(), userController.getUserById);

// Update user by id
router.put('/:id', authenticate(['Librarian']), userController.updateUserById);

// Delete user by id
router.delete('/:id', authenticate(['Librarian']), userController.deleteUserById);

// Login user
router.post('/login', validateLogin ,userController.loginUser);

export default router;
