function order_jobs (jobs) 
{
	if(!jobs)
	{
		return "";
	}
     
	let ordered_list = [];
	let dependency_list = new Map();
	jobs.forEach((value,key) => {

		//check if the job has a dependency already defined
		if(dependency_list.has(key))
		{
			let dependencyIndex = ordered_list.indexOf(dependency_list.get(key));
			ordered_list.splice(dependencyIndex, 0, key);
			return;
		}

		//if there's no value it doesn't have a dependency
		if(!value)
		{
			ordered_list.unshift(key);
			return;
		}

		//if there's a dependency add it to the dependency list with the value and keys switched
		// so we can use has() on the list
		dependency_list.set(value, key);
		ordered_list.push(key);

	});
    
	return ordered_list;
}

module.exports = order_jobs;