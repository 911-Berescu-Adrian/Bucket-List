import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUser = req.session.userId;
    try {
        if (!authenticatedUser) {
            throw createHttpError(401, "Not authenticated");
        }
        const user = await UserModel.findById(authenticatedUser).select("+email").exec();
        if (!user) {
            throw createHttpError(401, "Not authenticated");
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

interface SignUpBody {
    email?: string;
    password?: string;
    username?: string;
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const email = req.body.email;
    const passwordRaw = req.body.password;
    const username = req.body.username;
    try {
        if (!email || !passwordRaw || !username) {
            throw createHttpError(400, "Missing required fields");
        }
        const existingUser = await UserModel.findOne({ username: username }).exec();
        if (existingUser) {
            throw createHttpError(400, "Username already exists");
        }
        const existingEmail = await UserModel.findOne({ email: email }).exec();
        if (existingEmail) {
            throw createHttpError(400, "Email already exists");
        }
        const password = bcrypt.hashSync(passwordRaw, 10);
        const user = await UserModel.create({
            email: email,
            password: password,
            username: username,
        });
        req.session.userId = user._id;

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    username?: string;
    password?: string;
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        if (!username || !password) {
            throw createHttpError(400, "Missing required fields");
        }
        const user = await UserModel.findOne({ username: username }).select("+password +email").exec();
        if (!user) {
            throw createHttpError(401, "Invalid email or password");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw createHttpError(401, "Invalid email or password");
        }
        req.session.userId = user._id;
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = async (req, res, next) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                throw error;
            }
            res.status(204).send();
        });
    } catch (error) {
        next(error);
    }
};

export const changePassword: RequestHandler<unknown, unknown, { password: string }, unknown> = async (
    req,
    res,
    next
) => {
    const userId = req.session.userId;
    const password = req.body.password;
    try {
        if (!userId || !password) {
            throw createHttpError(400, "Missing required fields");
        }
        const user = await UserModel.findById(userId).exec();
        if (!user) {
            throw createHttpError(401, "Not authenticated");
        }
        const newPassword = bcrypt.hashSync(password, 10);
        user.password = newPassword;
        await user.save();
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
    const userId = req.session.userId;
    try {
        if (!userId) {
            throw createHttpError(401, "Not authenticated");
        }
        await UserModel.findByIdAndDelete(userId).exec();
        req.session.destroy((error) => {
            if (error) {
                throw error;
            }
            res.status(204).send();
        });
    } catch (error) {
        next(error);
    }
};
