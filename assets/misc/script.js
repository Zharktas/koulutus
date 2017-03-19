function pClicked(event) {
  var p = event.srcElement;
  p.classList.add('moi');
}

var ps = document.
  getElementsByTagName('p');

for(var i=0; i<ps.length; ++i){
  var p = ps[i];
  p.onclick = pClicked;
}
