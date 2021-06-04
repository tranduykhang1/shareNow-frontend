const style = () => ({
    goBackIcon: {
        fontSize: '20px !important',
        cursor: 'pointer',
        marginRight: 20
    },
    title: {
        fontWeight: 500,
        textAlign: "center",
        margin: 0
    },
    bio: {
        height: 'auto !important',
        width: "100%",
        maxWidth: '100%',
        minWidth: '100%',
        borderRadius: 5,
        padding: '5px',
        background: 'transparent'
    },
    btnBack: {
        marginTop: 10,
        backgroundColor: "grey",
        color: 'white',
        textTransform: 'initial',
        width: '48%'
    },
    btnSubmit: {
        marginTop: 10,
        backgroundColor: "#0478B9",
        color: 'white',
        textTransform: 'initial',
        width: '48%',

        "&:hover": {
            backgroundColor: "#005e92",
        }
    }
})

export default style