/**
 * takes in a list of jobs with their depencies and returns an ordered list of those jobs
 * 
 * @param {Map} mapJobs
 * @returns {Array}
 */
function orderJobs (mapJobs) 
{
	//to account for a empty job list
	if(!mapJobs)
	{
		return [];
	}
     
	let arrOrderedList = [];
	let mapDependencyList = new Map();
	mapJobs.forEach((strJob, strDependency) => {

		if(strJob == strDependency)
		{
			throw new Error("jobs cannot be dependend on themselves");
		}

		if(strJob)
		{
			//if there's a dependency add it to the dependency list with the value and keys switched
			// so we can use has() on the list
			mapDependencyList.set(strJob, strDependency);
			
			//if the key is already in the dependency list there's a possibility for circular dependencies
			if(mapDependencyList.has(strDependency))
			{
				if(circleDependencyCheck(mapDependencyList, mapDependencyList.get(strDependency), strDependency))
				{
					throw new Error("Circle dependency detected");
				}
			}
		}

		//check if the job has a dependency already defined
		if(mapDependencyList.has(strDependency))
		{
			let inDependencyIndex = arrOrderedList.indexOf(mapDependencyList.get(strDependency));
			arrOrderedList.splice(inDependencyIndex, 0, strDependency);
			return;
		}

		//Push to account for when a dependency has already been added
		arrOrderedList.push(strDependency);

	});
    
	return arrOrderedList;
}

/**
 * a Recursive function that checks for a circle dependency
 * 
 * @param {Map} mapDependencyList map of the dependency list
 * @param {string} strNextKey the next key to be checked
 * @param {string} strOriginalKey the orignal key in the chain
 * @returns {boolean}
 */
function circleDependencyCheck(mapDependencyList,strNextKey,strOriginalKey)
{
	//if the orginal key equals the next one we have a circle dependency
	if(strOriginalKey === mapDependencyList.get(strNextKey))
	{
		return true;
	}

	//if it's not undeifned the chain continues
	if(mapDependencyList.get(strNextKey) != undefined)
	{
		return circleDependencyCheck(mapDependencyList, mapDependencyList.get(strNextKey), strOriginalKey);
	}

	return false;
	

}

module.exports = orderJobs;