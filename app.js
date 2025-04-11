const menuBtn = document.getElementById("menu-btn")
const mobileMenu = document.querySelector(".mobile-menu")
const navbar = document.querySelector(".nav")
const menuOpen = "assets/images/global/nav-icon/menu2.svg"
const menuClose = "assets/images/global/nav-icon/close.svg"
let btnIcon = document.getElementById("btn-icon")

document.addEventListener("DOMContentLoaded", () => {
    const preloadImages = [menuOpen, menuClose];
    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  });
  
function openMenu() {

    if(mobileMenu.getAttribute("class") == "mobile-menu"){
        mobileMenu.classList.add("active")
        navbar.classList.add("active")
        btnIcon.src = menuClose
    }else{
        btnIcon.src = menuOpen
        mobileMenu.classList.remove("active")
        navbar.classList.remove("active")
    }
}

