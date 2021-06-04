const style = () => ({
    searchForm: {
        display: 'flex',
        alignItems: 'center',
        height: 45,
        width: '100%',
        backgroundColor: '#e4e4e4',
        padding: 15,
        borderRadius: 5
    },
    searchIcon: {
        fontSize: '27px !important',
        color: '#BABABA !important',
        marginRight: 5
    },
    searchInput: {
        border: "none",
        background: 'none',
        outline: "none",
        fontSize: 17,
        width: '100%',

        "&::placeholder": {
            color: '#BABABA'
        }
    },
    filterItems: {
        justifyContent: 'center',
        padding: 10,
        borderRadius: 8,
        width: '100%',
        cursor: 'pointer'
    },
    filterIcons: {
        fontSize: "20px !important",
        marginRight: 5
    }

})

export default style