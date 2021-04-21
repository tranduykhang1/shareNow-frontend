const style = () => ({
    commentContainer: {

    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: '18px !important',
        margin: '10px 0 0 10px',
    },
    commentBody: {
        position: 'relative',
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
    commentBody: {
        position: 'relative',
        overflow: 'auto',
        height: 300,
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
    commentBodyExpand: {
        overflow: 'auto',
        height: 500,
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
    commentFooter: {
        background: 'white',
        width: '100%',
        display: 'block',
        position: 'absolute',
        bottom: 0,
        margin: '0 !important',
        boxShadow: '0px 0px 3px 1px gainsboro',

    },
    commentForm: {
        width: '90%',
        padding: '0 10px',
        margin: '15px auto 0 auto !important',
        backgroundColor: '#d3d3d3',
        borderRadius: 40,
        display: 'flex',
        alignItems: 'center',
    },
    emojiIcon: {
        color: '#ff6a00  !important',
        fontSize: '25px !important'
    },
    commentInput: {
        fontSize: 14,
        padding: '3px 5px',
    },
    sendCommentIcon: {
        color: '#0478B9 !important',
        fontSize: '25px !important'
    }
})

export default style