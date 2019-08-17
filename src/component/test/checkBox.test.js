import React from 'react';
import { shallow } from 'enzyme';
import CheckBox from '../checkBox';

describe('<CheckBox />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<CheckBox />);
    expect(wrapper).toMatchSnapshot();
  });
});