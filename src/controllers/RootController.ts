import { Request, Response } from 'express';

import { controller, get, use } from './decorators';

import { requireAuth } from '../middlewares/protectedRoute';

@controller('')
export class RootControler {
    @get('/')
    getRoot(req: Request, res: Response) {
        if (req.session && req.session.loggedIn) {
            res.send(`
            <p>You are logged in</p>
            <a href="/auth/logout">Logout</a>
        `);
        } else {
            res.send(`
            <p>You are not logged in</p>
            <a href="/auth/login">Login</a>
        `);
        }
    }

    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response) {
        res.send('Welcome to protected route, logged in user');
    }
}
