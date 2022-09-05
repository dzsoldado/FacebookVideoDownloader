function send_UI_msg(msg){
  chrome.runtime.sendMessage({"action": "msg", "msg": msg});
  return ;
}

function openTab(url){
  //Validate and normalize link
  let normalRegex = /.*www\.facebook\.com\/.*\/posts\/.*/i;
  let normalWatchRegex = /.*www\.facebook\.com\/watch\/.*/i;
  let groupRegex = /.*www\.facebook\.com\/groups\/.*\/permalink\/.*/i;
  let groupShareRegex = /.*www\.facebook\.com\/.*\/videos\/.*/i;
  let mobileRegex = /.*m\.facebook\.com\/.*/i;
  let webRegex = /.*web\.facebook\.com\/.*/i;

  // To be implemented
  let watchRegex = /.*fb\.watch.*/i


  if(url.match(normalRegex) 
  || url.match(normalWatchRegex) 
  || url.match(groupRegex)
  || url.match(groupShareRegex)
  || url.match(webRegex)
  || url.match(mobileRegex)){


    let mobileUrl = url.replace("www.", "m.");
    mobileUrl = mobileUrl.replace("web.", "m.");
      
    // Create the new tab and save its ID
    chrome.windows.create({url: mobileUrl}, function(newTab) {
      tabID = newTab.id+1
    });
  }else{
    send_UI_msg('Wrong or unsupported link')
  }
}

function tellTabToDownload(tabID){
  chrome.tabs.sendMessage(tabID, {"action": "startDownload"});
}

let tabID; 
/* 
  tabID is used to make sure the scrip on the opened tab
  only works when the tab is created by this service worker
*/
chrome.runtime.onMessage.addListener(
  function(request) {

    if (request.action === 'openTab'){
      openTab(request.url);
    }

    if (request.action === 'pageReady'){
      tellTabToDownload(tabID);
    }

  }
)
