function order_jobs (jobs) 
{
	if(!jobs)
	{
		return "";
	}
     
	let ordered_list = [];
	jobs.forEach((value,key) => {
		ordered_list.unshift(key);
	});
    
	return ordered_list;
}

module.exports = order_jobs;