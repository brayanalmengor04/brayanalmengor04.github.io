export const prerender = false; // Ensure this is server-side rendered

import nodemailer from 'nodemailer';
import { compileEmailTemplate } from '../../utils/emailTemplate';
const RATE_LIMIT_WINDOW = 2 * 60 * 1000; // 2 minutes

export const POST = async ({ request, cookies }) => {
    try {
        const data = await request.json();
        const { firstName, lastName, email, phone, message } = data;

        // 1. Server-Side Rate Limiting (Cookie Check)
        const lastSent = cookies.get('last_email_sent');
        if (lastSent && lastSent.value) {
            const lastSentTime = parseInt(lastSent.value);
            const now = Date.now();
            if (now - lastSentTime < RATE_LIMIT_WINDOW) {
                const waitSeconds = Math.ceil((RATE_LIMIT_WINDOW - (now - lastSentTime)) / 1000);
                return new Response(JSON.stringify({
                    message: `Please wait ${waitSeconds} seconds before sending another message.`
                }), { status: 429 });
            }
        }
        if (!firstName || !email || !message) {
            return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'brayanalmengor300@gmail.com',
                pass: 'cwuaxqtqqcbewphh',
            },
        });
        const htmlContent = compileEmailTemplate({ firstName, lastName, email, phone, message });
        const mailOptions = {
            from: `"${firstName} ${lastName}" <${email}>`,
            to: 'brayanalmengor300@gmail.com',
            replyTo: email,
            subject: `New Contact Form Submission from ${firstName} ${lastName}`,
            text: `
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
            `,
            html: htmlContent
        };

        await transporter.sendMail(mailOptions);

        // Set Rate Limit Cookie
        // Setting cookie for 2 minutes
        cookies.set('last_email_sent', Date.now().toString(), {
            path: '/',
            maxAge: RATE_LIMIT_WINDOW / 1000, // maxAge is in seconds
            httpOnly: true, // Prevent client-side JS modification
            secure: true, // Only sent over HTTPS
            sameSite: 'strict'
        });

        return new Response(JSON.stringify({ message: "Email sent successfully" }), { status: 200 });

    } catch (error) {
        console.error('Email sending error:', error);
        return new Response(JSON.stringify({ message: "Internal Server Error", error: error.toString() }), { status: 500 });
    }
};
