document.getElementById("smallScreenNavMargin").addEventListener("click", function(){
  document.getElementById('burger').click();
  document.getElementsByTagName('html')[0].setAttribute('style', 'overflow-y: auto');
});

document.getElementById("openBurger").addEventListener("click", function(){
  document.getElementsByTagName('html')[0].setAttribute('style', 'overflow-y: hidden');
});

document.getElementById("closeBurger").addEventListener("click", function(){
  document.getElementsByTagName('html')[0].setAttribute('style', 'overflow-y: auto');
});
