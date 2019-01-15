function detectswipe(el, func) {
  swipe_det = {};
  swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  const min_x = 30;  // min x swipe for horizontal swipe
  const max_x = 30;  // max x difference for vertical swipe
  const min_y = 50;  // min y swipe for vertical swipe
  const max_y = 60;  // max y difference for horizontal swipe
  let direc = "";
  ele = document.getElementById(el);
  ele.addEventListener("touchstart", function(e) {
    const t = e.touches[0];
    swipe_det.sX = t.screenX;
    swipe_det.sY = t.screenY;
    console.log(`touchstart with `, swipe_det);
  }, false);
  ele.addEventListener("touchmove", function(e) {
    e.preventDefault();
    const t = e.touches[0];
    swipe_det.eX = t.screenX;
    swipe_det.eY = t.screenY;
	ele.style.transform=`translateX(${(Math.floor(swipe_det.eX).toFixed(0)*100)/screen.width}px)`
    console.log(`touchmove with `, swipe_det);

  }, false);
  ele.addEventListener("touchend", function(e) {
    // horizontal detection
    if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
      if (swipe_det.eX > swipe_det.sX) direc = "r";
      else direc = "l";
    } else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
      if (swipe_det.eY > swipe_det.sY) direc = "d";
      else direc = "u";
    }
    console.log(`touchend with `, swipe_det);

    if (direc !== "") {
      if (typeof func === "function") func(el, direc);
    }
    direc = "";
    swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;

  }, false);
}
