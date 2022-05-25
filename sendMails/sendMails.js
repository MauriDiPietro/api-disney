import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv';
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID)

export default sgMail;


