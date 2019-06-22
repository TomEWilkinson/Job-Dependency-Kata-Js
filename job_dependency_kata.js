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

		if(value == key)
		{
			throw new Error("jobs cannot be dependent on themselves");
		}

		if(value)
		{
			//if there's a dependency add it to the dependency list with the value and keys switched
			// so we can use has() on the list
			dependencyList.set(value, key);
			
			//if the key is already in the dependency list there's a possibility for circular dependencies
			if(dependencyList.has(key))
			{
				circleDependencyCheck(dependencyList, dependencyList.get(key), key);
			}
		}

		//check if the job has a dependency already defined
		if(dependencyList.has(key))
		{
			let dependencyIndex = orderedList.indexOf(dependencyList.get(key));
			orderedList.splice(dependencyIndex, 0, key);
			return;
		}

		//Push to account for when a dependency has already been added
		orderedList.push(key);

	});
    
	return orderedList;
}

function circleDependencyCheck(dependencyList,nextKey,originalKey )
{
	//if the orginal key equals the next one we have a circle dependency
	if(originalKey == dependencyList.get(nextKey))
	{
		throw new Error("jobs cannot be dependent on themselves");
	}

	//if it's not undeifned the chain continues
	if(dependencyList.get(nextKey) != undefined)
	{
		circleDependencyCheck(dependencyList, dependencyList.get(nextKey), originalKey);
	} else {
		return false;
	}
}

module.exports = orderJobs;