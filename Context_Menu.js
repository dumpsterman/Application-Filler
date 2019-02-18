chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    title: 'Fill',
       id: 'fill1', // you'll use this in the handler function to identify this context menu item
       contexts: ['all'],
  })
})

chrome.contextMenus.onClicked.addListener(function(id, tab) {
  if(id.menuItemId === 'fill1'){
  chrome.tabs.executeScript(null, {file: "jquery-3.3.1.js"}, function() {
chrome.tabs.executeScript({file: "fill_0.6.js"
      })
    })
  }
})
