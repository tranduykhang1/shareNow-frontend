import React from "react";
import "./App.css";

import Addtask from "./components/page/Addtask";
import ShowTask from "./components/page/ShowTask";
import ChatGroup from "./components/page/ChatGroup";
import Footer from "./components/page/Footer";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: JSON.parse(localStorage.getItem("tasks")) || [],
            messages: JSON.parse(localStorage.getItem('message')) || []
        };
    }
    onTasks = () => {
        let tasks = [{
            id: 1,
            TaskName: "TMDT",
            StudentName: "Nhóm?",
            Status: "Chưa Hoàn Thành"
        }]
        this.setState({
            tasks: tasks
        })
    }

    onSubmit = data => {
        let { tasks } = this.state;
        tasks.push(data);
        this.setState({
            tasks: tasks
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    onSend = (data) => {
        let { messages } = this.state
        messages.push(data);
        this.setState({
            messages: messages
        })
        localStorage.setItem('message', JSON.stringify(messages));
    }

    findID = id => {
        const { tasks } = this.state
        let result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        })
        return result
    }
    onDelete = (id) => {
        const { tasks } = this.state
        const index = this.findID(id);
        console.log(index)
        if (index !== -1) {
            tasks.splice(index, 1);
            this.setState({ tasks: tasks })
        }
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    render() {
        var { tasks } = this.state;
        var { messages } = this.state;
        return ( <
            div className = "container App" >
            <
            div className = "text-center p-3 title" >
            <
            h2 > THEO DÕI CÔNG VIỆC < /h2> <
            /div> <
            hr / >

            <
            div className = "row" > { /*add*/ } <
            Addtask onSubmit = { this.onSubmit }
            />

            { /*show*/ } <
            ShowTask tasks = { tasks }
            onDelete = { this.onDelete }
            />

            { /*chat-box*/ } <
            ChatGroup onSubmit = { this.onSend }
            messages = { messages }
            />

            { /*footer*/ } <
            Footer / >
            <
            /div> <
            /div>
        );
    }
}

export default App;