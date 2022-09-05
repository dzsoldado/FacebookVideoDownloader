function send_UI_msg(msg){
  chrome.runtime.sendMessage({"action": "msg", "msg": msg});
}

function openTab(finalURL){  
  // Create the new tab and save its ID
  chrome.windows.create({url: finalURL}, function(newTab) {
    tabID = newTab.id+1
  });
}

function tellTabToDownload(tabID){
  chrome.tabs.sendMessage(tabID, {"action": "startDownload"});
}

function openURL(url){
  let finalURL;

  //Validate and normalize link
  let reelRegex = /.*www\.facebook\.com\/reel\/.*/i;
  let normalRegex = /.*www\.facebook\.com\/.*\/posts\/.*/i;
  let normalWatchRegex = /.*www\.facebook\.com\/watch\/.*/i;
  let newWatchRegex = /.*www\.facebook\.com\/watch\?.*/i;
  let groupRegex = /.*www\.facebook\.com\/groups\/.*\/permalink\/.*/i;
  let groupShareRegex = /.*www\.facebook\.com\/.*\/videos\/.*/i;
  let mobileRegex = /.*m\.facebook\.com\/.*/i;
  let webRegex = /.*web\.facebook\.com\/.*/i;
  let watchRegex = /.*fb\.watch.*/i

  if(url.match(reelRegex) 
  || url.match(normalRegex) 
  || url.match(normalWatchRegex) 
  || url.match(newWatchRegex) 
  || url.match(groupRegex)
  || url.match(groupShareRegex)
  || url.match(webRegex)
  || url.match(mobileRegex)){

    finalURL = url.replace("www.", "m.");
    finalURL = finalURL.replace("web.", "m.");
    openTab(finalURL)
  }else{
    if(url.match(watchRegex)){
      fetch(url)
      .then((data)=>{
        finalURL = data.url.replace("www.", "m.");
        openTab(finalURL)
      })
    }
    else{
      send_UI_msg('Wrong or unsupported link')
    }
  }
}

// ################################################

let tabID; 
/* 
  tabID is used to make sure the scrip on the opened tab
  only works when the tab is created by this service worker
*/
chrome.runtime.onMessage.addListener(
  function(request) {
    if (request.action === 'openTab'){
      openURL(request.url);
    }
    if (request.action === 'pageReady'){
      tellTabToDownload(tabID);
    }
  }
)
