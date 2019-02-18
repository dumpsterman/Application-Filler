function getData(){
  return new Promise(resolve => {
    chrome.storage.sync.get(null, function(items) {
  var uD = new Map();
  for (key in items){
  uD.set(key.toString(), items[key].toString());
  }
  console.log(uD);
  resolve(uD);
})})}

async function start()
{
  var userData = new Map(await getData());
  console.log(userData);
  fillText(userData);
  dropDown(userData);
}

function dropDown(userData)
{
  var inpts = $("select");
  var inptLn = inpts.length - 1;

  start: for(var i = 0; i <= inptLn; i++)
  {
    var inpt = inpts.eq(i);
    var options = inpt.find("option");
    var optionsLn = options.length;
    var elems = inpt.siblings().length ? inpt.siblings() : inpt.parent().siblings(); //possible scoping problems with siblings, try prev() if bugs found
    while(!elems.find(":input").length)
    {
      var ln = elems.length;
      if(ln === 0){continue start;}
      for(var ii = 0; ii < ln; ii++)
      {
        var elem = elems.eq(ii);
        var text = elem.text().toLowerCase();
        var cText = valCheck(text, userData);
        console.log("cText",cText)
        if(cText)
        {
          for(var iii = 0; iii < optionsLn; iii++)
          {
            var option = options.eq(iii).text().toLowerCase();
            console.log("option",option)
            if(cText.toLowerCase().includes(option)){inpt.prop("selectedIndex", iii);} //added toLowerCase
          }
          continue start;
        }
      }
      elems = elems.parent().siblings();
    }
  }
}

function fillText(userData)
{
  var inpts = $(":text");
  var inptLn = inpts.length - 1;

  start: for(var i = 0; i <= inptLn; i++)
  {
    var inpt = inpts.eq(i);
    var count = 0;
    var elems = inpt.siblings().length ? inpt.siblings() : inpt.parent().siblings(); //possible scoping problems with siblings, try prev() if bugs found
    while(!elems.find(":input").length | count != 3 )
    {
      var ln = elems.length;
      if(ln === 0){continue start;}
      for(var ii = 0; ii < ln; ii++)
      {
        var elem = elems.eq(ii);
        var text = elem.text().toLowerCase();
        var cText = valCheck(text, userData);
        if(cText){inpt.val(cText); continue start;}
      }
      elems = elems.parent().siblings();
    }
  }
}

function valCheck(elem, userData)
{
    for(k of userData.keys())
    {
      if(elem.includes(k)){var key = k; break;}
    }
    if(key)
    {
      return(userData.get(key))
    }
    else
    {
      return;
    }
}

start();
