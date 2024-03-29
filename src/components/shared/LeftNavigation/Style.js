const style = () => ({
    navContainer: {
        position: 'fixed',
        height: '97%',
        width: '22%',
        // backgroundColor: 'white',
        borderRadius: 10,
        // boxShadow: '1px 1px 5px 1px #e4e4e4',
        // maxWidth: '300px'
    },
    menuButton: {
        position: 'fixed',
        marginTop: -10
    },
    logo: {
        textAlign: 'center',
        height: 100,
        width: 100,
        display: 'flex',
        margin: 'auto'
    },
    navLink: {
        color: 'black',
        fontSize: 20,
        '&:hover': {
            textDecoration: 'none'
        }
    },

    navIcon: {
        transition: '.2s'
    },
    navItem: {
        transition: '.3s',
        '&:hover': {
            backgroundColor: '#337ab757',
            borderRadius: 10,
            color: "#0478B9",
            "& $navIcon": {
                color: "#0478B9 !important",
            }
        }
    },
    navTitle: {
        fontWeight: 'bold',
        fontSize: '17px !important',
    },
    iconActive: {
        color: '#0478B9 !important ',
    },
    linkActive: {
        color: '#0478B9',
        backgroundColor: '#337ab757 !important',
        borderRadius: 10,
    },
    btnShare: {
        padding: '10px 15px',
        fontWeight: 'bold',
        backgroundColor: '#0478B9',
        color: "white",
        textTransform: 'initial',
        borderRadius: 10,
        "&:hover": {
            backgroundColor: '#004a73 !important',
        }
    },
    navFooter: {
        position: "absolute",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        bottom: 0,
        width: '100%',
        margin: '0 auto',
        cursor: 'pointer'
    },
    avatarBox: {
        borderRadius: 40,
        border: '1px solid #c3c3c3',
        padding: '3px 5px'
    },
    userAvatar: {
        color: 'grey',
        border: '1px solid grey'
    },
    moreIcon: {
        color: "grey !important"
    },
    expand: {
        background: 'white',
        padding: 10,
        boxShadow: '1px 1px 3px 4px #efefef',
        borderRadius: 5
    },
    toProfile: {
        color: "black !important",
        fontSize: 15,
        marginBottom: '0 !important',
        fontWeight: 500
    },
    toLogout: {
        fontSize: 15,
        marginBottom: '0 !important',
        fontWeight: 500
    },
    expandIcon: {
        fontSize: "20px !important",
        marginRight: 3,
        color: 'grey !important'
    }
})

export default style