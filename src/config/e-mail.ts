import nodemailer from 'nodemailer';


export async function sendMail(to: string | undefined, message:string, attachment: any, subject: string){
  const sender = nodemailer.createTransport({
    // @ts-ignore
    host: process.env.EMAIL_HOST,
    service: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth:{
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
      }
  });

  let mailOptions = {
    from: 'noreplaysenaisc@gmail.com',
    to: to,
    subject: subject,
    text: message,
    };
  if(attachment === 's'){
    await sender.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err)
      }

      console.log(info)
      })
  }else{
    const newObj = {
      attachments: [
        {
            filename: 'file-name.pdf',
            path: attachment,
            contentType: 'application/pdf'
        }
      ]}
    mailOptions = {...mailOptions, ...newObj}
    await sender.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err)
      }

      console.log(info)
      })
  }
}
