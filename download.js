
function send_UI_msg(msg){
  chrome.runtime.sendMessage({"action": "msg", "msg": msg});
  return ;
}

window.onload = (event) => {
  startvideo()
};

// Check if the video is playable, and play it
let startvideo = function(){

  let clickable = document.querySelector('section>div>div>i.img')
  
  if (!clickable){ 
    send_UI_msg("An error accured!");
    return window.close();
  }

  clickable.click();
  let link = document.getElementsByTagName('video')[0];

  if (!link){
    send_UI_msg("An error accured!");
    return window.close();
  }

  // Download the video from the obtained link 
  window.open(link.src)
  
  send_UI_msg("Your video is on its way!");

  return window.close();

};






