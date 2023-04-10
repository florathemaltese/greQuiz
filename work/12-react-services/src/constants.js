export const LOGIN_STATUS = {
    PENDING: 'pending',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn',
};

export const CLIENT =  {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
};

export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_WORD: 'required-word',
    WORD_MISSING: 'noSuchId',
};

export const MESSAGES = {
    [SERVER.AUTH_INSUFFICIENT]: 'We could not find a match for your username. Please double-check your input and try again.',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid username, consisting of letters and/or numbers.',
    [SERVER.REQUIRED_WORD]: 'Please enter the word to proceed.',
    default: 'Something went wrong. Please try again later.',
};
