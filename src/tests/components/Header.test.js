//react-test-renderer w shallow rendering, checks only given component
import { shallow } from 'enzyme';
import React from 'react';
import Header from '../../components/Header';

test('Should render header correctly', () => {
	const wrapper = shallow(<Header />);
	expect(wrapper).toMatchSnapshot();

	//expect(wrapper.find('h1').text()).toBe('Expensify');
	//const renderer = new reactShallowRenderer();
	//renderer.render(<Header />);
	//Snapshots to track changes of data over time, catches unwanted changes
	//expect(renderer.getRenderOutput()).toMatchSnapshot();
});