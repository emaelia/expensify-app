import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {} ) => ({
		type: 'INCREMENT',
		incrementBy
});

const decrementCount = ({ decrementBy = 1 }  = {} ) => ({
	type: 'DECREMENT',
	decrementBy
});

const resetCount = () => ({
	type: 'RESET'
});

const setCount = ({ count }  = {} ) => ({
	type: 'SET',
	count
});


//Reducers



const countReducer = ( (state = { count: 0 }, action )=> {
	
	switch (action.type) {
		case 'INCREMENT': 
			return {
				count: state.count + action.incrementBy
			};
		case 'DECREMENT':
			return {
				count: state.count - action.decrementBy
			};
		case 'RESET':
		return {
			count: 0
		};
		case 'SET':
			return {
				count: action.count
			}
		;
		default:
			return state;
	}
	
})


const store = createStore(countReducer);

const unsubrscribe = store.subscribe(() => {
	console.log(store.getState());
		
	});

store.dispatch(incrementCount( { incrementBy: 10 } ));
store.dispatch(incrementCount( { } ));

store.dispatch(decrementCount({ decrementBy: 4 }));
store.dispatch(decrementCount({}));


store.dispatch(resetCount());

store.dispatch(setCount());
store.dispatch(setCount({ count: 40 }));

