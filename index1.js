import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
        import { 
            getAuth, 
            createUserWithEmailAndPassword, 
            signInWithEmailAndPassword, 
            updateProfile 
        } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
        const firebaseConfig = {
            apiKey: "AIzaSyAQJyXNxkwow5nFqWOk4NZWRmdckrCb-wo",
            authDomain: "pulse-point-7ec5e.firebaseapp.com",
            databaseURL: "https://pulse-point-7ec5e-default-rtdb.firebaseio.com",
            projectId: "pulse-point-7ec5e",
            storageBucket: "pulse-point-7ec5e.firebasestorage.app",
            messagingSenderId: "613049217344",
            appId: "1:613049217344:web:486d8ef402348dd672caa5",
            measurementId: "G-DQVMZWT5T6"
        };
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.blood-btn').forEach(button => {
                button.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const form = button.closest('.form');
                    const inputs = form.querySelectorAll('input');
                    const isSignup = form.querySelector('input[type="text"]') !== null;

                    if (isSignup) {
                        const name = inputs[0].value;
                        const email = inputs[1].value;
                        const password = inputs[2].value;

                        try {
                            // Try to create new user
                            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                            await updateProfile(userCredential.user, { displayName: name });
                            alert('Signup successful! Redirecting to login...');
                            window.location.href = 'dashboard.html';
                        } catch (error) {
                            if (error.code === 'auth/email-already-in-use') {
                                // Try to log in if account exists
                                try {
                                    await signInWithEmailAndPassword(auth, email, password);
                                    alert('Welcome back! You\'ve been logged in.');
                                    window.location.href = 'home.html'; // Redirect to dashboard
                                } catch (loginError) {
                                    alert('Account exists but password is incorrect');
                                }
                            } else {
                                alert(`Signup error: ${error.message}`);
                            }
                        }
                    } else {
                        // Login handling
                        const email = inputs[0].value;
                        const password = inputs[1].value;

                        try {
                            await signInWithEmailAndPassword(auth, email, password);
                            alert('Login successful!');
                            window.location.href = 'home.html'; // Redirect to dashboard
                        } catch (error) {
                            alert(`Login failed: ${error.message}`);
                        }
                    }
                });
            });
        });
        function toggleForms() {
            const container = document.querySelector('.container');
            const button = document.querySelector('.toggle-button button');
            container.classList.toggle('signup-active');
            button.textContent = container.classList.contains('signup-active') 
                ? "Already have an account? Sign In" 
                : "New User? Sign Up";
        }

        function togglePasswordVisibility() {
            const passwordInput = document.querySelectorAll('input[type="password"]');
            passwordInput.forEach(input => {
                input.type = input.type === "password" ? "text" : "password";
            });
        }
