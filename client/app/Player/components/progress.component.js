import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


/**
 * Progress - Create Progress component class
 * @extends PureComponent
 */
class Progress extends PureComponent {
  /**
   * render - Render the component
   *
   * @return {ReactComponent} Return the rendered component
   */
  render() {
    return (
      <div className="progress">
        <span className="player__time-elapsed">{this.props.elapsed}</span>
        <progress
          value={this.props.position}
          max="1"
        />
        <span className="player__time-total">{this.props.total}</span>
      </div>
    );
  }
}

Progress.propTypes = {
  elapsed: PropTypes.string,
  position: PropTypes.number,
  total: PropTypes.string,
};

Progress.defaultProps = {
  elapsed: null,
  position: null,
  total: null,
};

// Export Progress
export default Progress;
