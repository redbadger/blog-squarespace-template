function scrollLock() {
  document.body.style.position = "fixed";
}

function scrollRelease() {
  document.body.style.position = "static";
}

document.getElementById("smallScreenNavMargin").addEventListener("click", function() {
  if (document.body.style.position === "fixed") {
    scrollRelease();
  } else {
    scrollLock();
  }
  document.getElementById('burger').click();
});

document.getElementById("menuOpenTrigger").addEventListener("click", function() {
  scrollLock();
});

document.getElementById("menuCloseTrigger").addEventListener("click", function() {
  scrollRelease();
});

document.getElementById("burger").addEventListener("click", function() {
  document.getElementById('smallScreenNavWrapper').scrollTop = 0;
});
