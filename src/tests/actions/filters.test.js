import moment from 'moment';
import { 
		setStartDate, 
		setEndDate, 
		setTextFilter, 
		sortByDate, 
		sortByAmount 
} from '../../actions/filters';


test('Should generate setStartDate action object', () => {
	const action = setStartDate(moment(0));
	expect(action).toEqual({
		type: 'SET_START_DATE',
		startDate: moment(0)
	});
});

test('Should generate setEndDate action object', () => {
	const action = setEndDate(moment(0));
	expect(action).toEqual({
		type: 'SET_END_DATE',
		endDate: moment(0)
	});
});

test('Should generate sortByDate action object', () => {
	expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE'})
});

test('Should generate sortByAmount action object', () => {
	expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT'	});
});

test('Shoulde generate setTextFilter w provided values', () => {
	const textFilter = {text: 'rent'}; //or const could be text
	const action = setTextFilter(textFilter);
	expect(action).toEqual({
		type: 'SET_TEXT_FILTER',
		text: textFilter //if const is text, use shorthand 'text'
	});
});

test('Should generate setTextFilter w default values', () => {
	const action = setTextFilter();
	expect(action).toEqual({
		type: 'SET_TEXT_FILTER',
		text: '' //needs an empty string to work
	});
});