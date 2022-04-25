import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]
        const tokenString = token.split(' ')[1];

        if (tokenString === 'null') {
            return res.status(200).json([{message: 'No token'}])
        }

        let decoded;
        try{
            decoded = jwt.verify(tokenString, config.SECRET, null, null);
        }catch (e) {
            return res.status(200).json([{message: 'Token caducado'}])
        }

        req.userId = decoded.id;
        const user = await User.findById(req.userId)

        if (!user) return res.status(200).json({message: 'User not found'})

        next()
    } catch (e) {
        console.log('error VERIFY TOKEN', e);
        return res.status(200).json({message: 'Unauthorized'})
    }
}

export const getRoles = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const rolesBD = await Role.find({_id: {$in: user.roles}})

        const roles = [];

        for (let a of rolesBD){
            roles.push(a.name)
        }

        return res.status(200).json(roles);
    } catch (e) {
        console.log(e);
        return res.status(200).json('error');
    }
}