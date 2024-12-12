import path from 'node:path';
export const emailPatternUserModel = /^\S+@\S+\.\S+$/;

export const accessTokenLifeTime = 1000 * 60 * 15;
export const refreshTokenLifeTime = 1000 * 60 * 60 * 24 * 30;

// Sending an email
export const SMTP = {
    SMTP_HOST: 'SMTP_HOST',
    SMTP_PORT: 'SMTP_PORT',
    SMTP_USER: 'SMTP_USER',
    SMTP_PASSWORD: 'SMTP_PASSWORD',
    SMTP_FROM: 'SMTP_FROM',
};
export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

// Uploading images
export const CLOUDINARY = {
    CLOUD_NAME: 'CLOUD_NAME',
    API_KEY: 'API_KEY',
    API_SECRET: 'API_SECRET',
};
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
