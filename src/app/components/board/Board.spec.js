import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Board from './board';

describe('Board component', () => {
  it('should render default text', () => {
    const board = TestUtils.renderIntoDocument(<Board/>);
    const h2 = TestUtils.findRenderedDOMComponentWithTag(board, 'h2');
    expect(h2.textContent).toEqual('My brand new component!');
  });
});
