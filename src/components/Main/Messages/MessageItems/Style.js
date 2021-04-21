const style = () => ({
    msgItemMe: {
        flexDirection: "row-reverse",
        flexWrap: "nowrap",
        padding: "10px 15px",
        margin: "10px 0 10px auto",
        width: "auto",
        maxWidth: "70%",
    },
    msgItemOther: {
        flexWrap: "nowrap",
        padding: "10px 15px",
        margin: "10px auto 10px 0",
        width: "auto",
        maxWidth: "70%",
    },
    msgAvatar: {
        margin: "0 5px",
    },
    msgBodyMe: {
        backgroundColor: "#DADADA",
        color: "black",
        boxShadow: "1px 2px 1px 1px #DADADA",

        padding: '10px 15px',
        borderRadius: 7
    },
    msgBodyOther: {
        backgroundColor: "#0478B9",
        color: "white",
        boxShadow: "1px 2px 1px 1px #337ab7;",

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
        color: "#949494",
        marginTop: 5,
    },
});

export default style;