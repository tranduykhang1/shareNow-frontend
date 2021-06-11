const style = () => ({
    uploadCard: {
        height: 130,
        margin: 'auto',
        flexWrap: 'nowrap',
        position: 'relative'
    },
    cardAvatar: {
        position: 'absolute',
        zIndex: 2,

    },
    avatar: {
        height: 90,
        width: 90,
        border: '5px solid #fdfdfd',
        fontSize: 80,
        color: 'white',
        background: '#fdfdfd !important',
        boxShadow: '-3px 0px 5px 0px #e4e4e4'
    },
    clickToShare: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: "#f3f3f3",
        padding: '10px 15px',
        cursor: 'pointer'
    },
    slogan: {
        color: 'grey'
    },

    cardBody: {
        backgroundColor: 'white',
        height: 70,
        zIndex: 1,

        borderRadius: 10,
        marginLeft: 50,
        padding: '0 27px 0 60px',
        boxShadow: '1px 1px 5px 1px #e4e4e4;',
        display: 'flex',
        alignItems: 'center'
    },
    capInput: {
        resize: 'none',
        width: '100%',
        maxWidth: '100%',
        // padding: 10,
        border: 'none',
        borderRadius: 5,
        fontSize: 13,
        // border: '1px solid #f1f1f1',

        "&:focus": {
            // border: '1px solid #f1f1f1',
            outline: 'none'
        }
    },
    cardFooter: {
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #eaeaea',
        paddingTop: 10
    },
    icons: {
        border: '1px solid #cacaca',
        borderRadius: 4,
        padding: '2px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    listIcon: {
        display: 'flex',
        padding: '0 !important',
    },
    listItem: {
        width: 0,
        margin: "0 2px",
        padding: '0 !important',
        paddingRight: '25px !important'
    },
    iconPhoto: {
        color: '#006fad !important ',
        fontSize: '20px !important',
        cursor: 'pointer'
    },
    iconMood: {
        color: '#006fad !important',
        fontSize: '20px !important',
        cursor: 'pointer'
    },
    btnShare: {
        padding: '0 !important',
        backgroundColor: '#0478B9',
        height: 10,
        // borderRadius: 25,
        padding: 15,
        // marginBottom: 5,
        color: 'white',
        textTransform: 'initial',

        '&:hover': {
            backgroundColor: '#005a8c',
        }
    },
    // upload form modal
    title: {
        fontSize: '15px !important',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modal: {
        width: '40% !important'
    },
    exDesc: {
        fontSize: '13px !important',
        margin: '0 !important',
        marginRight: 5,
        color: 'grey',

    }
})

export default style