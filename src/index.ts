import express from 'express';
import cookieSession from 'cookie-session';

import { router as controllerRouter } from './controllers/decorators/controller';

import loginRoutes from './routes/loginRoutes';

import './controllers/LoginController';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cookieSession({
        keys: ['secret'],
    })
);

app.use(loginRoutes);
app.use(controllerRouter);

app.listen(3000, () => {
    console.log('Listening on port: http://localhost:3000');
});
