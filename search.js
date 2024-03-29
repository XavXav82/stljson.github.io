function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}

(async () => {
  
  //let searchVal = URLSearchParams.get("keyword");
  let searchVal1 = getAllUrlParams().keyword;
  let searchVal = searchVal1.split("%2c")[0];
  let searchFilter = "";
  let filters = 1;
  if(searchVal1.split("%2c").length>1){
    searchFilter = searchVal1.split("%2c")[1];
  }
  //else if(searchVal1.split("%2c").length>2){searchFilter = searchVal1.split("%2c");filters = 2;}
  let e="";
  let searchurl = 0;
  var json;
  if(searchFilter==""){let response = await fetch("./jsons/JustNames.json"); json = await response.json();}
  else if(searchFilter == "student"){let response = await fetch("./jsons/JustStudents.json"); json = await response.json();}
  else if(searchFilter == "parent"){let response = await fetch("./jsons/JustParents.json"); json = await response.json();searchurl = 1;}
  else if(searchFilter == "allen"){let response = await fetch("./jsons/Allen.json"); json = await response.json();}
  else if(searchFilter == "mcmeekin"){let response = await fetch("./jsons/McMeekin.json"); json = await response.json();}
  else if(searchFilter == "forster"){let response = await fetch("./jsons/Forster.json"); json = await response.json();}
  else if(searchFilter == "newman"){let response = await fetch("./jsons/Newman.json"); json = await response.json();}
  else if(searchFilter == "cullen"){let response = await fetch("./jsons/Cullen.json"); json = await response.json();}
  else if(searchFilter == "munro"){let response = await fetch("./jsons/Munro.json"); json = await response.json();}
  if(searchVal.search(/[+]/) != -1){
    e = searchVal.split(/[+]/);
    searchVal = e.join(" ");
  }
  let tempName = "";
  let tempName2 = "";
  let names = [];
  let param = ""
  for(let i = 1;i<12842;i++){
    try{
      tempName = json[String(i)];
      tempName2 = tempName.toLowerCase();
      
      if(tempName2.search(searchVal) != -1){
        l = tempName2 +"+"+ String(i);
        names.push(l);
      }
      
    } catch{}
  }
  param = names.join()
  //console.log(param);
  
  if(param != []){
    if(searchFilter != "parent"){
      window.location.replace("https://link.stleonards.vic.edu.au/search?keyword="+param+"&searchval="+searchVal);
    }else{
      window.location.replace("https://link.stleonards.vic.edu.au/search?keyword="+param+"&searchval="+searchVal+"&parent=yep");
    }
  }else{
    window.location.replace("https://link.stleonards.vic.edu.au/");
  }
})();
