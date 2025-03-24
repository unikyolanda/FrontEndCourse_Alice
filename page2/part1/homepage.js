//回到最上面
//確保當所有的頁面資源（如圖片、CSS 文件等）都加載完成後，才會執行內部的代碼。
window.onload = () => {
  // 平滑捲動功能
  const topButton = document.getElementById("top");

  // 監聽點擊事件
  topButton.addEventListener("click", () => {
    // 使用 requestAnimationFrame 來實現平滑捲動效果
    const scrollToTop = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollTop > 0) {
        // 每次移動距離設定為當前滾動距離的一部分，例如 1/6
        window.scrollTo(0, scrollTop - scrollTop / 6);
        requestAnimationFrame(scrollToTop);
      }
    };
    scrollToTop();
  });

  // 載入特效
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  // 隱藏載入器，顯示內容
  setTimeout(() => {
    loader.style.display = "none";
    content.style.display = "block";
  }, 1500);
};

//搜尋
let countClick = 0;

//未打開搜尋列
app.get("#Search").addEventListener("click", startSearch);

function startSearch() {
  if (countClick == 0) {
    app.search.createSearchDiv();
    app.search.createSearchWhiteDiv();
    app.createElement(
      "div",
      "whiteDivLeft",
      "whiteDivLeft",
      "fullSearchWhiteDiv",
      "",
      ""
    );
    app.createElement(
      "p",
      "whiteDivLeftText",
      "",
      "whiteDivLeft",
      "SEARCH",
      ""
    );
    app.search.createWhiteDivLeftBox();
    app.search.createLeftInput();
    app.search.createVoiceButton();
    app.search.createLeftButton();
    app.search.createCloseButton();
    countClick++;
    //>countClick==1
  } else {
    let child = document.getElementById("fullSearchDiv");
    document.body.removeChild(child);
    let anotherChild = document.getElementById("fullSearchWhiteDiv");
    document.body.removeChild(anotherChild);
    countClick--;
    //>countClick==0
  }
}

//startSearch
app.search.createSearchDiv = () => {
  let newElement = document.createElement("div");
  newElement.id = "fullSearchDiv";
  newElement.className = "fullSearchDiv";
  document.body.appendChild(newElement);
  newElement.onclick = startSearch;
};

//searchButton
app.search.createSearchWhiteDiv = () => {
  let newElement = document.createElement("div");
  newElement.id = "fullSearchWhiteDiv";
  newElement.className = "fullSearchWhiteDiv";
  document.body.appendChild(newElement);
};

//searchToArticle
app.search.createWhiteDivLeftBox = () => {
  let newElement = document.createElement("form");
  newElement.id = "whiteDivLeftBox";
  newElement.className = "whiteDivLeftBox";
  newElement.onsubmit = "return searchToArticle()";
  document.getElementById("whiteDivLeft").appendChild(newElement);
};

//創建一個文本輸入框，並在用戶按下 Enter 鍵時根據輸入的值導航到新的頁面。
app.search.createLeftInput = () => {
  let newElement = document.createElement("input");
  newElement.className = "leftInput speech";
  newElement.id = "leftInput";
  newElement.type = "text";
  document.getElementById("whiteDivLeftBox").appendChild(newElement);
  newElement.addEventListener("keydown", (event) => {
    // 檢查是否按下了 Enter 鍵
    if (event.key === "Enter") {
      // 防止按下 Enter 鍵時的默認行為，例如提交表單
      event.preventDefault();

      // 根據輸入框中的值導航到指定的 URL
      window.location = "article.html?id=" + newElement.value;
    }
  });
};

//語音識別
app.search.createVoiceButton = () => {
  let newElement = document.createElement("div");
  newElement.className = "voiceButton start";
  document.getElementById("whiteDivLeftBox").appendChild(newElement);
  newElement.onclick = function () {
    let isFirefox = navigator.userAgent.search("Firefox") > -1;
    if (isFirefox) {
      // 如果是 Firefox，隱藏語音按鈕
      let startBtn = document.querySelector(".start");
      startBtn.style.display = "none";
    }
    if (!isFirefox) {
      // 如果不是 Firefox，則設置語音識別
      const text = document.querySelector(".speech");
      const startBtn = document.querySelector(".start");
      window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      // 設置語音識別的參數
      recognition.continuous = false;
      recognition.lang = "zh-TW";
      recognition.interimResults = true;
      // start immediately
      // 設置語音識別結果的處理函數
      recognition.onresult = function (event) {
        var result = event.results[event.results.length - 1];
        text.value = result[result.length - 1].transcript;
      };
      // 設置語音識別錯誤處理函數
      recognition.onerror = function (event) {};
      // 設置語音識別結束後的處理函數
      recognition.onend = function () {
        // 自動重新啟動語音識別
        recognition.start();
        // 根據識別結果進行操作
        if (text.value == "") {
          startBtn.style.display = "block";
        } else {
          window.location = "article.html?id=" + text.value;
        }
      };
      // 開始語音識別
      recognition.start();
    }
  };
};

//當用戶點擊搜尋按鈕時
app.search.createLeftButton = () => {
  let newElement = document.createElement("div");
  newElement.className = "leftButton";
  document.getElementById("whiteDivLeftBox").appendChild(newElement);
  newElement.onclick = function () {
    window.location =
      "article.html?id=" + document.getElementById("leftInput").value;
  };
};

//叉叉
app.search.createCloseButton = () => {
  let newElement = document.createElement("div");
  newElement.className = "CloseButton";
  document.getElementById("whiteDivLeft").appendChild(newElement);

  newElement.addEventListener("click", () => {
    if (countClick == 1) {
      let child = document.getElementById("fullSearchDiv");
      document.body.removeChild(child);
      let anotherChild = document.getElementById("fullSearchWhiteDiv");
      document.body.removeChild(anotherChild);
      countClick--;
      //>countClick==0
    }
  });
};
