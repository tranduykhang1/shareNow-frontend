import React, { Component } from "react";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      TaskName: "",
      StudentName: "",
      Status: "Chưa Làm"
    };
  }

  onChange = event => {
    let target = event.target
    let name = target.name
    this.setState({
      [name]: event.target.value
    });
  };
  onSubmit = event => {
    event.preventDefault();
    let id = this.state.id;
    this.setState({
      id: id+1
    })
    this.props.onSubmit(this.state);  
    console.log(this.state)
  };

  render() {
    return (
      <div className="col-sm-4 col-xs-4 col-md-4 col-lg-4 border p-1">
        <div className="panel panel-default">
          <div className="panel-heading p-2">
            <h4 className="panel-title text-center">Thêm công việc</h4>
          </div>
          <br />
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Tên công việc: </label>
                <input
                  className="form-control mx-auto"
                  type="text"
                  name="TaskName"
                  value={this.state.TaskName}
                  onChange={this.onChange}
                  placeholder="Nhập tên công việc..."
                />
              </div>
              <label>Người làm: </label>
              <input
                className="form-control"
                name="StudentName"
                value={this.state.StudentName}
                onChange={this.onChange}
                placeholder="Nhập tên người làm..."
              >
              </input>
              <br />
              <label>Trạng thái: </label>
              <select
                className="form-control"
                name="Status"
                value={this.state.Status}
                onChange={this.onChange}
              >
                <option>Chưa làm</option>
                <option>Đang làm</option>
                <option>Hoàn thành</option>
              </select>
              <br />
              <button className="btn btn-primary col-lg-12" type="submit">
                Lưu
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTask;
