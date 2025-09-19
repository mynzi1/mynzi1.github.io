//초기 데이터
let mockData = [
  { id: 0, isDone: false, content: "React study", date: new Date() },
  { id: 1, isDone: true, content: "친구만나기", date: new Date() },
  { id: 2, isDone: false, content: "낮잠자기", date: new Date() },
];

// 요일 출력을 위한 배열
let day = ["일", "월", "화", "수", "목", "금", "토"];
let idIndex = 3;

/**
 * data 기준으로 todo-item 출력
 */
const printData = () => {
  // 기존 todo-item 들 삭제
  let todos = document.querySelector(".todos-wrapper");
  [...todos.children].forEach((item) => {
    if (item.matches(".todo-item")) item.remove();
  });

  // 검색어 기준으로 필터링
  let filter = document.querySelector(".list input").value.trim();
  let filterList = mockData.filter((data) => data.content.includes(filter));

  // mockData 기준으로 다시 todo-item 생성
  filterList.forEach((item, index) => {
    let todo = document.createElement("div");
    let date = `${item.date.getFullYear()}.${item.date.getMonth()}.${item.date.getDate()} ${item.date.getHours()}:${item.date.getMinutes()}:${item.date.getSeconds()}`;

    todos.innerHTML += `<div class="todo-item">
            <input type="checkbox" ${item.isDone ? "checked" : ""}/>
            <div class="content">${item.content}</div>
            <div class="date">${date}</div>
            <button name="${item.id}">삭제</button>
          </div>`;
  });
};

/**
 * todo item 추가
 */
document.querySelector(".editor > button").addEventListener("click", (e) => {
  e.preventDefault();

  let inputEle = e.target.previousElementSibling;
  mockData.push({
    id: idIndex,
    isDone: false,
    content: inputEle.value,
    date: new Date(),
  });
  inputEle.value = "";

  console.log(mockData);

  printData(mockData);
});

/**
 * todo item 삭제
 */
document.body.addEventListener("click", (e) => {
  if (e.target.matches(".todo-item > button")) {
    let index = mockData.findIndex((data) => data.id == e.target.name);
    mockData.splice(index, 1);

    printData(mockData);
  }
});

/**
 * 검색
 */
document.querySelector(".list input").addEventListener("input", printData);

// todo-list 출력
printData(mockData);

// 현재 날짜 출력
const now = new Date();
document.querySelector(
  ".app > .header > h1"
).innerText = `${now.getFullYear()}년 ${
  now.getMonth() + 1
}월 ${now.getDate()}일 ${day[now.getDay()]}요일`;
