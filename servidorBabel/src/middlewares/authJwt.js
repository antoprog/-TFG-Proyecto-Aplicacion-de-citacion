import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
    console.log('entra al token');
    try {
        console.log('entra 1:',res.statusCode);
        const token = req.headers["authorization"]
        if (!token) return res.status(403).json({message: 'No token'})

        const tokenString = token.split(' ')[1];
        const decoded = jwt.verify(tokenString, config.SECRET, null, null);
        req.userId = decoded.id;
        const user = await User.findById(req.userId)

        if (!user) return res.status(404).json({message: 'User not found'})

        const roles = await Role.find({_id: {$in: user.roles}})
        let name = [];
        for (let a of roles)
        {
            name.push({rolInt: a.name})
        }

        console.log(name);
        return res.status(202).json(name)
    } catch (e) {
        console.log('error');
        return res.status(404).json({message: 'Unauthorized'})
    }
}
