import React, { Component } from 'react';
import { Search, List as UIList } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { autobind } from 'core-decorators';

import * as PlaylistsListActions from './playlistslist.actions';

// Custom components
import PlaylistItem from './components/playlist.component';

/**
  * PlaylistsList - Display a panel to search and manage playlists
  * @extends Component
  */
@autobind
export class PlaylistsList extends Component {
  handleSearchChange = (e, { value }) => {
    const { dispatch, accessToken } = this.props;
    dispatch(PlaylistsListActions.updateSearch(value, accessToken));
  }

  /**
   * Renders the component to DOM elements
   *
   * @return {ReactComponent} The rendered component
   */
  render() {
    const { dispatch, playlists, currentSearch } = this.props;
    const mapPlaylistToComponent = playlist => (
      <PlaylistItem
        key={playlist.uri}
        playlist={playlist}
        dispatch={dispatch}
      />
    );
    const listPlaylists = playlists.map(mapPlaylistToComponent);
    return (
      <div>
        <Search
          open={false}
          onSearchChange={this.handleSearchChange}
          value={currentSearch}
        />
        <UIList
          divided
          verticalAlign="middle"
        >
          { listPlaylists }
        </UIList>
      </div>
    );
  }
}

PlaylistsList.propTypes = {
  currentSearch: PropTypes.string,
  playlists: PropTypes.instanceOf(List).isRequired,
  dispatch: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired,
};

PlaylistsList.defaultProps = {
  currentSearch: '',
};

const mapStateToProps = state => ({
  currentSearch: state.get('playlistSearch'),
  playlists: state.get('playlistsFound'),
  accessToken: state.get('accessToken'),
});

const mapDispatchToProps = (dispatch) => {
  const customActions = {
    dispatch,
  };

  return Object.assign(customActions, bindActionCreators(PlaylistsListActions, dispatch));
};

export const PlaylistsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistsList);
