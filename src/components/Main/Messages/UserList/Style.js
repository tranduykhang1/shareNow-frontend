const style = () => ({
    listContainer: {
        borderRight: '1px solid #CCCCCC'
    },
    listHeader: {
        padding: 19,
        borderBottom: '1px solid #CCCCCC'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25
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
        padding: 7,
        borderRadius: 7,
        alignItems: 'center',
        display: 'flex',

        backgroundColor: "#D6D6D6"
    },
    searchIcon: {
        color: 'grey !important'
    },
    searchInput: {
        fontSize: 15
    },
    showUserList: {
        overflow: 'auto',
        height: '100%'
    },
    userList: {
        padding: "0 !important"
    },
    userItem: {
        padding: "5px 10px",
        borderBottom: '1px solid #EEEEEE',
        transition: '.3s',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#F7F7F7'
        }
    },
    userName: {
        fontWeight: 'bold',
        color: 'black'
    },
    userMessage: {
        fontSize: 15,
    },
    messageTime: {
        fontSize: '12px !important',
        color: 'grey'
    },
    isOnline: {
        color: 'green'
    }

})
export default style