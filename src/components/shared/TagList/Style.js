const style = () => ({
    container: {
        width: '100%',
        display: 'flex',
        position: "sticky",
        top: 0,
        zIndex: "1000"
    },
    tagList: {
        display: 'flex',
        listStyle: 'none',
        margin: '0 auto'
    },
    tagItem: {
        marginBottom: 10,
        // borderRadius: 25,
        fontWeight: '500',
        color: 'white',
        padding: '6px 10px',
        cursor: 'pointer',
        transition: '.2s',

        "&:hover": {
            opacity: '0.8'
        }
    }
})

export default style