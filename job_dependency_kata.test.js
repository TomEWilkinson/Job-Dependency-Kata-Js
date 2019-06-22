const order_jobs = require("./job_dependency_kata");

test("Passing an empty string of jobs returns an empty list", () =>{
	expect(order_jobs("")).toBe("");
});

test("Passing an empty string of jobs returns an empty list", () =>{
	var jobs = new Map();
	jobs.set("a", "");
	expect(order_jobs(jobs)).toBe(["a"]);
});