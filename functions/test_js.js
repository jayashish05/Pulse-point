const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "pulsepoint374@gmail.com",
        pass: "kuop qbkl gfnl ntdw"
    }
});

const mailOptions = {
    from: "pulsepoint374@gmail.com",
    to: "chethankrishna2022@gmail.com",
    subject: "Test Email",
    text: "This is a test email from Nodemailer."
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log("❌ Error:", error);
    } else {
        console.log("✅ Email sent:", info.response);
    }
});
