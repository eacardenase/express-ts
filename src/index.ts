import express from 'express';
import cookieSession from 'cookie-session';

import AppRouter from './AppRouter';

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
app.use(AppRouter.getInstance());

app.listen(3000, () => {
    console.log('Listening on port: http://localhost:3000');
});
