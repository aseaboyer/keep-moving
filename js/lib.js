function sortDropdownList(ddl){

    var options = [].slice.apply(ddl.options, [0]);
    ddl.innerHTML = "";
    var sorted = options.sort(function(a,b){     
       return +(a.innerText) - +(b.innerText);
    });

    for(var i = 0; i < sorted.length; i++){
      ddl.options.add(sorted[i]);
    }  

}