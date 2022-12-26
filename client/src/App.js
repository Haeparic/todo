import React, { Component } from "react";
// 클래스 / 함수 컴포넌트(용도별로 2가지 케이스)
// 내용 출력 전용, 데이터관리 용도

// 클래스 형식으로 제작되는 것 class : TypeScript
// state 를 리렌더링(Re-rendering)
// Life-cycle : mount, update, unMount...

// 함수 형식으로 제작되는 것 function
// state 를 못쓰므로 화면 갱신 어렵다.
// useState() state 변경가능
// Life-cycle 을 지원 안한다.
// useEffect() Life-cycle 체크가능
export default class App extends Component {
  state = {
    // 속성명: 속성값
    // 할일 목록 Mock data
    todoData: [
      { id: 1, title: "할일 1", completed: false },
      { id: 2, title: "할일 2", completed: true },
      { id: 3, title: "할일 3", completed: false },
      { id: 4, title: "할일 4", completed: false },
    ],
    todoValue: "",
  };
  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };
  getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };
  toggleClick = (id) => {
    // map 을 통해서 this.state.todoData 의 complete 를 업데이트 해보자
    const updateTodo = this.state.todoData.map((item) => {
      if (item.id === id) {
        // if (item.id === true) {
        //   item.completed = false;
        // } else {
        //   item.completed = true;
        // }
        item.completed = !item.completed;
      }
      return item;
    });
    this.setState({ todoData: updateTodo });
  };
  deleteClick = (id) => {
    // 클릭된 id 와 다른 요소들만 걸러서 새로운 배열 생성
    const nowTodo = this.state.todoData.filter((item) => item.id !== id);
    // console.log("클릭", nowTodo);
    this.setState({ todoData: nowTodo });
  };
  changeTodoValue = (event) => {
    // console.log(event.target.value);
    this.setState({ todoValue: event.target.value });
  };
  addTodoSubmit = (event) => {
    event.preventDefault();
    // { id: 4, title: "할일 4", completed: false }
    const addTodo = {
      id: Date.now(),
      title: this.state.todoValue,
      completed: false,
    };
    // todoDat: [] -> {}
    this.setState({ todoData: [...this.state.todoData, addTodo] });
    this.setState({ todoValue: "" });
  };
  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할일 목록</h1>
          </div>
          {this.state.todoData.map((item) => (
            <div style={this.getStyle(item.completed)} key={item.id}>
              <input
                type="checkbox"
                defaultChecked={item.completed}
                onChange={() => this.toggleClick(item.id)}
              />
              {item.title}
              <button
                style={this.btnStyle}
                onClick={() => this.deleteClick(item.id)}
              >
                x
              </button>
            </div>
          ))}
          <form style={{ display: "flex" }} onSubmit={this.addTodoSubmit}>
            <input
              style={{ flex: "10" }}
              type="text"
              placeholder="할 일을 입력하세요"
              value={this.state.todoValue}
              onChange={this.changeTodoValue}
            />
            <input style={{ flex: "1" }} type="submit" />
          </form>
        </div>
      </div>
    );
  }
}
