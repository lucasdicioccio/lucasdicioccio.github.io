(function(){
  const go = (n) => () => {
    const m = n < 5 ? 1+n : 5;
    const retry = () => setTimeout(go(m), n*1000);
    fetch("/dev/watch")
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
