import express, { Request, Response } from 'express';
import cookieSession from 'cookie-session';

import loginRoutes from './routes/loginRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cookieSession({
        keys: ['secret'],
    })
);

app.use(loginRoutes);

app.listen(3000, () => {
    console.log('Listening on port: http://localhost:3000');
});
