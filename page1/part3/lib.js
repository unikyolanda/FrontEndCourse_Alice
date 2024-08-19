// 定義app
let app = {
  evts: {},
  search: {},
  testGo: {},
  log: {},
  rotate: {},
  article: {},
  skillTree: {},
  collect: {},
};

app.get = function (selector) {
  return document.querySelector(selector);
};

app.createElement = function (dom, className, id, append, text, func) {
  let newElement = document.createElement(dom);
  newElement.className = className;
  newElement.id = id;
  newElement.textContent = text;
  document.getElementById(append).appendChild(newElement);
  newElement.onclick = func;
};

app.loading = function () {
  app.get("#loadingAnimation").style.height = "0px";
  app.get("#loadingAnimation").style.opacity = "0.9";
  app.get("#loadingDrawing").style.height = "0px";
  app.get("#loadingDrawing").style.opacity = "0.9";
  app.get("#loadingImg").style.marginBottom = "-1000px";
  app.get("#header").style.animation = "headerGoUp 0.9s ease 0s 1 alternate";
  app.get("#myAside").style.animation = "asideBottom 0.9s ease 0s 1 alternate";
  setTimeout(function () {
    app.get("#loadingAnimation").style.display = "none";
  }, 600);
};
