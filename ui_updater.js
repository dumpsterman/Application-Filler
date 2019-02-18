var uiElems = $(":text");

for(var i = 0; i < elems.length; i++)
{
  var id = uiElems.eq(i).attr('id');
  uiElems.eq(i).val(localStorage.getItem(id))
}
