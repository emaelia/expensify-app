import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('Should set default state', () => {
	const state = expensesReducer(undefined, { type: '@@INIT'});
	expect(state).toEqual([]);
});

test('Should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[2]]);
});

test('Should not remove expenss if id not found', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '-1'
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test('Should add an expense', () => {
	const expense = {
		id: '4',
		description: 'Bananas',
		note: '',
		amount: 391,
		createdAt: 3000
	};
	const action = {
		type: 'ADD_EXPENSE',
		expense
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, expense]); //spread operater saves the day
});

test('Should edit an expense', () => {
	const amount = 122000;
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[0].id,
		updates: {
			amount
		}
	};
	const state = expensesReducer(expenses, action);
	expect(state[0].amount).toBe(amount)
});

test('Should not edit expense if expense not found', () => {
	const amount = 12200;
	const action = {
		
		type: 'EDIT_EXPENSE',
		id: '-1'
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test('Should set expenses', () => {
	const action = {
		type: 'SET_EXPENSES',
		expenses: [expenses[1]]
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[1]]);
});