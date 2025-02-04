const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// 🔹 Replace with your email credentials
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'pulsepoint374@gmail.com', // ✅ Your Gmail
        pass: 'kuop qbkl gfnl ntdw' // ✅ Your Gmail App Password
    }
});
// 🎯 Trigger when a new alert is added to Firestore
exports.sendEmailAlert = functions.firestore
    .document("alerts/{alertId}")
    .onCreate((snap, context) => {
        const alertData = snap.data();
        console.log("🔍 New alert detected:", alertData);

        const mailOptions = {
            from: "pulsepoint374@gmail.com",
            to: alertData.email,
            subject: "🚨 Urgent Blood Donation Request",
            text: `Blood request for ${alertData.bloodGroup}\nMessage: ${alertData.message}`
        };

        return transporter.sendMail(mailOptions)
            .then(() => console.log("✅ Email sent successfully to", alertData.email))
            .catch(error => console.error("❌ Error sending email:", error));
    });
