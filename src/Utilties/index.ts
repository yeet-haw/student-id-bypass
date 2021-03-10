export const changeThemeColor = (color: string) => {
    const metaThemeColor = document.querySelector('meta[name=theme-color]');
    if (!metaThemeColor) return;
    metaThemeColor.setAttribute('content', color);
};

export const getPHXTime = (time: Date) => {
    const invDate = new Date(
        time.toLocaleString('en-US', {
            timeZone: 'America/Phoenix',
        })
    );

    const diff = time.getTime() - invDate.getTime();
    return new Date(time.getTime() - diff);
};

export const isIOS = () => {
    return (
        [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod',
        ].includes(navigator.platform) ||
        // iPad on iOS 13 detection
        (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    );
};
