


document.getElementById("linkForm").addEventListener("submit", (e)=>{
  e.preventDefault();

  let linkField = document.getElementById("link")

  // 1- Send the link to background
  chrome.runtime.sendMessage({"action": "openTab", "url": linkField.value});

  // 2- Reset the input field
  linkField.value = ""

});

// Display incoming messages
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse)=>{
    if(request.action == "msg"){
      document.getElementById("message").textContent = request.msg
    }
  }
);