import React, { Component } from "react";
// import { animateScroll as scroll } from "react-scroll";

let getTime = () => {
  var dt = new Date();
  return (
    dt.getDay() +
    "/" +
    dt.getMonth() +
    "/" +
    dt.getFullYear() +
    "-" +
    dt.getHours() +
    ":" +
    dt.getMinutes()
  );
};
class ChatGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ChatName: "",
      Message: "",
      Time: getTime()
    };
  }
  scrollToBottom = ()=> {
    const scrollHeight = this.messageList.scrollHeight;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }
  
  componentDidUpdate = () =>{
    this.scrollToBottom();
  }


  _handleKeyDown = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });

    if (e.key === "Enter") {
     this.setState({
       Message: ' '
     })
      this.props.onSubmit(this.state);
      console.log(this.state);
    }
  };

  render() {
    const { messages } = this.props;
    var content = messages.map((message, index) => {
      let name = messages.ChatName
      let empty = "Tiêu đề: "
      return (
        <div className="chat-content" key={index}>
          <p id="chat-name">
            {name === "" ? {name} : empty }- <span id="time-send">({message.Time})</span>{" "}
          </p>
          <p id="message">{message.Message}</p>
        </div>
      );
    });
    return (
      <div className="col-12 border chat-group">
        <h5 className="text-center">GHI CHÚ</h5>

        <div className="col-sm-8 mx-auto chat-box" id="chat-box" ref={(e) => {this.messageList = e}}>
          {content}
        </div>

        <div className="form-group col-sm-8 mx-auto d-flex m-2">
          <input
            className="form-control col-sm-2"
            id="chat-name"
            name="ChatName"
            value={this.state.ChatName}
            onChange={this._handleKeyDown}
            placeholder="Tiêu đề"
          >
          </input>
          <input
            className="form-control"
            id="chat-content"
            name="Message"
            value={this.state.Message}
            placeholder="Mô tả..."
            autoComplete="off"
            onKeyPress={this._handleKeyDown}
            onChange={this._handleKeyDown}
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}




export default ChatGroup;
