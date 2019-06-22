function orderJobs (jobs) 
{
	//to account for a empty job list
	if(!jobs)
	{
		return "";
	}
     
	let orderedList = [];
	let dependencyList = new Map();
	jobs.forEach((value,key) => {

		//check if the job has a dependency already defined
		if(dependencyList.has(key))
		{
			let dependencyIndex = orderedList.indexOf(dependencyList.get(key));
			orderedList.splice(dependencyIndex, 0, key);
			return;
		}

		//if there's no value it doesn't have a dependency
		if(!value)
		{
			orderedList.unshift(key);
			return;
		}

		//if there's a dependency add it to the dependency list with the value and keys switched
		// so we can use has() on the list
		dependencyList.set(value, key);

		//Push to account for when a dependency has already been added
		orderedList.push(key);

	});
    
	return orderedList;
}

module.exports = orderJobs;