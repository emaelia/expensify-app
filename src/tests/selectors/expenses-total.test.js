import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('Should return 0 if no expenses', () => {
	const array = [];
	const result = selectExpensesTotal(array);
	expect(result).toBe(0);
});

test('Should correctly add up a single expense', () => {
	const array = [expenses[2]];
	const result = selectExpensesTotal(array);
	expect(result).toBe(5000)
});

test('Should correctly add up multiple expenses', () => {
	const array = expenses;
	const result = selectExpensesTotal(array);
	expect(result).toBe(114695)
})
