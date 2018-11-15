import React from 'react';
import { Main } from './';
import renderer from 'react-test-renderer';

it('should mount properly', () => {
  const rendered = renderer.create(<Main />).toJSON();
  expect(rendered).toMatchSnapshot();
});
