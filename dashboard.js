window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById('loading-overlay').style.display = 'none';
    }, 3000); // Hide after 3 seconds
});

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQJyXNxkwow5nFqWOk4NZWRmdckrCb-wo",
    authDomain: "pulse-point-7ec5e.firebaseapp.com",
    projectId: "pulse-point-7ec5e",
    storageBucket: "pulse-point-7ec5e.firebasestorage.app",
    messagingSenderId: "613049217344",
    appId: "1:613049217344:web:486d8ef402348dd672caa5",
    measurementId: "G-DQVMZWT5T6"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// Location Handler
document.getElementById('location-btn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const locationData = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem('userLocation', JSON.stringify(locationData));
                alert('Location saved successfully!');
            },
            error => {
                alert('Error getting location: ' + error.message);
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

// Form Submission Handler
document.getElementById('user-info-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userProfile = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        gender: document.getElementById('blood-group').value,
        height: document.getElementById('height').value,
        weight: document.getElementById('weight').value,
        bloodGroup: document.getElementById('blood-group1').value,
        tattoo: document.getElementById('tattoo').value,
        medicalHistory: document.getElementById('medical-history').value,
        location: JSON.parse(localStorage.getItem('userLocation')),
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    };

    try {
        // Add user profile to Firestore
        await db.collection("users").add(userProfile);

        // Store in localStorage
        localStorage.setItem('userProfile', JSON.stringify(userProfile));

        alert("Profile saved successfully!");
        window.location.href = 'home.html';
    } catch (error) {
        console.error("Error saving profile:", error);
        alert("Failed to save profile. Check console for details.");
    }
});
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