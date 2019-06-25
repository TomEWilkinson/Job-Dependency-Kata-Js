const orderJobs = require("./job_dependency_kata");

test("Passing an empty string of jobs returns an empty list", () =>{
	expect(orderJobs("")).toStrictEqual([]);
});

test("Passing an map of one job with no dependcies returns that job", () =>{
	var jobs = new Map();
	jobs.set("a", "");
	expect(orderJobs(jobs)).toStrictEqual(["a"]);
});

test("Passing an map of three jobs with no dependcies returns those jobs in any order", () =>{
	var jobs = new Map();
	jobs.set("a", "");
	jobs.set("b", "");
	jobs.set("c", "");
	expect(orderJobs(jobs)).toContain("a");
	expect(orderJobs(jobs)).toContain("b");
	expect(orderJobs(jobs)).toContain("c");
});

test("Passing an map of three jobs with dependcies returns those jobs where c before b", () =>{
	var jobs = new Map();
	jobs.set("a", "");
	jobs.set("b", "c");
	jobs.set("c", "");

	var orderedJobs = orderJobs(jobs);
	expect(orderedJobs.indexOf("c") < orderedJobs.indexOf("b")).toBeTruthy();
});


test("Passing an map of multiple jobs with multiple dependcies returns those jobs with the dependencies adhered to", () =>{
	var jobs = new Map();
	jobs.set("a", "");
	jobs.set("b", "c");
	jobs.set("c", "f");
	jobs.set("d", "a");
	jobs.set("e", "b");
	jobs.set("f", "");

	var orderedJobs = orderJobs(jobs);

	expect(orderedJobs.indexOf("f") < orderedJobs.indexOf("c")).toBeTruthy();
	expect(orderedJobs.indexOf("c") < orderedJobs.indexOf("b")).toBeTruthy();
	expect(orderedJobs.indexOf("b") < orderedJobs.indexOf("e")).toBeTruthy();
	expect(orderedJobs.indexOf("a") < orderedJobs.indexOf("d")).toBeTruthy();
});

test("Throw error if job depends on itself", () =>{
	var jobs = new Map();
	jobs.set("a", "");
	jobs.set("b", "");
	jobs.set("c", "c");

	expect(() => {
		orderJobs(jobs);
	}).toThrow(new Error ("jobs cannot be dependend on themselves"));
});

test("Throw error if jobs have circular dependencies", () =>{
	var jobs = new Map();
	jobs.set("a", "");
	jobs.set("b", "c");
	jobs.set("c", "f");
	jobs.set("d", "a");
	jobs.set("e", "");
	jobs.set("f", "b");

	expect(() => {
		orderJobs(jobs);
	}).toThrow(new Error("Circle dependency detected"));
});



