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
    executablePath:
      process.env.PUPPETEER_EXECUTABLE_PATH ||
      '/usr/bin/google-chrome-stable',

    headless: true,

    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',

      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-software-rasterizer',
      '--disable-extensions',
      '--disable-background-networking',
      '--disable-default-apps',
      '--disable-sync',
      '--disable-translate',
      '--hide-scrollbars',
      '--metrics-recording-only',
      '--mute-audio',
      '--no-first-run',
      '--no-default-browser-check',
      '--ignore-certificate-errors',
      '--ignore-ssl-errors',
      '--disable-features=site-per-process',
      '--window-size=1920,1080',
    ],
  },

  // ---------------------------------------------------
};

export default config;
