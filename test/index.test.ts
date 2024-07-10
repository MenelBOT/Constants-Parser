import { create } from "../src/index";

test("merger", () => {
	const key = "CONFIG";
	const prototype = { a: 1, b: { c: 3 } };
	const environment = {
		CONFIG: "{\"a\": 10, \"b\": {\"c\": 30, \"e\": 50}}"
	} as NodeJS.ProcessEnv;

	const target = create({ key, prototype, environment });

	expect(target).toEqual({ a: 10, b: { c: 30, e: 50 } });
});
