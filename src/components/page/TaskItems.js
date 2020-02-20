import React, { Component } from 'react';

class TaskItems extends Component{

    onDelete = () =>{
        this.props.onDelete(this.props.tasks.id)
    }
    render(){
        var {tasks, index} = this.props;
    return (
        <tr>
          <td >{index+1}</td>
          <td>{tasks.TaskName}</td>
          <td>{tasks.StudentName}</td>
          <td>{tasks.Status}</td>
          <td>
            <button className="btn btn-danger" onClick={this.onDelete}>Xoá</button>
          </td>
        </tr>
    );
    }
};


export default TaskItems;