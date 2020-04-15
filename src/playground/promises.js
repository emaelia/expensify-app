const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve({
			bananas: 'Banana resolved.',
			apples: 'Apples resolved.'
		});
		//reject('There are no bananas.')
	}, 5000);

});

console.log('Before Bananas.');

promise.then((data) => {
	console.log('1', data);

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('This is bananas');
		}, 5000);
	});
	}).then((str) => {
		console.log('Are we bananas?',str);
	}).catch((error) => {
		console.log('error: ', error);
	});

console.log('After bananas.');