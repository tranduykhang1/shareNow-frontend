const style = () => ({
    msgItemMe: {
        flexDirection: "row-reverse",
        flexWrap: "nowrap",
        padding: "10px 15px",
        marginLeft: "auto",
        width: 'auto',
        maxWidth: "50%",
    },
    msgItemOther: {
        flexWrap: "nowrap",
        padding: "10px 15px",
        marginRight: "auto",
        width: "auto",
        // width: "auto",
        maxWidth: "50%",
    },
    msgAvatar: {
        margin: "0 5px",
    },
    msgBodyMe: {
        backgroundColor: "white",
        color: "black",
        boxShadow: "1px 2px 3px 1px #e0e0e0",

        padding: '10px 15px',
        borderRadius: 7
    },
    msgBodyOther: {
        backgroundColor: "#337ab7",
        color: "white",
        boxShadow: "1px 2px 3px 1px #e0e0e0",

        padding: '10px 15px',
        borderRadius: 7,
    },
    trashIcon: {
        marginTop: 30,
        fontSize: "20px !important",
        color: "#d1d1d1 !important",
        cursor: "pointer",
        "&:hover": {
            color: "#ff6060 !important",
        },
    },
    msgTime: {
        fontSize: "13px !important",
        color: "#cccccc",
        marginTop: 5,
    },
});

export default style;