(function(){
  const callProduce = (ev) => {
    const btn = ev.target;
    btn.disabled = true;
    const url = new URL(document.location.origin + '/dev/produce');
    fetch(url, {'method': 'POST'})
    .then(response => response.json())
    .then(data => {
      alert("built");
    })
    .catch(error => {
      console.error('Error:', error);
      alert("failed");
    })
    btn.disabled = false;
  };
  const go = () => {
    let btn = document.createElement('button');
    btn.className = "dev-produce-button";
    btn.onclick = callProduce;
    btn.appendChild(document.createTextNode("produce"));
    var navDom = document.getElementById('navigation');
    navDom.appendChild(btn);
  };
  setTimeout(go, 1000);
})();
