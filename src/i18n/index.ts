import { createI18n } from "vue-i18n";
import EN from "./en";
import ZH from "./zh";
const messages = {
    en: {
        ...EN
    },
    zh: {
        ...ZH
    }
}
const getCurrentLanguage = () => {
    const langCode: string = sessionStorage.getItem('lang') ? sessionStorage.getItem('lang')! : 'zh'
    sessionStorage.setItem('lang', langCode)
    return langCode
}
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: getCurrentLanguage() || 'zh',
    messages: messages
})
export default i18n