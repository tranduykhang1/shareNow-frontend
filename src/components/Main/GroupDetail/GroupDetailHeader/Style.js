const style = () => ({
    headerContainer: {
        position: 'relative'
    },
    editIcon: {
        position: 'absolute',
        top: 10,
        right: 40,
        color: 'white !important',
        fontSize: "25px !important",
        cursor: 'pointer'
    },
    trashIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        color: 'white !important',
        fontSize: "25px !important",
        cursor: 'pointer'
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