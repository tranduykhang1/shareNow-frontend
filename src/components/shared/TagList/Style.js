const style = () => ({
    container: {
        width: '100%',
        display: 'flex'
    },
    tagList: {
        display: 'flex',
        listStyle: 'none',
        margin: '0 auto'
    },
    tagItem: {
        margin: 10,
        borderRadius: 25,
        fontWeight: 'bold',
        color: '#4B4B4B',
        padding: '6px 10px',
        cursor: 'pointer',
        transition: '.2s',

        "&:hover": {
            opacity: '0.8'
        }
    }
})

export default style