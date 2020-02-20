import React, { Component } from "react";
import TaskItems from "./TaskItems";


class ShowTask extends Component {


  render() {
  let {tasks} = this.props;
    var element = tasks.map((task, index) => {
      return <TaskItems key={task.id} index={index} tasks={task} onDelete={this.props.onDelete}/>
    });
    return (
      <div className="col-sm-8 border table-wrapper-scroll-y task-list">
        <h4 className="text-center">Danh sách công việc</h4>
        <table className="table table-wrapper-scroll-y task-list table-striped mb-0">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên công việc</th>
              <th>Người làm</th>
              <th>Trạng thái</th>
              <th>Chỉnh sửa</th>
            </tr>
          </thead>
          <tbody>{element}</tbody>
        </table>
      </div>
    );
  }
}

ShowTask.propTypes = {};

export default ShowTask;
