import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import {createRoles} from "./libs/initialSetup";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import psicologosRoutes from "./routes/psicologos.routes";
import pacientesRoutes from "./routes/pacientes.routes";
import cors from 'cors'

const app = express()
createRoles();

app.use(express.json())
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        author: pkg.author,
        description: pkg.description,
        version: pkg.version
    });
})

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/psicologo', psicologosRoutes)
app.use('/paciente', pacientesRoutes)
export default app;