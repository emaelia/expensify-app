import { ExpenseSummary } from '../../components/ExpenseSummary';
import React from 'react';
import { shallow } from 'enzyme';


test('Should render ExpenseSummary correctly with one expense', () => {
	const wrapper = shallow(<ExpenseSummary expenses={1} expenseTotal={399} />);
	expect(wrapper).toMatchSnapshot()
});

test('Should render ExpenseSummary correctly with more than one expense', () => {
	const wrapper = shallow(<ExpenseSummary expenses={23} expenseTotal={213234399} />);
	expect(wrapper).toMatchSnapshot()
});