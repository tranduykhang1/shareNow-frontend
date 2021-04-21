const style = () => ({
    commentItem: {
        borderBottom: '1px solid #ededed',
    },
    commentHeader: {
        padding: '15px 0'
    },
    commentAvatar: {
        background: 'grey !important',
        margin: '0 7px !important',
    },
    commentTextPane: {
        backgroundColor: '#ededed !important',
        padding: "5px 10px",
        borderRadius: 7
    },
    commentUsername: {
        fontWeight: 'bold',
        marginRight: 5
    },
    commentContent: {
        color: 'black !important'
    },
    commentAt: {
        fontSize: '12px !important',
        color: 'grey',
        paddingTop: 4
    },
    reply: {
        position: 'relative',
        top: -13,
        left: 60,
        width: '40%'
    },
    replyTo: {
        fontSize: '10px !important',
        color: '#bebebe !important',
        cursor: 'pointer',
        "&:hover": {
            color: '#cecece !important',
        }
    }
})
export default style