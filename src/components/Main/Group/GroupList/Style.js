const style = () => ({
    rightContainer: {
        height: '740px',
        width: '27%',

        position: 'fixed',
        right: 30,
        justifyContent: 'center',

        // backgroundColor: 'white',
        borderRadius: 10,
        // boxShadow: '1px 1px 5px 1px #e4e4e4',
    },
    searchContainer: {
        margin: "20px auto",
        height: 'auto'
    },
    searchForm: {
        width: '100%',
        height: 33,
        padding: '20px 7px',
        border: '1px solid #e4e4e4',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#e4e4e4'
    },
    searchIcon: {
        color: '#c3c3c3 !important',
        fontSize: '27px !important',
        margin: '0 4px'
    },
    searchInput: {
        fontSize: 15
    },
    usersRecommend: {
        margin: '0 auto',
        height: "80%",
        overflow: 'auto',
    },
    groupList: {
        padding: '0 !important'
    },
    groupItem: {
        padding: '10px 0 !important',
        borderBottom: '1px solid #e0e0e0',
        alignItems: 'center'
    },
    groupName: {
        fontWeight: 'bold',
        color: 'black'
    },
    userIndustry: {
        fontSize: '13px !important',
        color: 'grey'
    },
    btnFollow: {
        textTransform: 'initial',
        fontSize: 13,
        width: '30%',
        padding: 5,
        backgroundColor: '#337ab7',
        color: 'white',
        '&:hover': {
            backgroundColor: '#005a8c',
        }
    }
})

export default style