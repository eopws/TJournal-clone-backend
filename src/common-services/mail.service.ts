import nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    onModuleInit() {}

    async sendActivationMessage(to, link) {}
}
