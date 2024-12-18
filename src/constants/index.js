import path from 'node:path';

// Sending an email
export const SMTP = {
    SMTP_HOST: 'SMTP_HOST',
    SMTP_PORT: 'SMTP_PORT',
    SMTP_USER: 'SMTP_USER',
    SMTP_PASSWORD: 'SMTP_PASSWORD',
    SMTP_FROM: 'SMTP_FROM',
};
export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

// Uploading images link
export const CLOUDINARY = {
    CLOUD_NAME: 'CLOUD_NAME',
    API_KEY: 'API_KEY',
    API_SECRET: 'API_SECRET',
};
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// Google OAUTH 2 (Cloud Console)
export const PATH_JSON = path.join(process.cwd(), 'config', 'google-oauth.json');

// Swagger Doc
export const SWAGGER_PATH = path.resolve('docs', 'swagger.json');

// Static folder Public
export const PUBLIC_PATH = path.join(process.cwd(), 'public');
