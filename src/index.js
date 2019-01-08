import React from 'react';
import { render } from 'react-dom';
import Counter from './Counter';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const colors = {
  BLUE: 'blue',
  GREEN: 'green',
  TRANSPARENT: 'transparent',
};

const initialState = {
  count: 0,
  currentColor: colors.TRANSPARENT,
  cycleableHistory: [],
  cycleCounter: -1,
  isCircle: false,
  isCycling: false,
};

function isPrime(num) {
  if (num <= 1) {
    return false;
  }

  const limit = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= limit; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

function getColor(count) {
  // Blue is my favorite color, so it takes precedence over green
  // in case of conflict
  if (isPrime(count)) {
    return colors.BLUE;
  } else if (count % 5 === 3) {
    return colors.GREEN;
  }

  return colors.TRANSPARENT;
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'CYCLE_COLORS':
      const newCycleCounter = state.cycleCounter + 1;

      if (newCycleCounter >= state.cycleableHistory.length) {
        return {
          ...state,
          isCycling: false,
          cycleCounter: -1,
        }
      }

      return {
        ...state,
        cycleCounter: newCycleCounter,
        isCycling: true,
      }
    case 'INCREMENT':
      if (state.count === 100) {
        return state;
      }

      const newHistory = state.cycleableHistory.slice();
      const newCount = state.count + 1;
      const newColor = getColor(newCount);
      const isCircle = newCount > 0 && newCount % 10 === 0;
      
      if (newColor !== colors.TRANSPARENT) {
        newHistory.push(newColor)
      }

      return {
        ...state,
        count: newCount,
        cycleableHistory: newHistory,
        currentColor: newColor,
        isCircle,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <Counter/>
  </Provider>
);

render(<App />, document.getElementById('root'));

