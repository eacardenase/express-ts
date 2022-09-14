import 'reflect-metadata';

import { Methods } from './Methods';

function routeBinder(methodName: string) {
    return function (path: string) {
        return function (target: any, key: string, desc: PropertyDescriptor) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', methodName, target, key);
        };
    };
}

export const get = routeBinder(Methods.GET);
export const post = routeBinder(Methods.POST);
export const patch = routeBinder(Methods.PATCH);
export const put = routeBinder(Methods.PUT);
export const del = routeBinder(Methods.DELETE);
