document.addEventListener("DOMContentLoaded", () => {
  fetch("./front-enter-export.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json(); // 解析 JSON 資料
    })
    .then((data) => {
      // 取得特定的資料
      const item = data.article["-LNiP-cd31m_XrDZJxdl"];

      // 找到 <main> 容器
      const mainElement = document.getElementById("mainId");

      // 插入 HTML 結構，顯示資料
      mainElement.innerHTML = `
                <article>
                    <p>${item.city}</p>
                    <img src="${item.rectangleUrl}" alt="圖片">
                    <p><strong>課程名稱：</strong>${item.name}</p>
                    <p>${item.city}</p>
                    <p><strong>類型：</strong>${item.classType}</p>
                    <p><strong>費用：</strong>${item.fee} 元</p>
                    <p><strong>聯絡電話：</strong>${item.phone}</p>
                    <p><strong>課程內容：</strong>${item.content}</p>
                </article>
            `;
    })
    .catch((error) => {
      console.error("載入 JSON 資料時出錯：", error);
    });
});
function setupKeyvisual() {
  setInterval(changeKeyvisual, 5000);
  changeKeyvisual();
}

// 輪播圖片效果

let storePhoto = [
  "https://firebasestorage.googleapis.com/v0/b/front-enter.appspot.com/o/images%2Frotate-img-1.jpg?alt=media&token=059f5677-409b-4fc1-a772-baf1dece5063",
  "https://firebasestorage.googleapis.com/v0/b/front-enter.appspot.com/o/images%2Frotate-img-2.jpg?alt=media&token=f28dbea4-af0c-4743-a75a-426198fe409e",
  "https://firebasestorage.googleapis.com/v0/b/front-enter.appspot.com/o/images%2Frotate-img-3.jpg?alt=media&token=8f7f8f02-5066-452a-863c-a4e715d2657a",
];

let keyvisualIndex = 0;

// ⚡ 在網頁載入完後，啟動輪播
document.addEventListener("DOMContentLoaded", () => {
  setupKeyvisual();
});

function setupKeyvisual() {
  changeKeyvisual(); // 一開始就跑一次
  setInterval(changeKeyvisual, 5000); // 每 5 秒切換一次
}

function changeKeyvisual() {
  const len = storePhoto.length;

  for (let i = 0; i < 3; i++) {
    const el = document.getElementById(`keyvisual${i}`);
    if (!el) continue; // 安全檢查，防止找不到元素出錯

    el.style.backgroundImage = `url(${storePhoto[(keyvisualIndex + i) % len]})`;
    el.className = "keyvisual" + (i === 0 ? " active" : ""); // 只有第 0 個是 active
  }

  keyvisualIndex = (keyvisualIndex + 1) % len;
}
