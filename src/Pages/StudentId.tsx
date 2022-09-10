import React, { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Barcode from 'react-barcode';

import { changeThemeColor, getPHXTime } from '../Utilities';
import Theme from '../Styles/Theme';
import GCUBanner from '../Resources/Images/gcu-banner.png';
import ActivityIcon from '../Resources/Images/activity-icon.png';
import RefreshIcon from '../Resources/Images/refresh-icon.png';
import { useSelector } from 'react-redux';
import { State } from '../Redux';

import iconBar1 from '../Resources/Images/icon-bar1.png';
import iconBar2 from '../Resources/Images/icon-bar2.png';
import iconBar3 from '../Resources/Images/icon-bar3.png';
import iconBar4 from '../Resources/Images/icon-bar4.png';
import iconBar5 from '../Resources/Images/icon-bar5.png';

// need to figure out font
// font changes per device
// perhaps using default font on device
// maybe using roboto and san francisco
// font maybe already default front index.css file

const StudentId = () => {
    useEffect(() => {
        changeThemeColor(Theme.color.studentTheme);
    }, []);

    const styles = StyleSheet.create({
        wrapper: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
    });

    const image = useSelector((state: State) => state.image);
    const studentId = useSelector((state: State) => state.studentId);

    return (
        <>
            <div className={css(styles.wrapper)}>
                <Header />
                <IDCard
                    image={image ? image : undefined}
                    studentId={studentId ? studentId : undefined}
                />
                <Navigation />
            </div>
        </>
    );
};

const Header = () => {
    const styles = StyleSheet.create({
        wrapper: {
            height: 70,
            width: '100%',
            background: 'linear-gradient(to right, #450966, #532496)',
            ...Theme.addOn.centerContainer,
        },
        title: {
            width: 86.5,
            color: '#fff',
            fontWeight: 500,
            fontSize: '1.12em',
        },
    });

    return (
        <div className={css(styles.wrapper)}>
            <div className={css(styles.title)}>Student ID</div>
        </div>
    );
};

const IDCard = ({
    image = 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
    studentId = '20002000',
}: {
    image?: string | undefined;
    studentId?: string | undefined;
}) => {
    const styles = StyleSheet.create({
        wrapper: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            margin: '18px 15px', // not confirmed
            ...Theme.addOn.boxShadow.medium,
            ...Theme.addOn.borderRadius.mediumStrong,
            overflow: 'hidden',
        },
        topBanner: {
            // height: 80,
            flexBasis: 80,
            flexShrink: 0,
            width: '100%',
            background: 'linear-gradient(to right, #450966, #532496)',
            ...Theme.addOn.centerContainer,
        },
        topBannerImageWrapper: {
            height: 40,
        },
        topBannerImage: {
            ...Theme.addOn.fullSize,
            objectFit: 'contain',
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            margin: 9, // not confirmed
            marginBottom: 0,
        },
        activityFeeWrapper: {
            background: '#C8E6C9',
            color: '#20691C',
            height: 47,
            ...Theme.addOn.centerContainer,
        },
        activityFeeContent: {
            height: 16,
            display: 'flex',
        },
        activityFeeIconWrapper: {
            height: 16,
            width: 16,
            marginRight: 6,
        },
        activityFeeIcon: {
            ...Theme.addOn.fullSize,
            objectFit: 'contain',
        },
        activityFeeText: {
            lineHeight: 0.9,
            fontSize: '1.2em',
        },
        refreshButtonWrapper: {
            position: 'relative',
            left: 'calc(100% - 38px)',
            // marginTop: 19,
            marginTop: 14,
            height: 29,
            width: 38,
        },
        refreshButton: {
            ...Theme.addOn.fullSize,
            objectFit: 'contain',
        },
        profileImageWrapper: {
            ...Theme.addOn.centerContainer,
            flex: 1,
            marginBottom: 5,
            // padding: '0 42px',
            padding: '0 50px',

            maxWidth: '89%',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            height: 0,
        },
        profileImage: {
            height: '100%',
            // width: 279,
            // width: '60%',
            width: '100%',
            objectFit: 'cover',
            ...Theme.addOn.borderRadius.medium,
        },
        name: {
            fontWeight: 600,
            fontSize: '1.85em',
            textAlign: 'center',
            height: 35,
        },
        studentTag: {
            marginTop: 9,
            background: '#FF6A00',
            color: '#fff',
            ...Theme.addOn.centerContainer,
            ...Theme.addOn.borderRadius.light,
            width: 86,
            height: 30,
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
        },
        studentTagText: {
            height: 14.5,
            fontSize: '1.12em',
            lineHeight: 0.8,
        },
        barcodeWrapper: {
            // marginTop: 18,
            marginTop: 10,
            height: 58,
            width: 258,
            position: 'relative',
            left: '50%',
            transform: 'translate(-50%)',
            // background: 'red',
        },
        timeFlowWrapper: {
            marginTop: 15.6,
            height: 20,
            position: 'relative',
        },
        timeFlow: {
            background: '#1B804A',
            height: '100%',
            position: 'absolute',

            animationName: [
                {
                    '0%': {
                        left: 0,
                        right: '100%',
                    },

                    '50%': {
                        left: 0,
                        right: 0,
                    },
                    '50.1%': {
                        left: '100%',
                        right: 0,
                    },

                    '100%': {
                        left: 0,
                        right: 0,
                    },
                },
            ],
            animationDuration: '4s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
        },
        bottomBanner: {
            // height: 80,
            flexBasis: 80,
            flexShrink: 0,
            width: '100%',
            background: 'linear-gradient(to right, #450966, #532496)',
            ...Theme.addOn.centerContainer,
        },
        bottomBannerLastUpdated: {
            fontStyle: 'oblique',
            color: '#9271AE',
        },
        bottomBannerTime: {
            color: '#fff',
            fontWeight: 600,
        },
    });

    const name = useSelector((state: State) => state.name);

    const [timeCreated, setTimeCreated] = useState(getPHXTime(new Date()));

    useEffect(() => {
        const timer = setInterval(
            () => setTimeCreated(getPHXTime(new Date())),
            5000
        );
        return () => clearInterval(timer);
    }, []);
    let dateOutput = timeCreated.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    let timeOutput = timeCreated.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    });
    if (timeOutput.endsWith('AM') || timeOutput.endsWith('PM')) {
        timeOutput =
            timeOutput.substring(0, timeOutput.length - 3) +
            timeOutput.substring(timeOutput.length - 2).toLowerCase();
    }
    const dateTimeOutput = dateOutput + ', ' + timeOutput;
    return (
        <div className={css(styles.wrapper)}>
            <div className={css(styles.topBanner)}>
                <div className={css(styles.topBannerImageWrapper)}>
                    <img
                        className={css(styles.topBannerImage)}
                        src={GCUBanner}
                        alt='Grand Canyon University'
                    />
                </div>
            </div>

            <div className={css(styles.content)}>
                <div className={css(styles.activityFeeWrapper)}>
                    <div className={css(styles.activityFeeContent)}>
                        <div className={css(styles.activityFeeIconWrapper)}>
                            <img
                                className={css(styles.activityFeeIcon)}
                                src={ActivityIcon}
                                alt=''
                            />
                        </div>
                        <div className={css(styles.activityFeeText)}>
                            Activity Fee
                        </div>
                    </div>
                </div>
                <div className={css(styles.refreshButtonWrapper)}>
                    <img
                        className={css(styles.refreshButton)}
                        src={RefreshIcon}
                        alt=''
                    />
                </div>
                <div className={css(styles.profileImageWrapper)}>
                    <img
                        className={css(styles.profileImage)}
                        src={image}
                        alt=''
                    />
                </div>
                <div className={css(styles.name)}>{name}</div>
                <div className={css(styles.studentTag)}>
                    <div className={css(styles.studentTagText)}>Student</div>
                </div>
                <div className={css(styles.barcodeWrapper)}>
                    <div
                        style={{
                            position: 'absolute',
                            top: 'calc(50% + 2px)',
                            left: '50%',
                            transform: 'translate(-50%, -50%) scaleX(1.6)',
                        }}
                    >
                        <Barcode
                            value={studentId}
                            format='CODE39'
                            displayValue={false}
                            width={1}
                            height={56}
                            background='transparent'
                        />
                    </div>
                    {/*     position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scaleX(1.6); */}
                </div>
            </div>
            <div className={css(styles.timeFlowWrapper)}>
                <div className={css(styles.timeFlow)} />
            </div>
            <div className={css(styles.bottomBanner)}>
                <div className={css(styles.bottomBannerLastUpdated)}>
                    Last updated:
                </div>
                <div className={css(styles.bottomBannerTime)}>
                    {dateTimeOutput}
                </div>
            </div>
        </div>
    );
};

const Navigation = () => {
    const styles = StyleSheet.create({
        wrapper: {
            height: 49,
            width: '100%',
            borderTop: '1px solid #999',
        },
        container: {
            display: 'flex',
            height: '100%',
            justifyContent: 'space-between',
            padding: '1px 15px',
        },
        barImageWrap: {
            height: '100%',
            width: 49,
        },
        iconBar: {
            ...Theme.addOn.fullSize,
            objectFit: 'contain',
        },
    });

    return (
        <div className={css(styles.wrapper)}>
            <div className={css(styles.container)}>
                <div className={css(styles.barImageWrap)}>
                    <img
                        className={css(styles.iconBar)}
                        src={iconBar1}
                        alt=''
                    />
                </div>
                <div className={css(styles.barImageWrap)}>
                    <img
                        className={css(styles.iconBar)}
                        src={iconBar2}
                        alt=''
                    />
                </div>
                <div className={css(styles.barImageWrap)}>
                    <img
                        className={css(styles.iconBar)}
                        src={iconBar3}
                        alt=''
                    />
                </div>
                <div className={css(styles.barImageWrap)}>
                    <img
                        className={css(styles.iconBar)}
                        src={iconBar4}
                        alt=''
                    />
                </div>
                <div className={css(styles.barImageWrap)}>
                    <img
                        className={css(styles.iconBar)}
                        src={iconBar5}
                        alt=''
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentId;
