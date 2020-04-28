import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpensesTotal from '../selectors/expenses-total';
import getVisibleExpenses from '../selectors/expenses';
import ExpenseListItem from './ExpenseListItem';
import numeral from 'numeral';

export const ExpenseSummary = (props) => {
	const expensesFormattedTotal = numeral( props.expenseTotal / 100 ).format('$0,0.00');
	return (
		<div className="page-header" >
			<div className="content-container">
				{
					props.expenses.length === 0 ? (
							<p className="page-header__title">Total Pending</p>
						) : props.expenses === 1 ? (
							<p className="page-header__title">Viewing <span>{props.expenses}</span> expense, which totals <span>{expensesFormattedTotal}</span></p>
						) : (
								
							<p className="page-header__title">Viewing <span>{props.expenses}</span> expenses, which total <span>{expensesFormattedTotal}</span></p>
						)	
						
				}
				<div className="page-header__actions">
					<Link className="button" to="/create">Add Expense</Link>
				</div>
			</div>
		</div>	
)};

const mapStateToProps = (state) => {

	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

return {
		expenses: visibleExpenses.length,
		expenseTotal: selectExpensesTotal(visibleExpenses)
	}	
};


export default connect(mapStateToProps)(ExpenseSummary);
