
var app = {};

app.scenes = [];
app.scene = null;
app.timers = {};
app.words = [];

app.init = function() {

  app.el = document.getElementById('app');

  app.cursor = document.createElement('div');
  app.cursor.classList.add('cursor');
  app.el.appendChild(app.cursor);
  resetCursor();

  app.goScene(app.scenes[0].name);
  initEventListeners();

}

app.reveal = function(wordName) {
  if (this.scene) {
    this.scene.words[wordName].hidden = false;
  }
}

app.createWord = function(params) {
  var el = document.createElement('div');
  el.classList.add('word');
  el.name = params.name;
  el.innerHTML = params.text;
  el.style.left = params.x + 'px';
  el.style.top = params.y + 'px';
  app.el.appendChild(el);

  if (params.hidden) {
    el.style.display = 'none';
  }

  app.words[params.name] = el;
}

app.goScene = function(sceneName) {
  let scene = app.scenes.find(function(element) {
    return element.name == sceneName;
  })
  if (scene) {
    app.scene = scene;
    for (var i in app.scene.words) {
      var word = app.scene.words[i];
      app.createWord({ name: i, text: word.text, x: word.position.x, y: word.position.y, hidden: word.hidden });
    }
  }

}

app.moveWordBy = function(wordName, dx, dy) {
  var word = app.scene.words[wordName];
  if (word) {
    word.position.x += dx;
    word.position.y += dy;
  }
}

app.updateWord = function(wordName) {
  var word = app.scene.words[wordName];
  var el = app.words[wordName];
  el.style.left = word.position.x + 'px';
  el.style.top = word.position.y + 'px';
}

app.shakeWord = function(wordName) {
  if (app.timers[wordName]) return;

  var shakeTimer = setInterval(function() {
    var odd = (app.timers[wordName] % 2);
    var word = app.scene.words[wordName];
    var x = odd ? -2 : 2;
    var y = 0;

    var el = app.words[wordName];
    el.style.left = (word.position.x + x) + 'px';
    el.style.top = (word.position.y + y) + 'px';

    app.timers[wordName]--;

    if (app.timers[wordName] == 0) {
      clearInterval(shakeTimer);
      app.updateWord(wordName);
    }
  }, 50);

  app.timers[wordName] = 5;
}

function resetCursor() {
  setCursor('o');
}

function setCursor(name) {
  app.cursor.innerHTML = name;
  updateCursor();
}

function updateCursor() {
  app.cursor.style.left = (app.mouseX - app.cursor.offsetWidth/2) + 'px';
  app.cursor.style.top = (app.mouseY - app.cursor.offsetHeight/2) + 'px';
  if (app.mouseX < 0) {
    app.cursor.style.display = 'none';
  }
  else {
    app.cursor.style.display = 'block';
  }
}

function clearTarget() {
  app.words[app.target.name].style.color = 'initial';
  app.target = null;
  resetCursor();
}

function setTarget(element) {
  app.target = element;
  app.words[app.target.name].style.color = 'lightgrey';
  setCursor(app.target.name);
}

function onMouseDown(event) {
  app.downX = event.pageX;
  app.downY = event.pageY;
  var word;

  if (event.target.classList.contains('word')) {
    word = app.scene.words[event.target.name]
  }

  if (app.target) {
    if (word && app.target.name !== event.target.name) {
      app.shakeWord(event.target.name);
    }
    else {
      clearTarget();
    }
  }
  else {
    if (word) {
      setTarget(event.target);
    }
  }
}

function onMouseUp(event) {
}

function onMouseMove(event) {
  app.mouseX = event.pageX;
  app.mouseY = event.pageY;
  app.deltaX = event.pageX - app.lastX;
  app.deltaY = event.pageY - app.lastY;

  updateCursor();

  app.lastX = event.pageX;
  app.lastY = event.pageY;

}

function onMouseOver(event) {
  if (event.relatedTarget == null)
    app.cursor.style.display = 'block';

  if (app.target !== event.target) {
    if (event.target.classList.contains('word')) {
      event.target.style.color = 'red';
    }
  }
}

function onMouseOut(event) {
  if (event.relatedTarget == null)
    app.cursor.style.display = 'none';

  if (app.target !== event.target && event.target.classList.contains('word')) {
    event.target.style.color = 'initial';
  }
}

function onMouseOut(event) {
}

function onMouseOver(event) {
}

function initEventListeners() {
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseout', onMouseOut);
  window.addEventListener('mouseover', onMouseOver);
}
