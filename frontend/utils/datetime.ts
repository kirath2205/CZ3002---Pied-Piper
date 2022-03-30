export const convertDate = (date: Date) => {
    return date.toLocaleDateString('en-us', { month: 'short', year: 'numeric', day: 'numeric', weekday: 'short' });
};

export const getDuration = (start: Date, end: Date) => {
    return `${start.toLocaleTimeString('en-us', { hour: 'numeric', minute: '2-digit' })} to ${end.toLocaleTimeString(
        'en-us',
        {
            hour: 'numeric',
            minute: '2-digit',
        }
    )}`;
};
