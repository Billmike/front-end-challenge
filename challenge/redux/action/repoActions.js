const SORT_REPOS = 'SORT_REPOS';
const SORT_BY_NAME = 'SORT_BY_NAME';
const SORT_BY_PUSHEDAT = 'SORT_BY_PUSHEDAT';
const SORT_BY_STAR_GAZERS = 'SORT_BY_STAR_GAZERS';
const ADD_REPO = 'ADD_REPO';
const REMOVE_REPO = 'REMOVE_REPO';

export default sortRepos = (value) => {
  return (dispatch) => {
    dispatch({ type: SORT_REPOS, value })
  }
}

export const sortByName = (value) => {
  return (dispatch) => {
    dispatch({ type: SORT_BY_NAME, value })
  }
}

export const pushedAt = (value) => {
  return (dispatch) => {
    dispatch({ type: SORT_BY_PUSHEDAT, value })
  }
}

export const starGazers = (value) => {
  return (dispatch) => {
    dispatch({ type: SORT_BY_STAR_GAZERS, value })
  }
}

export const addRepo = (value) => {
  return (dispatch) => {
    dispatch({ type: ADD_REPO, value })
  }
}

export const removeRepo = (value) => {
  return (dispatch) => {
    dispatch({ type: REMOVE_REPO, value })
  }
}
