
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface Attachment {
    filename: string;
    path: string;
}

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}


export class EmailService {
    
    private transporter = nodemailer.createTransport({
        'service': envs.MAILER_SERVICE,
        auth: {
            user: envs.MAIL,
            pass: envs.MAILER_KEY
        }
    });

    constructor(
    ){}

    async sendEmail( options: SendEmailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const sentInfo = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments : attachments,
            })
            return true;
        } catch (error) {
            return false;
        }
    }

    async sendEmailWithFileSystemLogs( to: string | string[] ){

        const subject = 'Logs of the server';
        const htmlBody = `
        <h1><title/h1>
        `;
        const attachments: Attachment[] = [
            { filename: 'logs-low.log', path: './logs/logs_low.log'},
            { filename: 'logs-medium.log', path: './logs/logs_medium.log'},
            { filename: 'logs-high.log', path: './logs/logs_high.log'},
        ];

        return this.sendEmail({
            to, subject, attachments, htmlBody
        });
    }
}