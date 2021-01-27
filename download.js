

// 1- When the page is loaded, tell the background 
window.onload = (event) => {
  chrome.runtime.sendMessage({"action": "confirmLoaded"});
};

// 2- Check if the video is playable, and play it
let startvideo = function(cmntId=null){

  return new Promise((resolve, reject)=>{

    let clickable = cmntId ? document.querySelector(`#\\3${cmntId.substring(0,1)} ${cmntId.substring(1)} > div._2b04 > div._14v5 > div > div > div`) :
    document.querySelector("#u_0_u > div.story_body_container > div._5rgu._7dc9._27x0 > section > div > div > i")
    || document.querySelector("#u_0_y > div > div._5rgu._7dc9._27x0 > section > div > div > i") 
    || document.querySelector("#u_0_v > div.story_body_container > div._5rgu._7dc9._27x0 > section > div > div > i") 
    || document.querySelector("#root > div._7om2 > div > div._97ki > div > div > div > i");

    if (clickable){
      clickable.click()

      resolve("Success");     
    }else{
      reject("Failed"); 
    }
      
  })
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    // Start the downloading process (after this page is loaded)
    if (request.action == "beginDownload"){

      startvideo(request.cmntId)
      .then(()=>{

        let link = request.cmntId ? document.querySelector(`#\\3${request.cmntId.substring(0,1)} ${request.cmntId.substring(1)} > div._2b04 > div._14v5 > div > div > video`):
           document.querySelector("#u_0_u > div.story_body_container > div._5rgu._7dc9._27x0 > section > div > div > video") 
        || document.querySelector("#u_0_y > div > div._5rgu._7dc9._27x0 > section > div > div > video") 
        || document.querySelector("#u_0_v > div.story_body_container > div._5rgu._7dc9._27x0 > section > div > div > video") 
        || document.querySelector("#root > div._7om2 > div > div._97ki > div > div > div > video");

        // Download the video from the obtained link 
        chrome.runtime.sendMessage({"action": "download", "url": link.src});

        // Send success message to the popup
        chrome.runtime.sendMessage({"action": "msg", "msg": "Your video is on the way!"});

        // Close this window
        chrome.runtime.sendMessage({"action": "closeTab", "id": request.id});

      })
      .catch(err=>{
                
        // Send failure message to popup
        chrome.runtime.sendMessage({"action": "msg", "msg": "Failed to get the video"});
          console.log(err)

          // Comment this part for debugging.
        // Close this window
        chrome.runtime.sendMessage({"action": "closeTab", "id": request.id});

      })
    }
  }
);





