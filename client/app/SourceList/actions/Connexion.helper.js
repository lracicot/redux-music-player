import Axios from 'axios';
import Semaphore from 'semaphore-async-await';

/**
 * fetchAuthorizationCode - Fetch the authorization code
 *
 * @param {JamendoProxy|SpotifyProxy|SoundCloudProxy} source The source to authentify
 *
 * @return {string} The code
 */
export async function fetchAuthorizationCode(source) {
  let resultUrl = null;

  if (source.authorizationUrl) {
    const { remote } = window.require('electron');
    const { BrowserWindow } = remote;

    const mutex = new Semaphore(0);

    let authWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
      'node-integration': false,
      'web-security': false,
    });
    authWindow.loadURL(source.authorizationUrl);
    authWindow.show();
    // 'will-navigate' is an event emitted when the window.location changes
    // newUrl should contain the tokens you need
    authWindow.webContents.on('will-navigate', (event, newUrl) => {
      if (newUrl.startsWith(source.redirectUri)) {
        resultUrl = newUrl;
        authWindow.close();
      }
    });

    authWindow.on('closed', () => {
      authWindow = null;

      mutex.signal();
    });

    await mutex.wait();
  }

  return resultUrl;
}

/**
 * fetchTokenCode - Fetch the access token
 *
 * @param {JamendoProxy|SpotifyProxy|SoundCloudProxy} source The source to access
 * @param {type} strUrl The url to access the token
 *
 * @return {string} The token
 */
export async function fetchTokenCode(source, strUrl) {
  // const index = url.search('code=');
  const url = new URL(strUrl);
  const code = url.searchParams.get('code');

  if (!source.getToken) {
    return code;
  }

  const tokenUri = source.getToken(code);

  const { requestConfig } = source;

  const response = await Axios.post(tokenUri, null, requestConfig);
  return response.data.access_token;
}
