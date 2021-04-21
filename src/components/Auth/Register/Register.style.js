import imgConst from "constants/Images/images.js";

const style = theme => ({
    registerContainer: {
        flexWrap: 'nowrap !important',
        height: '100% !important'
    },
    sloganTitle: {
        margin: "200px 0 0 20px"
    },
    sloganText: {
        margin: "10px 20px"
    },
    btnLogin: {
        color: "#0478B9",
        fontWeight: 'bold',
        margin: 20,
        textTransform: 'initial'
    },
    leftSide: {
        position: "relative",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${imgConst.registerBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    copyRight: {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)'
    },
    rightSide: {},
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
    registerForm: {
        margin: "40px auto",

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