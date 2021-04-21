const style = theme => ({
    logo: {
        height: 100,
        width: 100,
        margin: "20px auto",
        display: 'flex',
    },
    btnGoogleLogin: {
        width: '100%',
        justifyContent: 'center',
        margin: '20px 0'
    },
    container: {
        margin: '100px auto',
    },
    btnContinue: {
        background: '#373737',
        color: 'white',
        textTransform: 'initial',
        marginTop: '15px',
        '&:hover': {
            background: '#131313',
        }
    }
})

export default style