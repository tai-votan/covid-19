import React from 'react';
import Detail from './index';
import renderer from 'react-test-renderer';

jest.mock('../../components/VirtualTable', () => 'VirtualTable')

describe('<Detail />', () => {
  it('render <Detail />', () => {
    const tree = renderer.create(<Detail />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
