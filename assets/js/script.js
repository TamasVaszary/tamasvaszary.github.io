'use strict';

window.addEventListener('DOMContentLoaded', function() {

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector(".info_more-btn");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    // remove active from all pages and links
    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.remove("active");
    }
    for (let j = 0; j < navigationLinks.length; j++) {
      navigationLinks[j].classList.remove("active");
    }

    // find the matching page
    const targetPage = this.getAttribute("data-page-target");  // this needs to match "contact"
    for (let j = 0; j < pages.length; j++) {
      if (pages[j].dataset.page === targetPage) {
        pages[j].classList.add("active");  // add active to the target page
        this.classList.add("active");     // add active to the clicked button
        window.scrollTo(0, 0);           // scroll to the top of the page
        break;
      }
    }
  });
}

});

// Choose default language:
// 1. Use saved preference if it exists
// 2. Otherwise use browser language if it is English or Hungarian
// 3. Otherwise default to English
function getInitialLanguage() {
  const savedLang = localStorage.getItem("language");

  if (savedLang === "en" || savedLang === "hu") {
    return savedLang;
  }

  const browserLanguages = navigator.languages || [navigator.language];

  const hasHungarian = browserLanguages.some(lang =>
    lang.toLowerCase().startsWith("hu")
  );

  const hasEnglish = browserLanguages.some(lang =>
    lang.toLowerCase().startsWith("en")
  );

  if (hasHungarian) return "hu";
  if (hasEnglish) return "en";

  return "en";
}

// Apply selected language to the page
function applyLanguage(lang) {
  document.documentElement.setAttribute("lang", lang);

  document.querySelectorAll(".lang").forEach(function (element) {
    if (element.classList.contains(lang)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });

  document.getElementById("language-toggle").setAttribute("data-lang", lang);
}

// On page load
const initialLang = getInitialLanguage();
applyLanguage(initialLang);

// Language toggle button
document.getElementById("language-toggle").addEventListener("click", function () {
  const currentLang = this.getAttribute("data-lang");
  const newLang = currentLang === "en" ? "hu" : "en";

  localStorage.setItem("language", newLang);
  applyLanguage(newLang);
});
