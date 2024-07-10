function isObject(item) {
    return item && typeof item === "object" && !Array.isArray(item);
}
function mergeDeep(target, source, overwrite = true) {
    for (const key in source) {
        if (Object.hasOwn(source, key)) {
            if (isObject(source[key])
                && key in target
                && isObject(target[key]))
                mergeDeep(target[key], source[key], overwrite);
            else if (overwrite || !(key in target))
                target[key] = source[key];
        }
    }
    return target;
}
function create(options) {
    const { key, prototype } = options;
    const env = options.environment || process.env;
    const JSONString = env[key];
    if (!JSONString)
        return void console.warn(`No configuration environment variable "${key}" found.`);
    try {
        const parsedValue = JSON.parse(JSONString);
        return mergeDeep({ ...prototype }, parsedValue, true);
    }
    catch (error) {
        console.error(`Error parsing JSON string from environment[${key}]:`, error);
    }
}
export { create };
