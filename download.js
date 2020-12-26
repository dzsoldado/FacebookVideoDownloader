



// 1- Check if the video is playable, and play it
let startvideo = function(){

  return new Promise((resolve, reject)=>{

    let clickable = document.querySelector("#u_0_u > div.story_body_container > div._5rgu._7dc9._27x0 > section > div > div > i")
    || document.querySelector("#u_0_y > div > div._5rgu._7dc9._27x0 > section > div > div > i") 
    || document.querySelector("#u_0_v > div.story_body_container > div._5rgu._7dc9._27x0 > section > div > div > i") 
    || document.querySelector("#root > div._7om2 > div > div._97ki > div > div > div > i");


    console.log(clickable)
    if (clickable){
      clickable.click()

      resolve("Success");     
    }else{

      reject("Failed");
    }
      
  })
};

// 2- When the page is loaded, tell the background 
window.onload = (event) => {
  chrome.runtime.sendMessage({"action": "confirmLoaded"});
};



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    // Start the downloading process (after this page is loaded)
    if (request.action == "beginDownload"){

      startvideo()
      .then(()=>{
        let link = document.querySelector("#u_0_u > div.story_body_container > div._5rgu._7dc9._27x0 > section > div > div > video") 
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
        chrome.runtime.sendMessage({"action": "msg", "msg": "An error accured"});

        // Close this window
        chrome.runtime.sendMessage({"action": "closeTab", "id": request.id});

      })
    }
  }
);





