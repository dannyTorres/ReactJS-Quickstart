import React from 'react';
import TestUtils from 'react-addons-test-utils';
import App from './app';

describe('App component', () => {
  it('should render default text', () => {
    const app = TestUtils.renderIntoDocument(<App/>);
    const h2 = TestUtils.findRenderedDOMComponentWithTag(app, 'h2');
    expect(h2.textContent).toEqual('My brand new component!');
  });
});
