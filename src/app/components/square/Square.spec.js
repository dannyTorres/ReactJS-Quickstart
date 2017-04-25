import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Square from './square';

describe('Square component', () => {
  it('should render default text', () => {
    const square = TestUtils.renderIntoDocument(<Square/>);
    const h2 = TestUtils.findRenderedDOMComponentWithTag(square, 'h2');
    expect(h2.textContent).toEqual('My brand new component!');
  });
});
