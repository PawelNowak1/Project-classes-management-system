export const sectionStates = {
    registered: 'reg',
    open: 'open',
    cancelled: 'cancel',
    closed: 'close',
    finished: 'fin',
};

export const getStateName = (state) => {
    switch (state) {
        case sectionStates.registered:
            return 'Zarejestrowana';
        case sectionStates.open:
            return 'Otwarta';
        case sectionStates.cancelled:
            return 'Odwołana';
        case sectionStates.closed:
            return 'Zamknięta';
        case sectionStates.finished:
            return 'Zakończona';
        default:
            return '-';
    }
};

export const getStateCode = (stateName) => {
    switch (stateName) {
        case 'Zarejestrowana':
            return sectionStates.registered;
        case 'Otwarta':
            return sectionStates.open;
        case 'Odwołana':
            return sectionStates.cancelled;
        case 'Zamknięta':
            return sectionStates.closed;
        case 'Zakończona':
            return sectionStates.finished;
        default:
            return null;
    }
};
