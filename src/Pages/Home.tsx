import React, { useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Theme from '../Styles/Theme';
import { actions, State } from '../Redux';
import { useDispatch, useSelector } from 'react-redux';
import gcuEngageLogo from '../Resources/Images/gcu-engage-app.png';
import gcuStudentLogo from '../Resources/Images/gcu-student-app.png';
import { useHistory } from 'react-router-dom';
import { changeThemeColor } from '../Utilties';

enum InputType {
    Text,
    Numeric,
}

const Home = () => {
    const styles = StyleSheet.create({
        wrapper: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        container: {
            flex: 1,
            padding: '10px 10px 0 10px',
            display: 'flex',
            flexDirection: 'column',
        },
        inputContainer: {
            marginTop: 15,
            ...Theme.addOn.boxShadow.mediumLight,
            ...Theme.addOn.borderRadius.mediumLight,
        },
    });

    const image: string | null = useSelector((state: State) => state.image);
    const name: string | null = useSelector((state: State) => state.name);
    const studentId: string | null = useSelector(
        (state: State) => state.studentId
    );

    useEffect(() => {
        changeThemeColor(Theme.color.primary);
    }, []);

    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div className={css(styles.wrapper)}>
            <AppBar title='GCU ID Bypass' />
            <div className={css(styles.container)}>
                <ImageInput
                    onUpload={(url) => dispatch(actions.setImage(url))}
                    image={image ? image : undefined}
                />
                <div className={css(styles.inputContainer)}>
                    <Input
                        type={InputType.Text}
                        placeholder='John Franklin'
                        prompt='Full Name'
                        value={name ? name : undefined}
                        onChange={(e) =>
                            dispatch(actions.setName(e.target.value))
                        }
                    />
                    <Input
                        type={InputType.Numeric}
                        placeholder='20659153'
                        prompt='Student ID'
                        value={studentId ? studentId : undefined}
                        onChange={(e) =>
                            dispatch(actions.setStudentId(e.target.value))
                        }
                    />
                </div>
                <div style={{ flex: 1 }} />
                <PageSelect
                    onEngageClick={() => history.push('/engageId')}
                    onStudentClick={() => history.push('/studentId')}
                />
            </div>
        </div>
    );
};

const AppBar = ({ title }: { title: string }) => {
    const styles = StyleSheet.create({
        container: {
            height: 50,
            background: Theme.color.primary,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2em',
            fontWeight: 500,
            ...Theme.addOn.boxShadow.medium,
        },
    });
    return (
        <div className={css(styles.container)}>
            <div>{title}</div>
        </div>
    );
};

const ImageInput = ({
    onUpload,
    image = 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
    selfSetImage = false,
}: {
    onUpload?: (url: string) => void;
    image?: string | undefined;
    selfSetImage?: boolean;
}) => {
    const inputRef = React.useRef(null);
    const uploadedImage = React.useRef(null);
    const handleImageUpload = (e: any) => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (onUpload) onUpload(e.target.result);
                if (!selfSetImage) return;
                const { current }: { current: any } = uploadedImage;
                if (!current) return;
                current.file = file;
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const styles = StyleSheet.create({
        container: {
            ...Theme.addOn.boxShadow.mediumLight,
            ...Theme.addOn.borderRadius.mediumLight,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 0',
            height: 150,
        },
        text: {
            fontSize: '1em',
        },
        input: {
            position: 'absolute',
            opacity: 0,
        },
        imageWrapper: {
            position: 'relative',
            width: 115,
            height: 115,
        },
        imageDisplay: {
            top: 0,
            position: 'absolute',
            ...Theme.addOn.fullSize,
            objectFit: 'cover',
        },
    });
    return (
        <div className={css(styles.container)}>
            <div className={css(styles.text)}>Select an image to show</div>
            <input
                ref={inputRef}
                className={css(styles.input)}
                type='file'
                accept='image/*'
                multiple={false}
                onChange={handleImageUpload}
            />
            <div
                className={css(styles.imageWrapper)}
                onClick={() => (inputRef!.current as any).click()}
            >
                <img
                    ref={uploadedImage}
                    alt=''
                    className={css(styles.imageDisplay)}
                    src={image}
                />
            </div>
        </div>
    );
};

const Input = ({
    type,
    prompt,
    placeholder = '',
    value = '',
    onInput,
    onChange,
}: {
    type: InputType;
    prompt?: string;
    placeholder: string;
    value?: string;
    onInput?: ((event: React.FormEvent<HTMLInputElement>) => void) | undefined;
    onChange?:
        | ((event: React.ChangeEvent<HTMLInputElement>) => void)
        | undefined;
}) => {
    const styles = StyleSheet.create({
        wrapper: {
            display: 'flex',
            justifyContent: 'center',
            height: 40,
        },
        container: {
            width: 245,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            ...Theme.addOn.borderRadius.light,
        },
        prompt: {
            height: 22,
            fontSize: '1.05em',
            // fontWeight: 500,
        },
        input: {
            flex: 1,
            maxWidth: 150,
            height: 22,
            fontSize: '1.05em',
            border: 'none',
            // borderBottom: `1px solid ${Theme.color.primary}`,
            boxShadow: `inset 0 -1px 0 0 ${Theme.color.primary}`,
            outline: 'none',
            transition: '0.4s ease-in-out',
            ':focus': {
                // borderBottom: `2px solid ${Theme.color.primary}`,
                boxShadow: `inset 0 -2px 0 0 ${Theme.color.primary}`,
            },
        },
    });
    return (
        <div className={css(styles.wrapper)}>
            <div className={css(styles.container)}>
                {prompt !== undefined && (
                    <div className={css(styles.prompt)}>{prompt}</div>
                )}
                <input
                    className={css(styles.input)}
                    type='text'
                    placeholder={placeholder}
                    value={value}
                    onInput={(e) => {
                        if (type === InputType.Numeric) {
                            e.currentTarget.value = e.currentTarget.value
                                .split('')
                                .filter((c: any) => !isNaN(c - parseInt(c)))
                                .join('');
                        }
                        if (onInput) onInput(e);
                    }}
                    onChange={onChange}

                    // onUpdate={onUpdate}
                />
            </div>
        </div>
    );
};

const PageSelect = ({
    onEngageClick,
    onStudentClick,
}: {
    onEngageClick?: () => void;
    onStudentClick?: () => void;
}) => {
    const styles = StyleSheet.create({
        wrapper: {
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        container: {
            height: '100%',
            width: 170,
            background: Theme.color.white,
            color: '#fff',
            fontSize: '1.2em',
            fontWeight: 500,
            ...Theme.addOn.boxShadow.medium,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 7.5px',
        },
        imageWrapper: {
            height: 65,
            width: 65,
            overflow: 'hidden',
            ...Theme.addOn.borderRadius.light,
            ...Theme.addOn.boxShadow.light,
        },
        image: {
            objectFit: 'cover',
            transform: 'scale(1.2)',
            ...Theme.addOn.fullSize,
        },
    });
    return (
        <div className={css(styles.wrapper)}>
            <div className={css(styles.container)}>
                <div
                    className={css(styles.imageWrapper)}
                    onClick={onEngageClick}
                >
                    <img
                        className={css(styles.image)}
                        src={gcuEngageLogo}
                        alt='GCU Engage Logo'
                    />
                </div>
                <div
                    className={css(styles.imageWrapper)}
                    onClick={onStudentClick}
                >
                    <img
                        className={css(styles.image)}
                        src={gcuStudentLogo}
                        alt='GCU Student Logo'
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
