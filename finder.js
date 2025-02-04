const firebaseConfig = {
    apiKey: "AIzaSyAQJyXNxkwow5nFqWOk4NZWRmdckrCb-wo",
    authDomain: "pulse-point-7ec5e.firebaseapp.com",
    projectId: "pulse-point-7ec5e",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form Submission Handler
document.getElementById('requestForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const bloodGroup = document.getElementById('bloodGroup').value;
    const message = document.getElementById('message').value;

    try {
        // Get matching donors from Firestore
        const snapshot = await db.collection('users').where('bloodGroup', '==', bloodGroup).get();

        if (snapshot.empty) {
            alert('No donors found for this blood group!');
            return;
        }

        // Process and display donors
        const donors = [];
        snapshot.forEach(doc => {
            const donor = doc.data();
            donors.push({ id: doc.id, ...donor });
        });

        // Display donors
        const donorList = document.getElementById('donorList');
        donorList.innerHTML = donors.map(donor => `
            <div class="donor-card">
                <div class="donor-info">
                    <p class="donor-name">${donor.name}</p>
                    <div class="donor-details">
                        <span>📞 ${donor.phone}</span>
                        <span>🩸 ${donor.bloodGroup}</span>
                        <span>👤 ${donor.gender}</span>
                    </div>
                </div>
                <button class="send-alert-btn" onclick="sendAlert('${donor.id}', '${donor.email}')">Send Alert</button>
            </div>
        `).join('');

        alert(`Found ${donors.length} donors!`);
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

// Send Alert Function
function sendAlert(userId, email) {
    const message = document.getElementById('message').value;

    db.collection('alerts').add({
        userId: userId,
        email: email,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert(`Alert sent to ${email}`);
    })
    .catch((error) => {
        alert(`Error: ${error.message}`);
    });
}