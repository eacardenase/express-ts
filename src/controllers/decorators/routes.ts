import 'reflect-metadata';
import { RequestHandler } from 'express';

import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

interface RouteHandlerDescriptor extends PropertyDescriptor {
    value?: RequestHandler;
}

function routeBinder(methodName: string) {
    return function (path: string) {
        return function (
            target: any,
            key: string,
            desc: RouteHandlerDescriptor
        ) {
            Reflect.defineMetadata(MetadataKeys.PATH, path, target, key);
            Reflect.defineMetadata(
                MetadataKeys.METHOD,
                methodName,
                target,
                key
            );
        };
    };
}

export const get = routeBinder(Methods.GET);
export const post = routeBinder(Methods.POST);
export const patch = routeBinder(Methods.PATCH);
export const put = routeBinder(Methods.PUT);
export const del = routeBinder(Methods.DELETE);
