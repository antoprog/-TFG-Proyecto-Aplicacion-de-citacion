import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]
        if (!token) return res.status(403).json({message: 'No token'})

        const tokenString = token.split(' ')[1];
        const decoded = jwt.verify(tokenString, config.SECRET, null, null);
        req.userId = decoded.id;
        const user = await User.findById(req.userId)

        if (!user) return res.status(200).json({message: 'User not found'})

        next()
    } catch (e) {
        console.log('error');
        return res.status(200).json({message: 'Unauthorized'})
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        const roles = await Role.find({_id: {$in: user.roles}})

        for (const role of roles) {
            if (role.name === 'admin') {
                return res.status(200).json(true);
            }
        }
    }catch (e) {
        console.log(e);
    }
}

export const isUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        const roles = await Role.find({_id: {$in: user.roles}})

        for (const role of roles) {
            if (role.name === 'user') {
                return res.status(200).json(true);
            }
        }
    }catch (e) {
        console.log(e);
    }
}

export const isModerator = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        const roles = await Role.find({_id: {$in: user.roles}})

        for (const role of roles) {
            if (role.name === 'moderator') {
                return res.status(200).json(true);
            }
        }
    }catch (e) {
        console.log(e);
    }
}