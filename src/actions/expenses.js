import uuid from 'uuid';
import database from '../Firebase/firebase';

//ADD_EXPENSE action generator
export const addExpense = (expense) => ({
	type: 'ADD_EXPENSE',
	expense
});

export const startAddExpense = (expenseData = {} ) => {
	return (dispatch) => {
		const {
			description = '',
			note = '',
			createdAt = 0, 
			amount = 0
			
		} = expenseData;

		const expense = { description, note, amount, createdAt };

		return database.ref('expenses').push(expense).then((ref) => {
			dispatch(addExpense({
				id: ref.key,
				...expense
			}));
		});
	};
};

//REMOVE_EXPENSE action generator

export const removeExpense = ( { id } = {} ) => ( 
	{
		type: 'REMOVE_EXPENSE',
		id
});

export const startRemoveExpense = ( { id } = {} ) => {
	return (dispatch) => {
		
	return 	database.ref(`expenses/${id}`).remove().then(() => {
			dispatch(removeExpense({ id }))
		});
	};
};

// return firebase.database().ref('items').child('ITEM_KEY').remove();
//Create new action -removes expense by id
//test startremoveexpense 'should remove expenses from firebase'
//use startremoveexpense in editexpensepage (instead of removeexpense)
//adjust editexpensepage tests

//EDIT_EXPENSE 
export const editExpense = ((id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
}));

// SET_EXPENSES
export const setExpenses = (expenses) => ({ 
	type: 'SET_EXPENSES',
	expenses
});


export const startSetExpenses = () => {
	return (dispatch) => {
	
		return database.ref('expenses').once('value').then((snapshot) => {
			const expenses = [];
			snapshot.forEach((childSnap) => {
				expenses.push({
					id: childSnap.key,
					...childSnap.val()
				});
			});
			dispatch(setExpenses(expenses));
		});	
	};
};

