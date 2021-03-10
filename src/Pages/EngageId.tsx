import React, { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Theme from '../Styles/Theme';
import { changeThemeColor, getPHXTime } from '../Utilties';
import backArrow from '../Resources/Images/back-arrow.png';
import exitIcon from '../Resources/Images/engage-exit.png';
import { useSelector } from 'react-redux';
import { State } from '../Redux';
import { useHistory } from 'react-router-dom';
import { QRCode } from 'react-qr-svg';

const EngageId = ({ ios = false }: { ios?: boolean }) => {
    useEffect(() => {
        changeThemeColor(Theme.color.engageTheme);
    }, []);

    const styles = StyleSheet.create({
        wrapper: {
            height: '100%',
            width: '100%',
        },
        information: {
            marginTop: 64 + 20.5 - 4 - (ios ? 7 : 0),
            fontFamily: 'Argr1000',
            ...(Theme.addOn.centerContainer as any),
            color: '#1A1A1A',
        },
        name: {
            fontSize: '2em',
            fontWeight: 500,
        },
        subText: {
            fontSize: '0.89em',
        },
        qrWrapper: {
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: 47,
            width: 163,
            height: 163,
            ...(ios && {
                marginTop: 36,
                width: 220,
                height: 220,
            }),
        },
        createdText: {
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#484848',
            marginTop: 56,
            height: 8.5,
            // width: 247,
            fontSize: '0.81em',
            textAlign: 'center',
            lineHeight: 0.7,
            ...(ios && {
                marginTop: 38,
            }),
        },
        bottomSpace: {
            height: 13,
        },
    });

    const history = useHistory();

    const image = useSelector((state: State) => state.image);
    const name = useSelector((state: State) => state.name);

    const timeCreated = getPHXTime(new Date());

    return (
        <div className={css(styles.wrapper)}>
            <Header
                ios={ios}
                onBackClick={() => history.goBack()}
                image={image ? image : undefined}
            />
            <div className={css(styles.information)}>
                <div className={css(styles.name)}>{name}</div>
                <div className={css(styles.subText)}>
                    You're good to go! See you on campus!
                </div>
            </div>
            <CurrentTime ios={ios} />
            <div className={css(styles.qrWrapper)}>
                <QRCode
                    bgColor='#FFFFFF'
                    fgColor='#000000'
                    level='L'
                    style={Theme.addOn.fullSize}
                    value='us.involvio.com/webapp/health_pass_qr_scan'
                />
            </div>
            <div className={css(styles.createdText)}>
                Created at{' '}
                {timeCreated.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
                ,{' '}
                {timeCreated.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                })}
            </div>
            <div className={css(styles.bottomSpace)} />
        </div>
    );
};

const Header = ({
    ios = false,
    image = 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
    onBackClick,
}: {
    ios?: boolean;
    image?: string | undefined;
    onBackClick?: () => void;
}) => {
    const styles = StyleSheet.create({
        wrapper: {
            background: '#000',
            paddingTop: 10,
        },
        purpleBack: {
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            height: 20,
            borderRadius: 10,
            width: 'calc(100% - 42px)',
            background: '#471f85',
        },
        container: {
            position: 'relative',
            fontFamily: 'Argr1000',
            height: 200,
            width: '100%',
            color: 'white',
            background: Theme.color.engageGreen,
            ...(ios && {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            }),
        },
        topBar: {
            position: 'absolute',
            top: 20.5,
            left: 19,
            display: 'flex',
            height: 16,
            ...(ios && {
                top: 22,
                left: '50%',
                transform: 'translateX(-50%)',
            }),
        },
        imageWrapper: {
            width: 17,
            height: 13,
            marginRight: 30,
            ...(ios && {
                display: 'none',
            }),
        },
        image: {
            ...Theme.addOn.fullSize,
        },
        exitWrapper: {
            position: 'absolute',
            top: 22,
            right: 19,
            width: 14,
            height: 14,
        },
        exit: {
            ...Theme.addOn.fullSize,
        },
        title: {
            fontSize: 20,
            fontWeight: 500,
            // lineHeight: 17,
            lineHeight: 1,
            ...(ios && {
                fontSize: 18,
            }),
        },
        profileImageWrapper: {
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translate(-50%, 50%)',
            height: 128,
            width: 128,
            borderRadius: '50%',
            background: 'red',
            overflow: 'hidden',
        },
        profileImage: {
            ...Theme.addOn.fullSize,
            objectFit: 'cover',
        },
    });

    return (
        <div className={css(ios && styles.wrapper)}>
            {ios && <div className={css(styles.purpleBack)} />}
            <div className={css(styles.container)}>
                <div className={css(styles.topBar)}>
                    <div
                        className={css(styles.imageWrapper)}
                        onClick={onBackClick}
                    >
                        <img
                            className={css(styles.image)}
                            src={backArrow}
                            alt='Back Button'
                        />
                    </div>
                    <div className={css(styles.title)}>Health Pass</div>
                </div>
                {ios && (
                    <div
                        className={css(styles.exitWrapper)}
                        onClick={onBackClick}
                    >
                        <img
                            className={css(styles.exit)}
                            src={exitIcon}
                            alt='Exit'
                        />
                    </div>
                )}
                <div className={css(styles.profileImageWrapper)}>
                    <img
                        className={css(styles.profileImage)}
                        src={image}
                        alt='Profile'
                    />
                </div>
            </div>
        </div>
    );
};

const CurrentTime = ({ ios = false }: { ios?: boolean }) => {
    const styles = StyleSheet.create({
        wrapper: {
            marginTop: 38 - 1 + (ios ? 3 : 0),
            position: 'relative',
            fontFamily: 'Argr1000',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        },
        currentTimeTitle: {
            // fontSize: '0.9em',
            fontSize: '0.75em',
            height: 10,
            // width: 86,
            lineHeight: 1,
            color: '#484848',
            marginBottom: 20 - (ios ? 5 : 0),
        },
        currentTime: {
            height: 26,
            // width: 144,
            fontSize: '2em',
            lineHeight: 0.75,
            color: '#2C8D58',
            fontWeight: 500,
            marginBottom: 19,
        },
        expireTime: {
            height: 33,
            // width: 274,
            padding: '10px 17px',
            backgroundColor: '#FBE5E9',
            color: '#75252B',
            borderRadius: 34,
            lineHeight: 0.9,
            fontSize: '0.88em',
            fontWeight: 500,
        },
    });

    const initialTime = getPHXTime(new Date());

    const [time, setTime] = useState(initialTime);
    useEffect(() => {
        const timer = setInterval(() => setTime(getPHXTime(new Date())), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={css(styles.wrapper)}>
            <div className={css(styles.currentTimeTitle)}>Current Time</div>
            <div className={css(styles.currentTime)}>
                {time
                    .toLocaleTimeString([], {
                        hour: ios ? 'numeric' : '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    })
                    .toLowerCase()}
            </div>
            <div className={css(styles.expireTime)}>
                Expires at{' '}
                {initialTime.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                })}
                , 11:59 PM
            </div>
        </div>
    );
};
export default EngageId;
