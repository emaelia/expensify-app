import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
		startAddExpense, 
		addExpense,
		editExpense, 
		removeExpense, 
		setExpenses, 
		startSetExpenses 
	} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../Firebase/firebase';

const createMockStore = configureMockStore([thunk]);


beforeEach(() => {
	const expensesData = {};
	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expensesData[id] = { description, note, amount, createdAt };
	});
	database.ref('expenses').set(expensesData).then((done) => done());
	
});


test('Should setup remove expense action object', () => {
	const action = removeExpense({ id: '123abc' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	});
});

test('Should setup edit expense action object', () => {
	const action = editExpense( '123abc', {note: 'New Note'} );
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
		updates: {note: 'New Note'}
	});

});

test('Should setup add expense action object w provided values', () => {
	const action = addExpense(expenses[2]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[2]
	});
});


test('Should add expense to database and store', () => {
	const store = createMockStore({});
	const expenseData = {
		description: 'banana',
		amount: 350,
		note: 'Potassium!',
		createdAt: 1000
	};

	store.dispatch(startAddExpense(expenseData)).then((done) => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		});
	
		return database.ref(`expenses/${actions[0].expense.id}`).once('value');
		}).then((snapshot) => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
		});

}, 10000);


test('Should add expense w defaults to database and store', () => {
	const store = createMockStore({});
	const expenseDefaults = {
			description: '',
			note: '', 
			amount: 0, 
			createdAt: 0
	};

	store.dispatch(startAddExpense({})).then((done) => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseDefaults
			}
		});
	
		return database.ref(`expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
			expect(snapshot.val()).toEqual(expenseDefaults);
			done();
		});
});

test('Should setup set expense action obj w data', () => {
	const action = setExpenses(expenses);
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	})
});

test('Should fetch expenses from firebase', () => {
	const store = createMockStore({});
	store.dispatch(startSetExpenses()).then((done) => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		});
		done();
	});
});