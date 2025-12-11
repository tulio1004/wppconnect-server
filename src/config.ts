import { ServerOptions } from './types/ServerOptions';

const config: ServerOptions = {
  secretKey: process.env.SECRET_KEY || 'THISISMYSECURETOKEN',
  host: process.env.HOST || 'http://localhost',
  port: process.env.PORT || '21465',

  deviceName: process.env.DEVICE_NAME || 'WppConnectServer',
  poweredBy: 'WPPConnect-Server',

  startAllSession: false,
  tokenStoreType: 'file',
  maxListeners: 15,

  customUserDataDir:
    process.env.USER_DATA_DIR || '/usr/src/wpp-server/userDataDir/',

  webhook: {
    url: null,
    autoDownload: true,
    uploadS3: false,
    readMessage: true,
    allUnreadOnStart: false,
    listenAcks: true,
    onPresenceChanged: true,
    onParticipantsChanged: true,
    onReactionMessage: true,
    onPollResponse: true,
    onRevokedMessage: true,
    onLabelUpdated: true,
    onSelfMessage: false,
    ignore: ['status@broadcast'],
  },

  websocket: {
    autoDownload: false,
    uploadS3: false,
  },

  chatwoot: {
    sendQrCode: true,
    sendStatus: true,
  },

  archive: {
    enable: false,
    waitTime: 10,
    daysToArchive: 45,
  },

  log: {
    level: 'silly',
    logger: ['console', 'file'],
  },

  // ---------------------------------------------------
  // 🔥 AQUI ESTÁ A CORREÇÃO CRÍTICA DO BROWSER
  // ---------------------------------------------------
 createOptions: {
  puppeteerOptions: {
    headless: true,
    executablePath: '/usr/bin/google-chrome-stable',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-extensions',
      '--disable-features=IsolateOrigins,site-per-process',
      '--disable-background-networking',
      '--disable-default-apps',
      '--disable-sync',
      '--disable-translate',
      '--hide-scrollbars',
      '--metrics-recording-only',
      '--mute-audio',
      '--no-first-run',
      '--ignore-certificate-errors',
      '--ignore-ssl-errors',
    ],
  },
},

  // ---------------------------------------------------
};

export default config;
