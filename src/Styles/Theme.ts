const Theme = {
    addOn: {
        fullSize: {
            width: '100%',
            height: '100%',
        },
        centerContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        boxShadow: {
            light: {
                boxShadow:
                    '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            },
            mediumLight: {
                boxShadow:
                    '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
            },
            medium: {
                boxShadow:
                    '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
            },
            mediumStrong: {
                boxShadow:
                    '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
            },
            strong: {
                boxShadow:
                    '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
            },
        },
        borderRadius: {
            light: {
                borderRadius: 4,
            },
            mediumLight: {
                borderRadius: 6,
            },
            medium: {
                borderRadius: 7,
            },
            mediumStrong: {
                borderRadius: 10,
            },
            strong: {
                borderRadius: 14,
            },
        },
    },
    color: {
        primary: '#5e35b1',
        primaryLight: '#9162e4',
        primaryDark: '#280680',
        primaryText: '#ffffff',

        secondary: '#9575cd',
        secondaryLight: '#c7a4ff',
        secondaryDark: '#65499c',
        secondaryText: '#000000',

        white: '#ffffff',

        engageGreen: '#3dc292',
        engageTheme: '#371765',
        studentTheme: '#4c4c4c',
    },
};

export default Theme;
