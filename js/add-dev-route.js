(function(){
  const callRoute = (path) => (ev) => {
    const btn = ev.target;
    btn.disabled = true;
    const url = new URL(document.location.origin + path);
    fetch(url, {'method': 'POST'})
    .then(response => response.json())
    .then(data => {
      alert("done");
      btn.disabled = false;
    })
    .catch(error => {
      console.error('Error:', error);
      btn.disabled = false;
      alert("failed");
    })
  };
  const addButton = (name, f) => {
    let btn = document.createElement('button');
    btn.className = "dev-produce-button";
    btn.onclick = f;
    btn.appendChild(document.createTextNode(name));
    var navDom = document.getElementById('site-navigation');
    navDom.appendChild(btn);
  };
  const go = () => {
    addButton("produce", callRoute("/dev/produce"));
    addButton("publish", callRoute("/dev/publish"));
  };
  document.addEventListener("DOMContentLoaded", go);
})();
