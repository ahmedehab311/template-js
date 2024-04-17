// check if there's local storge color opation
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color_option")
  );

  // check for active class

  document.querySelectorAll(".color-list li").forEach((el) => {
    el.classList.remove("active");
    // add active on element width fata color

    if (el.dataset.color === mainColor) {
      el.classList.add("active");
    }
  });
}

// random background opation
let backgroundOption = true;

// varibale to control the background intrival
let backgroundIntrvel;

// check if  there local storge random background item
let backgroundLocalItem = localStorage.getItem("background_option");

// check if random back local storge is not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-background .no").classList.add("active");
  }
}

let toggleSetting = document.querySelector(".toggle-setting");
let gear = document.querySelector(".toggle-setting .fa-gear");
let random = document.querySelector(".random-background ");

let settingBox = document.querySelector(".setting-box");

// toggle spin class on icon
gear.onclick = function () {
  this.classList.toggle("fa-spin");

  settingBox.classList.toggle("open");
};

// // click anywhere outside togglesitting

// document.addEventListener("click", (e) => {
//   if (e.target !== toggleSetting && e.target !== gear && e.target !== settingBox) {
//     // check if sittingmenu is open
//     console.log(e.target);
//     if (settingBox.classList.contains("open")) {
//       gear.classList.remove("fa-spin");
//       settingBox.classList.toggle("open");
//     }
//   }
// });

// switch random background opation
const randomBackEl = document.querySelectorAll(".option-box span");

//  loop on all spans
randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.back === "yes") {
      backgroundOption = true;

      randomizeImgs();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundIntrvel);

      localStorage.setItem("background_option", false);
    }
  });
});

// switch colors
const colorsLis = document.querySelectorAll(".colors-list li");
//  loop on all Lis

colorsLis.forEach((li) => {
  li.addEventListener("click", (e) => {
    // set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // set color on local stroge
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});

// selcet landing page element
let landingPage = document.querySelector(".landing-page");

// get array of images
let imgsArray = ["01.jfif", "02.jfif", "03.jfif", "04.png"];

// function to randomize imgs

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundIntrvel = setInterval(() => {
      // get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // change background image url
      landingPage.style.backgroundImage =
        'url("images/' + imgsArray[randomNumber] + '")';
    }, 1000);
  }
}
randomizeImgs();

// select skills selector

let ourskills = document.querySelector(".skills");

window.onscroll = function () {
  // skills offset top
  let skillsOffsetTop = ourskills.offsetTop;

  // skills outer height
  let skillsOutertHeight = ourskills.offsetHeight;

  // window height
  let windowHeight = this.innerHeight;

  // window scrolltop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOutertHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skills .skill-box .skill-progress span"
    );
    allSkills.forEach((sk) => {
      sk.style.width = sk.dataset.progress;
    });
  }
};

// create popup with the image

let ourGallary = document.querySelectorAll(".gallary img");

ourGallary.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create ovarlay div
    let ovarlay = document.createElement("div");

    // create class to ovarlay
    ovarlay.className = "popup-ovarlay";

    // append overlay to body
    document.body.appendChild(ovarlay);

    let popupBox = document.createElement("div");

    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // creating heading
      let imgHeading = document.createElement("h3");
      let imgTxt = document.createTextNode(img.alt);
      imgHeading.appendChild(imgTxt);
      popupBox.appendChild(imgHeading);
    }

    let popupImage = document.createElement("img");

    popupImage.src = img.src;

    popupBox.appendChild(popupImage);

    document.body.appendChild(popupBox);

    // create close span

    let closeButton = document.createElement("span");

    let closeButtonText = document.createTextNode("X");

    closeButton.appendChild(closeButtonText);

    closeButton.className = "close-button";

    popupBox.appendChild(closeButton);
  });
});

// close popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();

    // remove ovalay
    document.querySelector(".popup-ovarlay").remove();
  }
});

// select all bulletss
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// select all bulletss
const allLkins = document.querySelectorAll(".links a");

function scrollToSection(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSection(allBullets);
scrollToSection(allLkins);

// handle active state
function handleActive(el) {
  // remove active class from all chlidreen

  el.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  el.target.classList.add("active");
}

// select bullet bullet option
let bulletSpan = document.querySelectorAll(".bullet-option span");

let bulletsContanier = document.querySelector(".nav-bullets");

let bulletLocalStroge = localStorage.getItem("bullet_option");

if (bulletLocalStroge !== null) {
  bulletSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalStroge === "block") {
    bulletsContanier.style.display = "block";
    document.querySelector(".bullet-option .yes").classList.add("active");
  } else {
    bulletsContanier.style.display = "none";
    document.querySelector(".bullet-option .no").classList.add("active");
  }
}

bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContanier.style.display = "block";
      localStorage.setItem("bullet_option", "block");
    } else {
      bulletsContanier.style.display = "none";
      localStorage.setItem("bullet_option", "none");
    }
    handleActive(e);
  });
  console.log(bulletsContanier);
});

// selcet the scroll option
let scrollSpan = document.querySelectorAll(".scroll-option span");
let headerArea = document.querySelector(".header-area ");
let contanierLinks = document.querySelector("contanier-links");



    // position: fixed;
    // width: 100%;
    // background-color: var(--main-color);
// scrollSpan.forEach((span) => {
// span.addEventListener("click",(e) => {
//   if (span.dataset.display === "show") {
//     headerArea.style.position = "fixed";
//     headerArea.style.backgroundColor = "var(--main-color)";
//     headerArea.style.width = "90%";
//     contanierLinks.style.width = "100%";
    
//   }else{
//     headerArea.style.position = "relative";
//     headerArea.style.backgroundColor = "transparent";
//     // headerArea.style.width = "none";
//   }
// })
// })



// reset button

document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  // localStorage.removeItem("bullet_option");
  // localStorage.removeItem("color_option");
  // localStorage.removeItem("background_option");

  // reload window
  window.location.reload();
};

// toggle menu
let toggleMenu = document.querySelector(".toggle-menu");

// selcet contanier-links
Links = document.querySelector(".links");

toggleMenu.onclick = function (e) {
  e.stopPropagation();

  this.classList.toggle("menu-active");
  Links.classList.toggle("open");
};

// selcet contanier-links
contanier = document.querySelector(".contanier");

// click anywhere outside menu

document.addEventListener("click", (e) => {
  if (e.target !== toggleMenu && e.target !== Links) {
    // check if menu is open
    if (Links.classList.contains("open")) {
      toggleMenu.classList.toggle("menu-active");
      Links.classList.toggle("open");
    }
  }
});

// stop Propagation on menu;
Links.onclick = function (e) {
  e.stopPropagation();
};
