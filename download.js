function send_UI_msg(msg){
  chrome.runtime.sendMessage({"action": "msg", "msg": msg});
  return ;
}

// Check if the video is playable, and play it
function startvideo(){

  let clickable = document.querySelector('section>div>div>i.img')
  clickable?.click();
  let link = document.getElementsByTagName('video')[0];

  if (!link || link.src.match(/.*blob.*/)){
    send_UI_msg("An error accured!");
    window.close();
  }

  // Download the video from the obtained link 
  window.open(link.src)
  
  send_UI_msg("Your video is on its way!");

  window.close();

};

window.onload = (event) => {
  chrome.runtime.sendMessage({"action": "pageReady"});
};

chrome.runtime.onMessage.addListener(function(request){
  if (request.action === 'startDownload'){
    startvideo()
  }
})








