(function(){
  const go = (n) => () => {
    const m = n < 5 ? 1+n : 5;
    const retry = () => setTimeout(go(m), n*1000);
    const url = new URL(document.location.origin + '/dev/watch');
    const params = [['pathname', document.location.pathname]];
    url.search = new URLSearchParams(params).toString();
    fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data === "Reloaded") { 
        location.reload();
      }
      else {
        retry();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      retry();
    })
  };
  go(0)();
})();
