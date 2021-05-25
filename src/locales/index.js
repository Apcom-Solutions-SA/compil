import { createI18n } from 'vue-i18n'

const DEFAULT_LANG = 'fr'
const LOCALE_KEY = 'localeLanguage'

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
    // 将当前语种存到 localStorage中，保存用户的使用习惯
    window.localStorage.setItem(LOCALE_KEY, lang)
    // 给body添加语种相关的class，因为不同语言可能导致排版出现差异，我们需要适配
    Object.keys(locales).forEach(lang => {
        document.body.classList.remove(`lang-${lang}`)
    })
    document.body.classList.add(`lang-${lang}`)
    document.body.setAttribute('lang', lang)
    // 将当前语种存到Vue的全局配置中，以便未来可能的使用。
    // Vue.config.lang = lang
    i18n.locale = lang    
}

setup()
window.i18n = i18n; 
export default i18n