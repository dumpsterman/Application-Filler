
function dataHandler ()
{
  var elems = $(":input")
  for(var i = 0; i < elems.length; i++)
  {
    var id = elems.eq(i).attr('id');
      populateStorage(id);
  }
}

function populateStorage(id)
{
  var value = document.getElementById(id).value;
  chrome.storage.sync.set({[id] : [value]});

}

document.body.onload = function(){
      chrome.storage.sync.get(null, function(items){
        for(item in items)
        {
          document.getElementById(item).value = items[item].toString();
        }})}
document.getElementById("submit").onclick = dataHandler;
