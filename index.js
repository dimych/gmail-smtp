const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();



app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "itkamasutracom@gmail.com", // generated ethereal user
        pass: "it-kamasutra.com" // generated ethereal password
    }
});


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/sendMessage', async function (req, res) {

    let {message, contacts, name } = req.body;

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'HR WANTS ME', // sender address
        to: "itkamasutracom@gmail.com", // list of receivers
        subject: 'HR WANTS ME', // Subject line
        //text: "", // plain text body
        html: `<b>СОобщение с вашего portfloli page</b>
<div>
name: ${name}
</div>
<div>
contacts: ${contacts}
</div>
<div>
${message}
</div>`
    });

    res.send("ok");
});

app.listen(3010, function () {
    console.log('Example app listening on port 3000!');
});
