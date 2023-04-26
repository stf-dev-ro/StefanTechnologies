// Translation system
import { english } from "./lang/english.js"
import { romanian } from "./lang/romanian.js"
import { siteElement } from "./data/pageElements.js"

class TranslationSystem {

    i: number
    i1: number
    htmlElement: string[]
    selectedLanguage: string[]
    initialLanguage: string

    constructor(
        i: number = 0,
        i1: number = 0,
        htmlElement: string[],
        selectedLanguage: string[],
        initialLanguage: string
    ) {
        this.i = i
        this.i1 = i1
        this.htmlElement = htmlElement
        this.selectedLanguage = selectedLanguage
        this.initialLanguage = initialLanguage
    }

    translate(language: string) {

        localStorage.setItem('initialLanguage', language)

        this.i1 = 12

        if (language === 'English') {
            this.selectedLanguage = english
        }

        else {
            this.selectedLanguage = romanian
        }

        for (this.i = 0; this.i < this.selectedLanguage.length - 3; this.i++) {
            // This loop functions until it becomes 11

            document.getElementById(siteElement[this.i])!.innerHTML = this.selectedLanguage[this.i]

            if (this.i === 11) { // once i reaches 11, it will execute

                // this will replace the second card
                for (this.i = 12; this.i < 15; this.i++) {
                    document.getElementById(siteElement[this.i1])!.innerHTML = this.selectedLanguage[this.i]
                    this.i1 = this.i1 + 1

                    if (this.i === 14) { // once i reaches 14, it will execute

                        this.i1 = 15

                        // this will replace the third card
                        for (this.i = 12; this.i < 15; this.i++) {
                            document.getElementById(siteElement[this.i1])!.innerHTML = this.selectedLanguage[this.i]
                            this.i1 = this.i1 + 1
                        }
                    }
                }
            }
        }
    }

    initialLanguageSet() {

        if (localStorage.getItem('initialLanguage') === null) {
            localStorage.setItem('initialLanguage', 'English')
        }

        else if (localStorage.getItem('initialLanguage') === 'English') {
            this.translate('English')
        }

        else {
            this.translate('Romanian')
        }

        console.log('Initial site language set to: ' + localStorage.getItem('initialLanguage') + '\n Happy browsing')

    }
}

const translateClass = new TranslationSystem(0, 0, [], [], '')

translateClass.initialLanguageSet()

// Translate buttons
document.getElementById('enTranslateButton')!.addEventListener('click', () => {
    navbar.loadingScreen()
    translateClass.translate('English')
})
document.getElementById('roTranslateButton')!.addEventListener('click', () => {
    navbar.loadingScreen()
    translateClass.translate('Romanian')
})


// General Site Functions
// General Site Button Logic
function $(element: string) {
    return document.getElementById(element)!
}

// GitHub Button
const githubButton: HTMLElement = $('github_serverapp')

githubButton.addEventListener('click', () => {
    return window.open('https://github.com/stf-dev-ro/stefan-web-server')
})

// Download Button
const downloadServerButton: HTMLElement = $('downloadServerButton')

downloadServerButton.addEventListener('click', () => {
    return window.location.href = 'https://github.com/stf-dev-ro/Stefan-Web-Server/archive/refs/heads/master.zip'
})

// HTML Navbar logic for Mobile
class navbarLogic {

    navbar: HTMLElement
    menu: HTMLElement
    body: HTMLElement
    menuButton: HTMLElement
    isMenuHidden: boolean
    loadingScreenDiv: HTMLElement
    laptopLangSelector: HTMLElement

    constructor(
        navbar: HTMLElement = document.getElementById('nav')!,
        menu: HTMLElement = document.getElementById('menu')!,
        body: HTMLElement = document.getElementById('body')!,
        menuButton: HTMLElement = document.getElementById('menuButton')!,
        laptopLangSelector: HTMLElement = document.getElementById('languageSelector')!,
        isMenuHidden: boolean = false,
        loadingScreenDiv: HTMLElement = document.getElementById('loadingScreen_')!
    ) {
        this.navbar = navbar
        this.menu = menu
        this.body = body
        this.menuButton = menuButton
        this.isMenuHidden = isMenuHidden
        this.laptopLangSelector = laptopLangSelector
        this.loadingScreenDiv = loadingScreenDiv
    }

    loadingScreen() {
        this.loadingScreenDiv.style.display = 'flex'
        this.navbar.style.display = 'none'
        this.body.style.display = 'none'

        setTimeout(() => {
            this.navbar.style.display = 'flex'
            this.body.style.display = 'block'
            this.loadingScreenDiv.style.display = 'none'
        }, 840)
    }

    hideMenu() {
        this.navbar.style.height = '73px'
        this.menu.style.display = 'none'
        this.isMenuHidden = false
    }

    showMenu() {
        this.navbar.style.height = '250px'
        this.menu.style.display = 'block'
        this.isMenuHidden = true
    }

    menuButtonClick() {

        if (this.isMenuHidden === false) {
            this.showMenu()
        }

        else if (this.isMenuHidden === true) {
            this.hideMenu()
        }
    }

    ChangeLaptopLanguage(language: string) {

        if (language === 'en') {
            translateClass.translate('English')
        }

        else {
            translateClass.translate('Romanian')
        }
    }
}

const navbar = new navbarLogic()

// Mobile warning menu
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

    navbar.loadingScreenDiv.style.display = 'flex'
    navbar.navbar.style.display = 'none'
    navbar.body.style.display = 'none'

    alert("Mobile Device Detected. The site might not have full functionality in Mobile mode")

    navbar.navbar.style.display = 'flex'
    navbar.body.style.display = 'block'
    navbar.loadingScreenDiv.style.display = 'none'

}


// Site Functions 
const showMenu = $('menuButton')
showMenu.addEventListener('click', () => {
    navbar.menuButtonClick()
})

const viewSoftwareButton: HTMLElement = $('viewSoftware')
viewSoftwareButton.addEventListener('click', () => {
    if (navbar.isMenuHidden === true) {
        navbar.menuButtonClick()
    }
})

interface promiseData {
    addEventListener: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void
    value: string
}

const laptopLangSelector: Promise<promiseData> = new Promise((res, err) => {

    let select = $('languageSelector') as HTMLSelectElement

    select.addEventListener('click', () => {

        if (select.value === 'en') {
            translateClass.translate('English')
            res(localStorage.getItem('initialLanguage'))
        }

        else {
            translateClass.translate('Romanian')
            res(localStorage.getItem('initialLanguage'))
        }
    })

})

    .then((res) => {

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            alert(`If the site isn't translated, please press on the language selector once after changing the language \n\nDacă site-ul nu s-a tradus, vă rugăm să apăsați inca o dată pe selectorul de limbă după ce schimbați limba`)
        }

        throw res
    })

    .catch((err) => {
        throw err
    })
