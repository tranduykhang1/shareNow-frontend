const style = () => ({
    msgContainer: {
        position: "relative",
        height: '100%'
    },
    msgHeader: {
        padding: 10,
        borderBottom: "1px solid #CCCCCC",
    },
    userAvatar: {
        color: "white",
        backgroundColor: "gray !important",
    },
    userName: {
        fontWeight: "bold",
        fontSize: 15,
    },
    userState: {
        fontSize: "12px !important",
        color: "grey",
    },
    scrollView: {
        height: '84%'
    },
    msgBody: {
        display: "flex",
        flexDirection: "column",
        overflow: 'auto',
        height: '91%',
        backgroundColor: '#b2b2b21f',
        borderRight: '1px solid #CCCCCC',


        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            borderRadius: 10
        }
    },
    typing: {
        position: 'sticky',
        left: 0,
        bottom: 0,

        height: 50,
        width: 50,
        margin: '0 15px'

    },
    msgFooter: {
        borderTop: '1px solid #CCCCCC',
        position: "absolute",
        bottom: "0",
        width: "100%",

    },
    msgForm: {
        padding: "5px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: 'white',
        borderRadius: "0px 0px 10px",
    },
    attachIcon: {
        alignItems: "center",
        width: "auto",
        flexWrap: "nowrap",
        marginRight: 10
    },
    photoIcon: {
        fontSize: "20px !important",
        color: '#2196f3  !important',
        cursor: 'pointer'
    },
    emojiIcon: {
        fontSize: "20px !important",
        color: '#2196f3  !important',
        cursor: 'pointer'
    },
    msgInput: {
        fontSize: "13px !important",
        padding: "3px 10px",
        border: 'none',
        width: '100%',
    },
    inputFocused: {
        "& $msgFooter": {
            borderTop: '1px solid blue !important',
            backgroundColor: 'black'
        }
    },
    btnSendMsg: {
        "&:hover": {
            backgroundColor: "white !important",
        },
    },
    sendMsgIcon: {
        color: "#0478B9 !important",
        fontSize: "25px !important",
    },
});

export default style;