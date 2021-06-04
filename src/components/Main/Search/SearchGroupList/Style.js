const style = () => ({
    groupList: {
        padding: '0 !important',
        color: 'black !important',
        borderRadius: 7
    },
    groupItem: {
        color: 'black',
        '&:hover': {
            color: 'black',
        }
    },
    groupItemNested: {
        padding: '15px',
        backgroundColor: '#f1f1f1',
        margin: '10px 0',
        borderRadius: 7
    },
    avatar: {
        border: '2px solid grey',
        color: 'grey !important',
        width: 50,
        height: 50
    },
    groupInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    groupName: {

    },
    groupDesc: {
        fontSize: 12,
        fontWeight: 500,
        margin: '5px 0 0 0 !important'
    },
    btnFollow: {
        backgroundColor: '#295375 !important',
        color: 'white',
        fontSize: '10px !important',
        textTransform: 'initial',
        height: '5vh',
    }

})

export default style