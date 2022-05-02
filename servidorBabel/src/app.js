import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import {createAgenda, createRoles} from "./libs/initialSetup";
import authRoutes from "./routes/auth.routes";
import psicologosRoutes from "./routes/psicologos.routes";
import pacientesRoutes from "./routes/pacientes.routes";
import cors from 'cors'
import agendaRoutes from "./routes/agenda.routes";

const app = express()
createRoles();
createAgenda();

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
app.use('/psicologo', psicologosRoutes)
app.use('/paciente', pacientesRoutes)
app.use('/agenda', agendaRoutes)
export default app;
