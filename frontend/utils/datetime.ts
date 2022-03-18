export const convertDate = (date: Date) => {
    return date.toLocaleDateString('fr-ca');
};

export const getHourAndMinutes = (date: Date) => {
    return date.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' }).split(' ')[0];
};
