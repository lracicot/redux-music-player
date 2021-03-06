import { Map } from 'immutable';
import * as AppActions from './App/actions';
import * as PlayerActions from './Player/actions';
import * as SourceListActions from './SourceList/actions';
import * as PlaylistsListActions from './PlaylistsList/actions';
import * as LayoutActions from './Layout/actions';
import * as LoginActions from './Login/actions';

/**
 * Reducer - Execute an action and return the new state
 *
 * @param {Map} state - Current state of the application
 * @param {ActionCreator} action - The action to execute
 *
 * @return {Map} - The new state of the application
 */
export default function (state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return AppActions.SetState.execute(state, action.state);
  case 'ENQUEUE':
    return PlayerActions.Enqueue.execute(state, action.tracks);
  case 'TOGGLEPLAY':
    return PlayerActions.TogglePlay.execute(state);
  case 'PLAY':
    return PlayerActions.Play.execute(state);
  case 'STOP':
    return PlayerActions.Stop.execute(state);
  case 'PLAYING':
    return PlayerActions.Playing.execute(state, action.audioStatus);
  case 'NEXT':
    return PlayerActions.Next.execute(state);
  case 'PREV':
    return PlayerActions.Prev.execute(state);
  case 'SEARCH':
    return LayoutActions.Search.execute(state, action.keywords);
  case 'ENDSEARCH':
    return LayoutActions.EndSearch.execute(state);
  case 'APPEND_SEARCH_RESULTS':
    return LayoutActions.AppendSearchResults.execute(state, action.results);
  case 'CLEAR_SEARCH_RESULTS':
    return LayoutActions.ClearSearchResults.execute(state);
  case 'CLEAR_QUEUE':
    return PlayerActions.ClearQueue.execute(state);
  case 'CONNECTEDSOURCE':
    return SourceListActions.ConnectedSource.execute(state, action.source);
  case 'LOAD_CONNECTED_SOUCES_SUCCESS':
    return SourceListActions.LoadConnectedSourceSuccess.execute(state, action.sources);
  case 'DISCONNECT_SOURCE_SUCCESS':
    return SourceListActions.DisconnectSourceSuccess.execute(state, action.name);
  case 'CONNEXIONFAILEDSOURCE':
    return SourceListActions.ConnexionFailedSource.execute(state, action.error);
  case 'PLAYLIST_UPDATE_SEARCH_FIELD':
    return PlaylistsListActions.UpdateSearchField.execute(state, action.searchValue);
  case 'PLAYLIST_UPDATE_SEARCH_RESULTS':
    return PlaylistsListActions.UpdateSearchResults.execute(state, action.searchResults);
  case 'LOGIN_SUCCESS':
    return LoginActions.Login.execute(state, action.accessToken);
  case 'FORM_ERROR':
    return LoginActions.FormError.execute(state, action.error);
  default:
  }
  return state;
}
