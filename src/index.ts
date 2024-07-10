type anyObj = { [key: string]: any };

type Options<T extends anyObj> = {
	key: string,
	prototype: T,
	environment?: NodeJS.ProcessEnv,
}

function isObject(item: any): item is anyObj {
	return item && typeof item === "object" && !Array.isArray(item);
}

function mergeDeep<T extends anyObj>(target: T, source: T, overwrite: boolean = true): T {
	for (const key in source) {
		if (Object.hasOwn(source, key)) {
			if (
				isObject(source[key])
				&& key in target
				&& isObject(target[key])
			) mergeDeep(target[key], source[key], overwrite);
			else if (overwrite || !(key in target))
				target[key] = source[key];
		}
	}
	return target;
}

function create<T extends anyObj>(options: Options<T>): T | undefined {
	const { key, prototype } = options;
	const env = options.environment || process.env;
	const JSONString = env[key];
	if (!JSONString) return void console.warn(`No configuration environment variable "${key}" found.`);

	try {
		const parsedValue: T = JSON.parse(JSONString);

		return mergeDeep({ ...prototype }, parsedValue, true);
	} catch (error) {
		console.error(`Error parsing JSON string from environment[${key}]:`, error);
	}
}

export { create };
