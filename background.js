


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    // 1- Download video from url
    if(request.action === "download"){
      chrome.downloads.download({
        url: request.url
      })
    }else{
      // 2 Open video in new tab
      if(request.action === "openTab"){
  
        // 2-1 Validate and normalize link
        let normalRegex = /.*www\.facebook\.com\/.*\/posts\/.*/i;
        let normalWatchRegex = /.*www\.facebook\.com\/watch\/.*/i;
        let groupRegex = /.*www\.facebook\.com\/groups\/.*\/permalink\/.*/i;
        let groupShareRegex = /.*www\.facebook\.com\/.*\/videos\/.*/i;
  
        // To be implemented
        let watchRegex = /.*fb\.watch.*/i
  
  
        if(request.url.match(normalRegex) 
        || request.url.match(normalWatchRegex) 
        || request.url.match(groupRegex)
        || request.url.match(groupShareRegex)){
  
          request.url = request.url.replace("www", "m");
        }
  
        // 2-2 Create the new tab
  
        chrome.windows.create({'url': request.url}, function(newTab) {
          
          // Wait for redirects, then ask to begin downloading
          setTimeout(()=>{
    
            chrome.tabs.sendMessage(newTab.id+1,  {"action": "beginDownload", "id": newTab.id+1});
          }, 3000)
  
        });


      }else{

        // 3 Close the tab
    
        if(request.action === "closeTab"){
          chrome.tabs.remove(request.id)
        }
      }
    }
  }
)
