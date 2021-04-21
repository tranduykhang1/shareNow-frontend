const style = () => ({
    headerContainer: {
        position: 'relative'
    },

    groupInfo: {
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px'
    },
    groupName: {
        color: 'white',
        fontSize: '25px !important',
        fontWeight: 'bold',
    },
    groupMember: {
        color: 'white',
        fontSize: '15px !important',
    },
    btnJoin: {
        height: 0,
        padding: 20,
        color: 'white',
        backgroundColor: 'transparent',
        border: '1px solid white',
        fontSize: 20,
        fontWeight: 600,
        textTransform: 'initial',
        transition: '.5s',

        "&:hover": {
            backgroundColor: 'white',
            color: 'black'
        }
    }

})

export default style;