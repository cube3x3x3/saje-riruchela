var searchDqxNames = searchDqxNames || {};

searchDqxNames.exec = function(outputArea, inputReg, omitKanji, opt_location){
  function cleanChildNodes(node){
    if (node.hasChildNodes()){
      while (node.firstChild){
        node.removeChild(node.firstChild);
      }
    }
  }
  
  function createUL(list){
    var newUL = document.createElement("ul");
    for (var i = 0; i < list.length; i++){
      var li = document.createElement("li");
      li.textContent = list[i];
      newUL.appendChild(li);
    }
    return newUL;
  }
  
  function searchHitNames(inputReg, omitKanji, targetArray){
    var item = {
      name : "test",
      hasHiraKata : function(){
        // [\u3040-\u309F] hiragana
        // [\u30A0-\u30FF] katakana
        if (this.name.match(/^[\u3040-\u30FF]+$/)) {
          return true;
        }else{
          return false;
        }
      }
    };
    //window.alert(inputReg.value);
    //window.alert(omitKanji);
    if (!inputReg.value){return;}
  
    re = new RegExp(inputReg.value);
    var results = [];
  
    for (var i = 0; i < targetArray.length; i++){
      item.name = targetArray[i];
      if (re.test(item.name)){
        if(!omitKanji || item.hasHiraKata()){
          results.push(item.name);
        }
      }
    }
    return results;
  }

  function appendHitNames(outputArea, inputReg, omitKanji, jsonNamefile){
    //Load a search target name file.
    var request = new XMLHttpRequest();
    request.open('GET', jsonNamefile);
    request.onload = function(){
      //Finish load. start Searching. and Output.
      var nameArray = JSON.parse(this.responseText);
      var results = searchHitNames(inputReg, omitKanji, nameArray);
      var newUL = createUL(results);
      outputArea.appendChild(newUL);
    };
    request.send();
  }
  

  var location = "Data/";
  var NAME_FILES = ["monster", "magic", "arms", "item", "foods", "material", "skill", "special", "chance", "accessory", "place", "facilities"];
  var SUFFIX = "Name.json";

  if (opt_location) {
    location = opt_location;
  }
  //const prefix = "Data/";
  cleanChildNodes(outputArea);
  //Not sequential. becouse use XMLHttpRequest.
  for (var i = 0; i < NAME_FILES.length; i++){
    var fileName = location + NAME_FILES[i] + SUFFIX;
    // ex. Data/monsterName.json
    appendHitNames(outputArea, inputReg, omitKanji, fileName);
  }
};




