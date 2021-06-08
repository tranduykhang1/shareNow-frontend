const style = () => ({
    postItem: {
        minHeight: 100,
        margin: 'auto',
        marginTop: 15,
        padding: '10px 0',
        backgroundColor: '#fdfdfd',
        boxShadow: '1px 1px 3px 1px #e4e4e4',
        borderRadius: 15
    },
    avatar: {
        border: '3px solid #d7d7d7',
        color: '#d7d7d7'
    },
    popoverItem: {
        cursor: 'pointer'
    },
    popoverIcon: {
        fontSize: "15px !important",
        color: "grey !important",
        marginRight: 5
    },
    postUsername: {
        fontWeight: 'bold',
        color: 'black !important',
        fontSize: '14px !important'
    },
    postGroupName: {
        fontWeight: 'bold',
        margin: '0 5px',
        color: 'black !important',
    },
    cardContainer: {
        boxShadow: 'none !important',
        position: 'relative',
        backgroundColor: '#fdfdfd'
    },
    cardContent: {
        paddingTop: '0 !important',
    },
    cardActions: {
        padding: '16px 16px 6px 16px !important;',
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid #ededed'
    },
    tagItems: {
        marginLeft: 5.,
        padding: "3px 13px",
        borderRadius: 20,
        backgroundColor: '#ffd1a0',
        color: '#5d5d5d',
        fontSize: '13px !important'
    },
    cardInteract: {
        // width: 'auto !important',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
    },
    reportIcon: {
        fontSize: '19px !important',
        color: "#c3c3c3 !important",
        cursor: "pointer"
    },
    wrapperIcon: {
        padding: '3px 4px',
    },
    interactIcons: {
        color: "#c3c3c3 !important",
        fontSize: "20px !important",
        cursor: 'pointer'
    },
    interactIconsActive: {
        color: "#337ab7 !important",
        fontSize: "20px !important",
        cursor: 'pointer'
    },
    heartAnimation: {
        height: 300,
        width: 300,
        left: '50%',
        bottom: '20%',
        transform: 'translate(-50%, -40%)',
        marginLeft: '2px',
        position: 'absolute',
        right: 20
    },
    countNumber: {
        color: "#c3c3c3",
        fontSize: "13px !important",
        paddingLeft: 3
    }
})

export default style