import { NextFunction , Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {

    constructor(private userService: UserService) { 
    }

    public createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            next(error);
        }
    };

    public getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const users = await this.userService.getUsers(page, limit);
            res.status(200).json(users);
        } catch (error: any) {
            next(error);
        }
    };

    public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch (error: any) {
            next(error);
        }
    };

    public updateUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.updateUserById(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error: any) {
            next(error);
        }
    };

    public deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.deleteUserById(req.params.id);
            res.status(200).json(user);
        } catch (error: any) {
            next(error);
        }
    };

    public loginUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await this.userService.loginUser(email, password);
            res.status(200).json(user);
        } catch (error: any) {
            next(error);
        }
    };



}