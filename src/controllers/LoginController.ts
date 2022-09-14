import { Request, Response } from 'express';

import { controller, get, post, bodyValidator } from './decorators';

@controller('/auth')
class LoginController {
    @get('/login')
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

    @post('/login')
    @bodyValidator('email', 'password')
    postLogin(req: Request, res: Response): void {
        const { email, password } = req.body;

        if (email === 'eacardenase@gmail.com' && password === 'qwerty') {
            // marking the user as logged in
            req.session = {
                loggedIn: true,
            };

            // redirect user to the root route
            res.redirect('/');
        } else {
            res.send('Invalid email or password');
        }
    }

    @get('/logout')
    getLogout(req: Request, res: Response): void {
        req.session = null;

        res.redirect('/');
    }
}
