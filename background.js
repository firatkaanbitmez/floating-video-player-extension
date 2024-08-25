chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "floatVideo") {
      chrome.storage.local.set({ videoHTML: request.videoHTML, currentTime: request.currentTime }, () => {
        chrome.windows.create({
          url: "popup.html",
          type: "popup",
          width: 480,
          height: 270
        });
      });
    }
  });
  