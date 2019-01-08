import classNames from 'classnames';
import React from 'react';
import {connect} from 'react-redux';

class Counter extends React.Component {
  increment = () => {
    this.props.dispatch({ type: 'INCREMENT' });
  }

  cycleColors = () => {
    if (this.props.isCycling) {
      return;
    }

    // create cycle here as creating it in the dispatcher is an anti-pattern
    const cycle = (startCycle = false) => {
      if (startCycle || this.props.isCycling) {
        this.props.dispatch({ type: 'CYCLE_COLORS'});
        setTimeout(cycle, 500);
      } 
    }

    cycle(true);
  }

  render() {
    const {cycleableHistory, cycleCounter, currentColor, isCircle} = this.props;
    return (
      <div className="container">
        <div>
          {/*If I had more time I would separate these buttons
             into different components*/}
          <button 
            className={classNames({
              button: true,
              [currentColor]: true,
              circle: isCircle,
            })}
            onClick={this.increment}
          >
            Click me - {this.props.count}
          </button>
          <button 
            className={classNames({
              button: true,
              [cycleableHistory[cycleCounter]]: true,
            })}
            onClick={this.cycleColors}
          >
            Recap Colors
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cycleableHistory: state.cycleableHistory,
    cycleCounter: state.cycleCounter,
    count: state.count,
    currentColor: state.currentColor,
    isCircle: state.isCircle,
    isCycling: state.isCycling,
  };
}

export default connect(mapStateToProps)(Counter);
