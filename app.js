const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
//View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars')

//static folder
app.use('/public', express.static(path.join(__dirname, '/public')));


//body parser middleware

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('contact');
});

app.post('/send', (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name:${req.body.name} </li>
    <li>Name:${req.body.company} </li>
    <li>Name:${req.body.email} </li>
    <li>Name:${req.body.phone} </li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'hellen82@ethereal.email', // generated ethereal user
            pass: 'v7jjUB8XDpQQENcc4W' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: '"Fred Foo " <foo@blurdybloop.com>',
        to: 'chet.leuschke@ethereal.email syble.ledner@ethereal.email',
        subject: 'Node Contact request',
        text: 'Hello world',
        html: output

    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('contact', { msg: 'Email has been sent' });


    })


})

app.listen(3000, () => {
    console.log('server started...')
})