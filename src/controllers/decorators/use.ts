import 'reflect-metadata';
import { RequestHandler } from 'express';

import { MetadataKeys } from './MetadataKeys';

export function use(middleware: RequestHandler) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        console.log('use decorator');

        const middlewaresArray =
            Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target, key) || [];

        console.log(middleware);

        console.log(middlewaresArray);

        console.log([...middlewaresArray, middleware]);

        Reflect.defineMetadata(
            MetadataKeys.MIDDLEWARE,
            [...middlewaresArray, middleware],
            target
        );
    };
}
