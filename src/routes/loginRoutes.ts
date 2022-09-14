import { Router, Request, Response } from 'express';

import { requireAuth } from '../middlewares/protectedRoute';

interface RequestWithBody extends Request {
    body: {
        [key: string]: string | undefined;
    };
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
            <p>You are logged in</p>
            <a href="/logout">Logout</a>
        `);
    } else {
        res.send(`
            <p>You are not logged in</p>
            <a href="/login">Login</a>
        `);
    }
});

router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined;

    res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send('Welcome to protected route, logged in user');
});

export default router;
