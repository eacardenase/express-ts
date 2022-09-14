import 'reflect-metadata';

import { Methods } from './Methods';
import { NextFunction, Request, RequestHandler, Response } from 'express';

import { MetadataKeys } from './MetadataKeys';
import AppRouter from '../../AppRouter';

function bodyValidators(keys: string[]): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            return res.status(422).send('Invalid request');
        }

        for (let key of keys) {
            if (!req.body[key]) {
                return res.status(422).send(`Missing property ${key}`);
            }
        }

        next();
    };
}

export function controller(routePrefix: string) {
    return function (target: Function) {
        const router = AppRouter.getInstance();

        for (let key in target.prototype) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(
                MetadataKeys.PATH,
                target.prototype,
                key
            );
            const method: Methods = Reflect.getMetadata(
                MetadataKeys.METHOD,
                target.prototype,
                key
            );
            const middlewares =
                Reflect.getMetadata(
                    MetadataKeys.MIDDLEWARE,
                    target.prototype,
                    key
                ) || [];
            const requiredBodyProps =
                Reflect.getMetadata(
                    MetadataKeys.VALIDATOR,
                    target.prototype,
                    key
                ) || [];

            const validator = bodyValidators(requiredBodyProps);

            if (path) {
                router[method](
                    `${routePrefix}${path}`,
                    ...middlewares,
                    validator,
                    routeHandler
                );
            }
        }
    };
}
