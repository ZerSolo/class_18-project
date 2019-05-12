const navSlide = () => {
    //Toggle nav
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    //animate Links
    nav.classList.toggle('nav-active');
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 +
                1.0}s`;
        }
    });
    //Burger Animation
    burger.classList.toggle('tog');
};
export default navSlide;
