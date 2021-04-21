const style = () => ({
    uploadCard: {
        height: 150,
        margin: 'auto',
        flexWrap: 'nowrap',
        position: 'relative'
    },
    cardAvatar: {
        position: 'absolute',
        zIndex: 2,

    },
    avatar: {
        height: 130,
        width: 130,
        border: '5px solid white',
        fontSize: 80,
        color: 'white',
        background: '#eaeaea !important',
        boxShadow: '-3px 0px 5px 0px #e4e4e4'
    },
    cardBody: {
        backgroundColor: 'white',
        height: 110,
        zIndex: 1,

        borderRadius: 10,
        marginLeft: 50,
        padding: '10px 30px 20px 100px',
        boxShadow: '1px 1px 5px 1px #e4e4e4;',
    },
    capInput: {
        resize: 'none',
        width: '90%',
        maxWidth: '100%',
        padding: 10,
        border: 'none',
        fontSize: 15,

        "&:focus": {
            border: 'none',
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
        color: '#009612 !important',
        fontSize: '20px !important',
        cursor: 'pointer'
    },
    iconMood: {
        color: '#ff972b !important',
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
    modal: {
        width: '40% !important'
    },
    exDesc: {
        fontSize: 13,
        marginRight: 5
    }
})

export default style