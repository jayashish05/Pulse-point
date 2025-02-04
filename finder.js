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
document.addEventListener('DOMContentLoaded', function() {
    const animationContainer = document.getElementById('lottie-animation');
    const animationData = {
      container: animationContainer,
      renderer: 'svg', // Use 'svg', 'canvas', or 'html'
      loop: true, // Loop the animation
      autoplay: true, // Start playing immediately
      path: 'loading.json' // Replace with the path to your JSON file
    };
  
    const anim = lottie.loadAnimation(animationData);
  
    // Ensure loading screen stays for at least 3 seconds
    const loadingScreen = document.getElementById('loading-screen');
    let minTimePassed = false;
    let pageLoaded = false;
  
    // Wait for minimum 3 seconds
    setTimeout(function() {
      minTimePassed = true;
      if (pageLoaded) hideLoading();
    }, 3000);
  
    // Check if page finishes loading
    window.addEventListener('load', function() {
      pageLoaded = true;
      if (minTimePassed) hideLoading();
    });
  
    // Hide loading screen
    function hideLoading() {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 300); // Match transition duration
    }
  });