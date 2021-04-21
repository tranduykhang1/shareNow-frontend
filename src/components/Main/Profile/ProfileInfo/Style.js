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
        color: 'grey !important'
    },
    department: {
        color: 'grey !important'

    },
    industry: {
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
        width: '30%',
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