//Array Desctructuring
/*const address = ['Calle Fanjul 111', 'Madrid', 'Madrid','28044'];

const [, city = 'Barcelona', region] = address;

console.log(`You are in ${city}`)*/

const item = ['coffee (hot)', '2.00', '2.50', '3.00'];

const [coffee, , medium] = item;

console.log(`A medium ${coffee} is ${medium} `)




/*console.log('deee');



//Object Destructuring
const person = {
	name: 'Emmy',
	age: 29,
	location: {
		city: 'Madrid',
		temp: 11
	}
};

const { name: userName = 'User', age } = person;

console.log(`${userName} is ${age}`)

const { city, temp: tiempo } = person.location;

if(city && tiempo) {
console.log(`It's ${tiempo} in ${city}`)
}*/

const book = {
	title: 'The Secret School',
	author: 'Avi',
	publisher: {
		name: 'Penguin'
	}
};

const { name: publisherName = 'Self-Published' } = book.publisher;


console.log(publisherName);