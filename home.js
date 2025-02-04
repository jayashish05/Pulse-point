function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  }
  document.addEventListener('DOMContentLoaded', () => {
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('progressBar').style.width = scrolled + "%";
});
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  document.querySelector('body').style.backgroundPosition = `center ${scrolled * 0.5}px`;
  
  document.querySelectorAll('[data-scroll]').forEach(element => {
    const speed = parseFloat(element.dataset.scroll);
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});
});