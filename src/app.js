import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter.js';
import configureStore from './store/configureStore.js';
import getVisibleExpenses from './selectors/expenses';
import { addExpense } from './actions/expenses';
import { 	setTextFilter	} from './actions/filters';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

//add two expenses
//set a text filter
//use get visible expenses

store.dispatch(addExpense({description: 'Water bill', amount: 100, createdAt: 1000}));
store.dispatch(addExpense({description: 'Electric bill', amount: 400, createdAt: 2500}));
store.dispatch(addExpense({description: 'Rent', amount: 4000, createdAt: 3000}));
store.dispatch(addExpense({description: 'Groceries', amount: 2900, createdAt: 4590}));




const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);


const jsx = (
		<Provider store={store} >
			<AppRouter />
		 </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));


