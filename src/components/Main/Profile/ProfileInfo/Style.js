const color = {
    bgDone: '#8ecdff',
    bgClose: "#ffc4c4",
}

const style = () => ({
    backgroundWrapper: {
        position: 'relative',
        height: 350
    },
    backgroundCover: {
        height: 280,
        borderRadius: 7,
        backgroundSize: 'cover'
    },
    avatar: {
        border: '3px solid white',
        width: 130,
        height: 130,
        left: '50%',
        transform: 'translateX(-50%)',
        top: -40
    },
    cameraIcon: {
        color: 'grey !important',
        fontSize: '18px !important',
        position: 'absolute',
        top: "60%",
        left: '50%',
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer'
    },
    updateBgCover: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        cursor: 'pointer',
        background: '#cecece',
        padding: 5,
        borderRadius: 4,
        fontWeight: 400,
        fontSize: '12px !important',
        opacity: '.5',
        transition: ".2s",

        "&:hover": {
            opacity: 1
        }
    },
    // confirm update photo
    backgroundCancel: {
        display: 'flex',
        backgroundColor: color.bgClose,
        padding: '5px 15px',
        borderRadius: 3,
        cursor: 'pointer'
    },
    backgroundSave: {
        display: 'flex',
        backgroundColor: color.bgDone,
        color: 'white',
        padding: '5px 15px',
        borderRadius: 3,
        marginLeft: 5,
        cursor: 'pointer'
    },
    confirmBackground: {
        width: '100%',
        height: "100%",
        alignItems: 'center',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))`,
        borderRadius: 7
    },
    confirmAvatar: {
        position: 'absolute',
        top: 10,
        left: '50%',
        transform: 'translateX(-50%)'
    },
    avatarCancel: {
        display: 'flex',
        backgroundColor: color.bgClose,
        color: 'black',
        padding: '5px 10px',
        borderRadius: 3,
        cursor: 'pointer'
    },
    avatarSave: {
        display: 'flex',
        backgroundColor: color.bgDone,
        color: 'white',
        padding: '5px 10px',
        borderRadius: 3,
        marginLeft: 5,
        cursor: 'pointer'

    },
    confirmIcon: {
        color: 'white !important',
    },
    //
    importantInfo: {
        marginTop: '30px',
        textAlign: 'center'
    },
    userInfo: {
        justifyContent: 'space-between',
    },
    fullName: {
        fontWeight: 'bold',
        fontSize: '20px !important'
    },
    username: {
        color: 'grey !important',
        marginBottom: 10
    },
    department: {
        color: 'grey !important'

    },
    industry: {
        color: 'grey !important'

    },
    course: {
        color: 'grey !important'

    },
    class: {
        color: 'grey !important'
    },
    infoIcon: {
        fontSize: '15px !important',
        color: 'grey !important'
    },
    joinAt: {
        color: 'grey !important'

    },
    followState: {
        color: 'grey !important'
    },
    btnUpdate: {
        textTransform: 'initial',
        border: '1px solid #0478B9',
        color: '#0478B9',
        borderRadius: 20,
        padding: 20,
        height: 0,
        width: 'auto',
        transition: '.4s',

        '&:hover': {
            color: 'white',
            backgroundColor: '#0478B9',
            border: '1px solid white',

        }
    },
    timeline: {

    },
})

export default style;