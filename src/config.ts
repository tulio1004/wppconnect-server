import { ServerOptions } from './types/ServerOptions';

export default {
  secretKey: process.env.SECRET_KEY || 'DEFAULT_SECRET',
  
  // Importante: host deve vir do Railway
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || '21465',

  deviceName: 'WppConnect',
  poweredBy: 'WPPConnect-Server',

  startAllSession: false,
  tokenStoreType: 'file',
  maxListeners: 20,

  // Caminho ABSOLUTO dentro do container
  customUserDataDir: '/usr/src/wpp-server/userDataDir/',

  webhook: {
    url: null,
    autoDownload: true,
    readMessage: true,
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
    level: 'info',
    logger: ['console'],
  },

  // 🚀 AQUI ESTÁ A CORREÇÃO CRÍTICA
  createOptions: {
    puppeteerOptions: {
      executablePath: '/usr/bin/google-chrome-stable',
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-background-networking',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-breakpad',
        '--disable-client-side-phishing-detection',
        '--disable-component-update',
        '--disable-default-apps',
        '--disable-extensions',
        '--disable-features=TranslateUI',
        '--disable-ipc-flooding-protection',
        '--disable-popup-blocking',
        '--disable-renderer-backgrounding',
        '--disable-sync',
        '--force-color-profile=srgb',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-first-run',
        '--no-zygote',
        '--password-store=basic',
        '--use-mock-keychain',
      ]
    }
  },

  mapper: {
    enable: false,
    prefix: 'tagone-',
  },

} as unknown as ServerOptions;
