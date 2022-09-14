import { Router } from 'express';

export default class AppRouter {
    private static instance: Router;

    static getInstance(): Router {
        if (!AppRouter.instance) {
            AppRouter.instance = Router();
        }

        return AppRouter.instance;
    }
}
