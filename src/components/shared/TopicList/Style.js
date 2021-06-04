const style = () => ({
    topicContainer: {
        height: '100%',
        width: '24%',

        position: 'fixed',
        top: 0,
        right: 30,
        justifyContent: 'center',

        borderRadius: 10,
    },
    listHeader: {
        marginTop: 30,
        padding: 10,

        textAlign: 'center',
        backgroundColor: 'white',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: '18px !important'
    },
    topicList: {
        padding: '0 !important'
    },
    listItem: {
        height: '40px !important'
    },
    listIcon: {
        fontSize: "20px !important"
    },
    listText: {
        fontSize: "16px !important",
        fontWeight: '600 !important',
        margin: '0 5px'
    },
    listItemActive: {
        borderRight: "8px solid #006dbb",
    },
    listIconActive: {
        fontSize: "20px !important",
        color: "#006dbb !important",
    },
    listTextActive: {
        color: "#006dbb",
        fontSize: "16px !important",
        fontWeight: '600 !important',
        margin: '0 5px'
    },

    subList: {
        paddingLeft: 20
    },
    statistic: {
        width: '100%',
        position: 'absolute',
        bottom: 20,
        left: '61%',
        transform: 'translateX(-50%)'
    },
    totalIcon: {
        color: '#2196f3 !important',
    },
    onlineIcon: {
        color: 'green !important',
    },
    //
    active: {
        borderRight: "8px solid #006dbb",
    },
    textItem: {
        marginLeft: 7,
    },
    textActive: {
        marginLeft: 7,
        color: "#006dbb",
    },
    icon: {
        fontSize: "20px !important",
    },
    iconActive: {
        fontSize: "20px !important",
        color: "#006dbb !important",
    },

})

export default style