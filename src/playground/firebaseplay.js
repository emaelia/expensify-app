import * as firebase from 'firebase';

  const firebaseConfig = {
    apiKey: "AIzaSyCddk_RTL_C4KtU1MBXKFJzqpWjEhAU0O4",
    authDomain: "ernexpensify.firebaseapp.com",
    databaseURL: "https://ernexpensify.firebaseio.com",
    projectId: "ernexpensify",
    storageBucket: "ernexpensify.appspot.com",
    messagingSenderId: "480553627314",
    appId: "1:480553627314:web:51c3a2d96a1b139cfb23ab",
    measurementId: "G-47BHV5GEST"
  };

  firebase.initializeApp(firebaseConfig);

  const database = firebase.database()


  const expenses = [{
    description: 'Rent',
    amount: 222.90,
    note: 'April Rent',
    createdAt: 'March 31'
  },
  {
    description: 'Gas',
    amount: 52.70,
    note: 'Winter gas',
    createdAt: 'March 19'
  },
  {
    description: 'Groceries',
    amount: 84.90,
    note: 'Saveless',
    createdAt: 'March 14'
  }];

database.ref('expenses').on('child_removed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

database.ref('expenses').on('child_changed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

database.ref('expenses').on('child_added', (snapshot) =>{
  console.log(snapshot.key, snapshot.val());
});

 database.ref('expenses').push(expenses[2]);

 /*database.ref('expenses')
  .once('value')
  .then((snapshot) => {
    const myExpenses = [];
    snapshot.forEach((childSnap) => {
      myExpenses.push({
        id: childSnap.key,
        ...childSnap.val()
      });
    });

    console.log(myExpenses);
  });*/

/*database.ref('expenses')
  .on('value', (snapshot) => {
    const myExpenses = [];

    snapshot.forEach((childSnap) => {
      myExpenses.push({
        id: childSnap.key,
        ...childSnap.val()
      });
    });

    console.log(myExpenses);

  }, (e) => {
    console.log('Error with data fetching', e);
  });

database.ref('expenses/-M3g69dladf9PnmnuwVK').update({
  'amount': 350,
  'description': 'rent: new flat'
});*/



 const myDesc = database.ref().on('value', (snapshot) => {
  const desci = snapshot.val();
 	console.log(`${desci.name} is a ${desci.job.title} at ${desci.job.company}.`)
 }, (e) => {
 	console.log('Error', e);
 });

 setTimeout(() => {
    database.ref().update({
  'job/title': 'Full-Stack Developer',
  'job/company': 'Microsoft'
});
  }, 3500);

 /*const onValueChange = database.ref().on('value', (snapshot) => {
  	console.log(snapshot.val());
  }, (e) => {
  	console.log('Error with data fetching', e);
  });

  setTimeout(() => {
  	database.ref('age').set(20)
  }, 3500);

  setTimeout(() => {
  	database.ref().off(onValueChange);
  }, 7000);

setTimeout(() => {
  	database.ref('age').set(32)
  }, 10500);*/


  /*database.ref('location')
  	.once('value')
  	.then((snapshot) => {
  		const val = snapshot.val();
  		console.log(val);
  	})
  	.catch((e) =>{
  		console.log('Error fetching data', e);
  	});*/

 /* database.ref().set({
  	name: 'Emmy Norman',
  	age: 29,
  	stressLevel: 5,
  	job: {
  		title: 'Front End Developer',
  		company: 'SoftyWare-ers'
  	},
  	favorites: {
  		color: 'Orange, like the sunset',
  		fruit: 'Apples'
  	},
  	location: {
  		city: 'Madrid',
  		country: 'Spain'
  	}
  }).then(() => {
  	console.log('Data is saved!');
  }).catch((e) => {
  		console.log('This has failed', e);
  });


database.ref().update({
	stressLevel: 9,
	'job/company': 'Amazon',
	'location/city': 'Seattle',
	'location/country': 'USA'
});*/

  /*database.ref()
  	.remove()
  	.then(() => {
	  	console.log('Remove succeeded.');
	  })
  	.catch((e) => {
	  	console.log('Remove failed', e)
	  });*/



  /*database.ref('notes').push({
    title: 'to learn',
    body: 'firebase, promises',
  });
*/


/* const myDesc = database.ref().on('value', (snapshot) => {
  const desci = snapshot.val();
  console.log(`${desci.name} is a ${desci.job.title} at ${desci.job.company}.`)
 }, (e) => {
  console.log('Error', e);
 });

 setTimeout(() => {
    database.ref().update({
  'job/title': 'Full-Stack Developer',
  'job/company': 'Microsoft'
});
  }, 3500);*/

 /*const onValueChange = database.ref().on('value', (snapshot) => {
    console.log(snapshot.val());
  }, (e) => {
    console.log('Error with data fetching', e);
  });

  setTimeout(() => {
    database.ref('age').set(20)
  }, 3500);

  setTimeout(() => {
    database.ref().off(onValueChange);
  }, 7000);

setTimeout(() => {
    database.ref('age').set(32)
  }, 10500);*/


  /*database.ref('location')
    .once('value')
    .then((snapshot) => {
      const val = snapshot.val();
      console.log(val);
    })
    .catch((e) =>{
      console.log('Error fetching data', e);
    });*/

 /* database.ref().set({
    name: 'Emmy Norman',
    age: 29,
    stressLevel: 5,
    job: {
      title: 'Front End Developer',
      company: 'SoftyWare-ers'
    },
    favorites: {
      color: 'Orange, like the sunset',
      fruit: 'Apples'
    },
    location: {
      city: 'Madrid',
      country: 'Spain'
    }
  }).then(() => {
    console.log('Data is saved!');
  }).catch((e) => {
      console.log('This has failed', e);
  });


database.ref().update({
  stressLevel: 9,
  'job/company': 'Amazon',
  'location/city': 'Seattle',
  'location/country': 'USA'
});*/

  /*database.ref()
    .remove()
    .then(() => {
      console.log('Remove succeeded.');
    })
    .catch((e) => {
      console.log('Remove failed', e)
    });*/
