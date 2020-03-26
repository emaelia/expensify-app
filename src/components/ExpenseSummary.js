import React from 'react';
import { connect } from 'react-redux';
import selectExpensesTotal from '../selectors/expenses-total';
import getVisibleExpenses from '../selectors/expenses';
import ExpenseListItem from './ExpenseListItem';
import numeral from 'numeral';

export const ExpenseSummary = (props) => (
	<div>
			{
			props.expenses.length === 0 ? (
					<p>Total Pending</p>
				) : props.expenses === 1 ? (
					<p>Viewing {props.expenses} expense, which totals {numeral( props.expenseTotal / 100 ).format('$0,0.00')}</p>
				) : (
						
					<p>Viewing {props.expenses} expenses, which total {numeral( props.expenseTotal / 100 ).format('$0,0.00')}</p>
				)	
				
		}
	</div>	
);

const mapStateToProps = (state) => {

	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

return {
		expenses: visibleExpenses.length,
		expenseTotal: selectExpensesTotal(visibleExpenses)
	}	
};


export default connect(mapStateToProps)(ExpenseSummary);
