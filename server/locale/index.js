const util = require('util');
const { locales, DEFAULT_LOCALE } = require('../constants/locale');

const MESSAGES_BY_LANGUAGES = {
    [locales.ENGLISH]: require(`./${locales.ENGLISH}.json`),
};

class LocalizationDictionary {
    static getText(messageId, locale = DEFAULT_LOCALE, defaultMessage = '') {
        let messages = MESSAGES_BY_LANGUAGES[locale];
        if(!messages) {
            messages = MESSAGES_BY_LANGUAGES[DEFAULT_LOCALE];
        }

        return typeof messages[messageId] !== 'undefined' ? messages[messageId] : defaultMessage;
    }

    static getFormattedText (textId, locale, ...params) {
        const message = LocalizationDictionary.getText(textId, locale);
        return util.format(message, ...params);
    }
}

module.exports = LocalizationDictionary;