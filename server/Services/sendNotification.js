import nodemailer from 'nodemailer';

export async function sendNotification(email, message, subject){
    const transporter = nodemailer.createTransport({
        service: "gmail", 
        // smtp.gmail.com
        auth:{
            user:'jessee.dan.catli@gmail.com',
            pass: 'oulz vxxd cejw rpwj'
        },
        tls: {
            rejectedUnauthorized: false,
        }
    })
    console.log('This is the subject:', subject)
    const info = await transporter.sendMail({
        from: '"Accelerated Wellness & Pain Clinic" <jessee.dan.catli@gmail.com>',
        to: `${email}, ${email}`,
        subject:`${subject}`,
        text: `${message}`,
            })
}