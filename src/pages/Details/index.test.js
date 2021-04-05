import React from 'react';
import Detail from './index';
import renderer from 'react-test-renderer';

jest
  .mock('../../components/VirtualTable', () => 'VirtualTable')
  .mock('umi', () => ({
    connect: jest.fn(),
  }))



describe('<Detail />', () => {
  it('render <Detail />', () => {
    const tree = renderer.create(<Detail />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
