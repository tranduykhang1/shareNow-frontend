const style = () => ({
    listContainer: {
        borderRight: '1px solid #CCCCCC',
        height: '100%',
    },
    listHeader: {
        padding: "0 15px",
        height: '61px',
        borderBottom: '1px solid #CCCCCC',
        alignItems: 'center'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25
    },
    createGroupIcon: {
        fontSize: '22px !important',
        color: '#2196f3 !important',
        cursor: 'pointer',
        marginLeft: 5,
    },
    AddMemberIcon: {
        fontSize: '22px !important',
        color: '#2196f3 !important',
        cursor: 'pointer'
    },
    listBody: {
        marginTop: 10,
        height: '83%'
    },
    searchBar: {
        borderBottom: '1px solid #CCCCCC'
    },
    searchForm: {
        margin: 10,
        padding: "0 7px",
        borderRadius: 7,
        alignItems: 'center',
        display: 'flex',

        backgroundColor: "#D6D6D6"
    },
    searchIcon: {
        fontSize: '20px !important',
        color: 'grey !important'
    },
    searchInput: {
        fontSize: 15
    },
    showUserList: {
        overflow: 'auto',
        height: '100%',
    },
    userList: {
        padding: "0 !important",
    },
    userItemActive: {
        backgroundColor: "#e0e0e0",
        height: 70
    },
    userItem: {
        // padding: "5px 10px",
        height: 70,
        borderBottom: '1px solid #EEEEEE',
        // transition: '.3s',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#F7F7F7'
        }
    },
    userAvatar: {
        color: 'grey',
        backgroundColor: "#e8e8e8 !important"
    },
    userName: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: '13px !important',

    },
    userMessage: {
        fontSize: 15,
    },
    messageTime: {
        fontSize: '10px !important',
        color: 'grey'
    },
    isOnline: {
        color: 'green'
    }

})
export default style