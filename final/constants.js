SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_WORD: 'required-word',
    WORD_MISSING: 'noSuchId',
};

MESSAGES = {
    [SERVER.AUTH_INSUFFICIENT]: 'We could not find a match for your username. Please double-check your input and try again.',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid username, consisting of letters and/or numbers.',
    [SERVER.REQUIRED_WORD]: 'Please enter the word to proceed.',
    default: 'Something went wrong. Please try again later.',
};

module.exports = {
    SERVER,
    MESSAGES,
};