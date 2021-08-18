import { createI18n } from 'vue-i18n'

const LOCALE_KEY = 'localeLanguage'
const DEFAULT_LANG = window.localStorage.getItem(LOCALE_KEY)||'fr'

// get locales from vue-i18n-locales.generated.js
const locales = window.vuei18nLocales

const i18n = createI18n({
  locale: DEFAULT_LANG,
  fallbackLocale: 'fr',
  messages: locales,
})

export const setup = lang => {
  if (lang === undefined) {
    lang = window.localStorage.getItem(LOCALE_KEY)
    if (locales[lang] === undefined) {
      lang = DEFAULT_LANG
    }
  }
  window.localStorage.setItem(LOCALE_KEY, lang)
  Object.keys(locales).forEach(lang => {
    document.body.classList.remove(`lang-${lang}`)
  })
  document.body.classList.add(`lang-${lang}`)
  document.body.setAttribute('lang', lang)
  i18n.locale = lang
}

setup()
export default i18n