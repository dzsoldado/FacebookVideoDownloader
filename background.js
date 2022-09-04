
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
      
    });
  }
}

chrome.runtime.onMessage.addListener(
  function(request) {

    if (request.action === 'openTab'){
      openTab(request.url);
    }
  }
)
