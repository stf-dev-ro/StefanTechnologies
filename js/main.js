// Translation system
import { english } from "./lang/english.js";
import { romanian } from "./lang/romanian.js";
import { siteElement } from "./data/pageElements.js";
class TranslationSystem {
    constructor(i = 0, i1 = 0, htmlElement) {
        this.i = i;
        this.i1 = i1;
        this.htmlElement = htmlElement;
    }
    translate(lang) {
        if (lang === english) {
            this.translateEnglish();
        }
        else {
            this.translateRomanian();
        }
    }
    translateEnglish() {
        this.i1 = 12;
        for (this.i = 0; this.i < english.length - 3; this.i++) {
            // This loop functions until it becomes 11
            document.getElementById(siteElement[this.i]).innerHTML = english[this.i];
            if (this.i === 11) { // once i reaches 11, it will execute
                // this will replace the second card
                for (this.i = 12; this.i < 15; this.i++) {
                    document.getElementById(siteElement[this.i1]).innerHTML = english[this.i];
                    this.i1 = this.i1 + 1;
                    if (this.i === 14) { // once i reaches 14, it will execute
                        this.i1 = 15;
                        // this will replace the third card
                        for (this.i = 12; this.i < 15; this.i++) {
                            document.getElementById(siteElement[this.i1]).innerHTML = english[this.i];
                            this.i1 = this.i1 + 1;
                        }
                    }
                }
            }
        }
    }
    translateRomanian() {
        this.i1 = 12;
        for (this.i = 0; this.i < romanian.length - 3; this.i++) {
            // This loop functions until it becomes 11
            document.getElementById(siteElement[this.i]).innerHTML = romanian[this.i];
            if (this.i === 11) { // once i reaches 11, it will execute
                // this will replace the second card
                for (this.i = 12; this.i < 15; this.i++) {
                    document.getElementById(siteElement[this.i1]).innerHTML = romanian[this.i];
                    this.i1 = this.i1 + 1;
                    if (this.i === 14) { // once i reaches 14, it will execute
                        this.i1 = 15;
                        // this will replace the third card
                        for (this.i = 12; this.i < 15; this.i++) {
                            document.getElementById(siteElement[this.i1]).innerHTML = romanian[this.i];
                            this.i1 = this.i1 + 1;
                        }
                    }
                }
            }
        }
    }
}
const translateClass = new TranslationSystem(0, 0, []);
// Translate buttons
document.getElementById('enTranslateButton').addEventListener('click', () => {
    navbar.loadingScreen();
    translateClass.translate(english);
});
document.getElementById('roTranslateButton').addEventListener('click', () => {
    navbar.loadingScreen();
    translateClass.translate(romanian);
});
// General Site Functions
// General Site Button Logic
function $(element) {
    return document.getElementById(element);
}
// GitHub Button
const githubButton = $('github_serverapp');
githubButton.addEventListener('click', () => {
    return window.open('https://github.com/stf-dev-ro/stefan-web-server');
});
// Download Button
const downloadServerButton = $('downloadServerButton');
downloadServerButton.addEventListener('click', () => {
    return window.location.href = 'https://github.com/stf-dev-ro/Stefan-Web-Server/archive/refs/heads/master.zip';
});
// HTML Navbar logic for Mobile
class navbarLogic {
    constructor(navbar = document.getElementById('nav'), menu = document.getElementById('menu'), body = document.getElementById('body'), menuButton = document.getElementById('menuButton'), laptopLangSelector = document.getElementById('languageSelector'), isMenuHidden = false, loadingScreenDiv = document.getElementById('loadingScreen_')) {
        this.navbar = navbar;
        this.menu = menu;
        this.body = body;
        this.menuButton = menuButton;
        this.isMenuHidden = isMenuHidden;
        this.laptopLangSelector = laptopLangSelector;
        this.loadingScreenDiv = loadingScreenDiv;
    }
    loadingScreen() {
        this.loadingScreenDiv.style.display = 'flex';
        this.navbar.style.display = 'none';
        this.body.style.display = 'none';
        setTimeout(() => {
            this.navbar.style.display = 'flex';
            this.body.style.display = 'block';
            this.loadingScreenDiv.style.display = 'none';
        }, 840);
    }
    hideMenu() {
        this.navbar.style.height = '73px';
        this.menu.style.display = 'none';
        this.isMenuHidden = false;
    }
    showMenu() {
        this.navbar.style.height = '250px';
        this.menu.style.display = 'block';
        this.isMenuHidden = true;
    }
    menuButtonClick() {
        if (this.isMenuHidden === false) {
            this.showMenu();
        }
        else if (this.isMenuHidden === true) {
            this.hideMenu();
        }
    }
    ChangeLaptopLanguage(language) {
        if (language === 'en') {
            translateClass.translateEnglish();
        }
        else {
            translateClass.translateRomanian();
        }
    }
}
const navbar = new navbarLogic();
const showMenu = $('menuButton');
showMenu.addEventListener('click', () => {
    navbar.menuButtonClick();
});
const viewSoftwareButton = $('viewSoftware');
viewSoftwareButton.addEventListener('click', () => {
    if (navbar.isMenuHidden === true) {
        navbar.menuButtonClick();
    }
});
const laptopLangSelector = $('languageSelector');
laptopLangSelector.addEventListener('click', () => {
    if (laptopLangSelector.value === 'en') {
        translateClass.translateEnglish();
    }
    else {
        translateClass.translateRomanian();
    }
});