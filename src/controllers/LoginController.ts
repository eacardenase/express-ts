import { NextFunction, Request, Response } from 'express';

import { controller, get, use } from './decorators';

function logger(req: Request, res: Response, next: NextFunction): void {
    console.log('Request was made');

    next();

    return;
}

@controller('/auth')
class LoginController {
    @get('/login')
    @use(logger)
    getLogin(req: Request, res: Response): void {
        res.send(`
        <form method="POST">
            <div>
                <label>Email</label>
                <input name="email" type="email"></input>
            </div>
            <div>
                <label>Password</label>
                <input name="password" type="password"></input>
            </div>
            <button>Submit</button>
        </form>
    `);
    }
}
