const order_jobs = require("./job_dependency_kata");

test("Passing an empty string of jobs returns an empty list", () =>{
	expect(order_jobs("")).toBe("");
});

test("Passing an map of one job with no dependcies returns that job", () =>{
	var jobs = new Map();
	jobs.set("a", "");
	expect(order_jobs(jobs)).toStrictEqual(["a"]);
});

test("Passing an map of three jobs with no dependcies returns those jobs in any order", () =>{
	var jobs = new Map();
	jobs.set("a", "");
	jobs.set("b", "");
	jobs.set("c", "");
	expect(order_jobs(jobs)).toContain("a");
	expect(order_jobs(jobs)).toContain("b");
	expect(order_jobs(jobs)).toContain("c");
});

test("Passing an map of three jobs with dependcies returns those jobs where c before b", () =>{
	var jobs = new Map();
	jobs.set("a", "");
	jobs.set("b", "c");
	jobs.set("c", "");

	var ordered_jobs = order_jobs(jobs);
	expect(ordered_jobs.indexOf("c") < ordered_jobs.indexOf("b")).toBeTruthy();
});
