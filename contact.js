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