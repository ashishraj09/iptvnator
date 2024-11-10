export const AppConfig = {
    production: true,
    environment: 'WEB',
    version: require('../../package.json').version,
    BACKEND_URL: 'http://localhost:3333',
    ENABLE_EXTERNAL_DB: true,
};
