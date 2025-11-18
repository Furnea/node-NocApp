import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
    MAIL: env.get('MAIL').required().asEmailString(),
    MAILER_KEY: env.get('MAILER_KEY').required().asString(),
};