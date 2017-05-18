
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

function itemSearch(outputArea, inputReg, omitKanji){
  const prefix = "Data/";
  const suffix = "Name.json";
  const namefiles = ["monster", "magic", "arms", "item", "foods", "material", "skill", "special", "chance", "accessory", "place", "facilities"];
  cleanChildNodes(outputArea);
  //Not sequential. becouse use XMLHttpRequest.
  for (var i = 0; i < namefiles.length; i++){
    var fileName = prefix + namefiles[i] + suffix;
    // ex. Data/monsterName.json
    appendHitNames(outputArea, inputReg, omitKanji, fileName);
  }
}

function searchHitNames(inputReg, omitKanji, targetArray){
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
