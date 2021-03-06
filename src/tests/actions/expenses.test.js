import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
		startAddExpense, 
		addExpense,
		editExpense, 
		removeExpense, 
		setExpenses, 
		startSetExpenses, 
		startRemoveExpense,
		startEditExpense
	} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import users from '../fixtures/auth';
import database from '../../Firebase/firebase';

const uid = users[2].uid;
const defaultAuthState = { auth: {uid} };
const createMockStore = configureMockStore([thunk]);


beforeEach(() => {
	const expensesData = {};
	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expensesData[id] = { description, note, amount, createdAt };
	});
	database.ref(`users/${uid}/expenses`).set(expensesData).then((done) => done());
	
});


test('Should setup remove expense action object', () => {
	const action = removeExpense({ id: '123abc' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	});
});

test('Should remove expense from firebase', () => {
	const store = createMockStore(defaultAuthState);
	const id = expenses[2].id;
	store.dispatch(startRemoveExpense({ id })).then((done) => {
		const actions = store.getActions();
		expect(actions[0].toEqual({
			type: 'REMOVE_EXPENSE',
			id
		}));
		return database.ref(`users/${uid}/expenses/${id}`).once('value');
	
	}).then((snapshot) => {
		expect(snapshot.val()).toBeFalsy();
		done();
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

test('Should edit expense from firebase', () => {
	const store = createMockStore(defaultAuthState);
	const id = expenses[0].id;
	const updates = {amount: 21045};
	store.dispatch(startEditExpense(id, updates)).then((done) => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'EDIT_EXPENSE',
			id,
			updates
		});
		return database.ref(`users/${uid}/expenses/${id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val().amount).toBe(updates.amount);
		done();

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
	const store = createMockStore(defaultAuthState);
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
	
		return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
		}).then((snapshot) => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
		});

}, 10000);


test('Should add expense w defaults to database and store', () => {
	const store = createMockStore(defaultAuthState);
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
	
		return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
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
	const store = createMockStore(defaultAuthState);
	store.dispatch(startSetExpenses()).then((done) => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		});
		done();
	});
});
