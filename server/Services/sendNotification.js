import nodemailer from 'nodemailer';

export async function sendNotification(email, message){
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

    const info = await transporter.sendMail({
        from: '"Accelerated Wellness & Pain Clinic" <jessee.dan.catli@gmail.com>',
        to: `${email}, ${email}`,
        subject:"Appointment Confirmation with Accelerated Wellness & Pain Clinic on {{appointment_date}}",
        text: `${message}`,
            })
}