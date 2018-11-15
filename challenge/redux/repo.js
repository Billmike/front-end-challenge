import * as data from '../data.json';

export const defaultState = {
  data: data.data.repositories
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'SORT_REPOS':
      return {
        ...state,
        data: [...state.data.sort((a, b) => {
              return b.forkCount - a.forkCount;
          })
        ]
      }
    case 'SORT_BY_NAME':
      return {
        ...state,
        data: [...state.data.sort((a, b) => {
            let nameA;
            let nameB;
            if (a.name) {
              nameA = a.name.toLowerCase();
            }
            if (b.name) {
              nameB = b.name.toLowerCase();
            }
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          })
        ]
      }
    case 'SORT_BY_PUSHEDAT':
      return {
        ...state,
        data: [...state.data.sort((a, b) => {
          if (a.pushedAt < b.pushedAt) {
            return -1;
          }
          if (a.pushedAt > b.pushedAt) {
            return 1;
          }
          return 0;
        })]
      }
    case 'SORT_BY_STAR_GAZERS':
      return {
        ...state,
        data: [...state.data.sort((a, b) => {
          return a.stargazers.totalCount - b.stargazers.totalCount
        })]
      }
    case 'ADD_REPO':
      return {
        ...state,
        data: [...state.data, action.value]
      }
    case 'REMOVE_REPO':
      return {
        ...state,
        data: [...state.data.filter((repo, i) => {
          return i !== action.value
        })]
      }
    default:
      return state;
  }
}