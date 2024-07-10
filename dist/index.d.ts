type anyObj = {
    [key: string]: any;
};
type Options<T extends anyObj> = {
    key: string;
    prototype: T;
    environment?: NodeJS.ProcessEnv;
};
declare function create<T extends anyObj>(options: Options<T>): T | undefined;
export { create };
