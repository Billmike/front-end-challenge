import React from 'react';
import RepoDetails from './';

import renderer from 'react-test-renderer';

const props = [{
  name: 'James',
  description: 'A short repo',
  owner: {
    login: 'lambda',
    avatarUrl: 'https://dummyavatarurl'
  },
  pushedAt: '26-dec-2018',
  forkCount: 89,
  primaryLanguage: {
    color: '#FFF'
  },
  stargazers: {
    totalCount: 0
  }
}]
it('renders correctly', () => {
  const rendered = renderer.create(<RepoDetails repository={props} />).toJSON();
  expect(rendered).toMatchSnapshot()
})