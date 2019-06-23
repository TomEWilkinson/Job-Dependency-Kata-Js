/**
 * takes in a list of jobs with their depencies and returns an ordered list of those jobs
 * 
 * @param {Map} jobs
 * @returns {Array}
 */
function orderJobs (jobs) 
{
	//to account for a empty job list
	if(!jobs)
	{
		return [];
	}
     
	let orderedList = [];
	let dependencyList = new Map();
	jobs.forEach((job,dependency) => {

		if(job == dependency)
		{
			throw new Error("jobs cannot be dependend on themselves");
		}

		if(job)
		{
			//if there's a dependency add it to the dependency list with the value and keys switched
			// so we can use has() on the list
			dependencyList.set(job, dependency);
			
			//if the key is already in the dependency list there's a possibility for circular dependencies
			if(dependencyList.has(dependency))
			{
				if(circleDependencyCheck(dependencyList, dependencyList.get(dependency), dependency))
				{
					throw new Error("Circle dependency detected");
				}
			}
		}

		//check if the job has a dependency already defined
		if(dependencyList.has(dependency))
		{
			let dependencyIndex = orderedList.indexOf(dependencyList.get(dependency));
			orderedList.splice(dependencyIndex, 0, dependency);
			return;
		}

		//Push to account for when a dependency has already been added
		orderedList.push(dependency);

	});
    
	return orderedList;
}

/**
 * a Recursive function that checks for a circle dependency
 * 
 * @param {Map} dependencyList 
 * @param {string} nextKey 
 * @param {string} originalKey 
 * @returns {boolean}
 */
function circleDependencyCheck(dependencyList,nextKey,originalKey)
{
	//if the orginal key equals the next one we have a circle dependency
	if(originalKey === dependencyList.get(nextKey))
	{
		return true;
	}

	//if it's not undeifned the chain continues
	if(dependencyList.get(nextKey) != undefined)
	{
		return circleDependencyCheck(dependencyList, dependencyList.get(nextKey), originalKey);
	}

	return false;
	

}

module.exports = orderJobs;