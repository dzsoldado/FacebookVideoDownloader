

let tabID, cmntId ;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {


    // 1 Open video in new tab
    if(request.action === "openTab"){

      // 1-1 Validate and normalize link
      let normalRegex = /.*www\.facebook\.com\/.*\/posts\/.*/i;
      let normalWatchRegex = /.*www\.facebook\.com\/watch\/.*/i;
      let groupRegex = /.*www\.facebook\.com\/groups\/.*\/permalink\/.*/i;
      let groupShareRegex = /.*www\.facebook\.com\/.*\/videos\/.*/i;
      let mobileRegex = /.*m\.facebook\.com\/.*/i;
      let webRegex = /.*web\.facebook\.com\/.*/i;

      // To be implemented
      let watchRegex = /.*fb\.watch.*/i

      let cmntIdRegex = /comment_id=\d+/i;


      if(request.url.match(normalRegex) 
      || request.url.match(normalWatchRegex) 
      || request.url.match(groupRegex)
      || request.url.match(groupShareRegex)
      || request.url.match(webRegex)
      || request.url.match(mobileRegex)){

        cmntId = request.url.match(cmntIdRegex); // CHeck if the link mentions a comment
        cmntId = cmntId? cmntId[0].split("=")[1] : null;

        request.url = request.url.replace("www.", "m.");
        request.url = request.url.replace("web.", "m.");
          
        // 1-2 Create the new tab and save its ID
  
        chrome.windows.create({'url': request.url}, function(newTab) {

          tabID = newTab.id+1;

        });
      }else{
        chrome.runtime.sendMessage({"action": "msg", "msg": "Invalid URL"});
      }

    }else{

      // 2- Page is loaded, initiate the download process
      if(request.action === "confirmLoaded"){

        chrome.tabs.sendMessage(tabID,  {"action": "beginDownload", cmntId, "id": tabID});

      }else{
        // 3- Download video from url
        if(request.action === "download"){
          chrome.downloads.download({
            url: request.url
          })
        }else{
          // 4- Close the tab
          if(request.action === "closeTab"){
            chrome.tabs.remove(request.id)
          }
        }
      }
    }
  }
)
