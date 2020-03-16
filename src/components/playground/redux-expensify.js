import { createStore, combineReducers }  from 'redux';
import uuid from 'uuid';

//ADD_EXPENSE action generator
const addExpense = (
		{ 
			description = '',
			note = '', 
			amount = 0, 
			createdAt = 0
		} = {}
	) => ({
	type: 'ADD_EXPENSE',
	expense: {
		id: uuid(),
		description,
		note,
		amount,
		createdAt
	}
});

//REMOVE_EXPENSE action generator

const removeExpense = ( { id } = {} ) => ( 
	{
		type: 'REMOVE_EXPENSE',
		id
});

//EDIT_EXPENSE 
const editExpense = ((id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
}));

//SET_TEXT_FILTER

const setTextFilter = (( text = '' ) => ({
	type: 'SET_TEXT_FILTER',
	text
}));

//SORT_BY_DATE

const sortByDate = (sortBy = 'date') => ({
	type: 'SORT_BY_DATE',
	sortBy
});

//SORT_BY_AMOUNT
const sortByAmount = (sortBy = 'amount') => ({
	type: 'SORT_BY_AMOUNT',
	sortBy
});

//SET_START_DATE
const setStartDate = (startDate = undefined) => ({
	type: 'SET_START_DATE',
	startDate
});

//SET_END_DATE
const setEndDate = (endDate = undefined) => ({
	type: 'SET_END_DATE',
	endDate
});

//Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action ) => {

	switch(action.type){
		case 'ADD_EXPENSE':
			return [
				...state,
				action.expense
			];
		case 'REMOVE_EXPENSE':
	 		return state.filter(( {id} ) =>  id !== action.id	)
	 	;
	 	case 'EDIT_EXPENSE':
	 		return state.map((expense) => {
	 			if (expense.id === action.id) {
	 				return {
	 					...expense,
	 					...action.updates
	 				}
	 			} else {
	 				return expense;
	 			}
	 		})
	 	;
		default:
			return state;
	}

};


//Filters Reducer
const filtersReducerDefaultState = {
	text: '',
	sortBy: 'date',
	startDate: undefined,
	endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
	switch(action.type) {
		case 'SET_TEXT_FILTER':
			return {
				...state,
				text: action.text
			}
		;
		case 'SORT_BY_DATE':
			return {
				...state,
				sortBy: action.sortBy
			}
		;
		case 'SORT_BY_AMOUNT':
			return {
				...state,
				sortBy: action.sortBy
			}
		;
		case 'SET_START_DATE':
			return {
				...state,
				startDate: action.startDate
			}
		;
		case 'SET_END_DATE':
			return {
				...state,
				endDate: action.endDate
			}
		;
		default:
		return state;
	}
};

//Get visible expense
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate } ) => {
	return expenses.filter((expense) => {
		const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate ;
		const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
		const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
		return startDateMatch && endDateMatch && textMatch;
	}).sort((a, b) => {
		if(sortBy === 'date') {
			return a.createdAt < b.createdAt ? 1 : -1;
		}
		if(sortBy === 'amount') {
			return a.amount < b.amount ? 1 : -1;
		}
		
	})
};

// Store Creation (Combined Reducers)

const store =createStore(
	combineReducers({
		expenses: expensesReducer,
		filters: filtersReducer
	})
);

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description: 'reNteD', amount: 100, createdAt: 1000}));
const expenseTwo = store.dispatch(addExpense({description: 'Food', amount: 1000, createdAt: -1000}));
const expenseThree = store.dispatch(addExpense({description: 'bananas', amount: 510, createdAt: -100}));


store.dispatch(sortByDate());
/*store.dispatch(removeExpense({ id: expenseOne.expense.id }));

store.dispatch(editExpense( expenseTwo.expense.id, { amount: 900 } ));

store.dispatch(setTextFilter('rent'));

store.dispatch(setTextFilter(''));

store.dispatch(sortByAmount());

store.dispatch(sortByDate());

store.dispatch(setStartDate(125));
store.dispatch(setStartDate());
store.dispatch(setEndDate(1220));*/

const demoState = {
	expenses: [{
		id: 'srert',
		description: 'Jan rent',
		note: 'a note about my rents',
		amount: 5500,
		createdAt: 0
	}],
	filters: {
		text: 'rent',
		sortBy: 'amount', //date, amount, etc
		startDate: undefined,
		endDate: undefined
	}
};


