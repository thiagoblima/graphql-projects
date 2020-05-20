export interface Channel<T> {
    put(ele: T): Promise<void>;
    pop(): Promise<T | undefined>;
    close(): any;
    closed(): boolean;
}
export declare class UnbufferredChannel<T> implements Channel<T> {
    private _closed;
    private popActions;
    putActions: Array<{
        resolver: Function;
        ele: T;
    }>;
    readyListener: {
        resolve: Function;
        i: number;
    }[];
    put(ele: T): Promise<void>;
    ready(i: number): Promise<number>;
    pop(): Promise<T | undefined>;
    next(): Promise<{
        value: T;
        done: false;
    } | {
        value: undefined;
        done: true;
    }> | {
        value: undefined;
        done: true;
    };
    close(): Promise<void>;
    closed(): boolean;
    [Symbol.asyncIterator](): AsyncGenerator<T | undefined, undefined, unknown>;
}
export declare function chan<T>(): UnbufferredChannel<T>;
interface onSelect<T> {
    (ele: T | undefined): Promise<any>;
}
interface DefaultCase<T> {
    (): Promise<T>;
}
export declare function select<T>(channels: [UnbufferredChannel<T>, onSelect<T>][], defaultCase?: DefaultCase<T>): Promise<any>;
export {};
