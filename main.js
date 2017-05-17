

var toolsArray = ItemArray.concat(FoodsArray, MaterialArray);
var battleArray = SkillArray.concat(SpecialArray, ChanseArray);
var dressArray = ArmsArray.concat(AccessoryArray);
var targetArray = MonsterArray.concat(MagicArray, toolsArray, battleArray, dressArray, PlaceArray, FacilitiesArray);

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
function outputUL(outputArea, list){
  var newUL = document.createElement("UL");
  for (var i = 0; i < list.length; i++){
    var li = document.createElement("li");
    li.textContent = list[i];
    newUL.appendChild(li);
  }
  //var liText = "<li>" + list.join("<li>");
  if (outputArea.hasChildNodes()){
    outputArea.removeChild(outputArea.lastChild);
  }
  outputArea.appendChild(newUL);
}

function itemSearch(outputArea, inputReg, omitKanji){
  window.alert(inputReg.value);
  window.alert(omitKanji);
  if (!inputReg.value){return;}

  re = new RegExp(inputReg.value);
  
  //var ansText = inputReg.value + "<ul>";
  var results = [];
  
  for (var i = 0; i < targetArray.length; i++){
    item.name = targetArray[i];
    if (re.test(item.name)){
      if(!omitKanji || item.hasHiraKata()){
        //ansText += "<li>" + item.name;
        results.push(item.name);
      }
    }
  }
  //outputArea.innerHTML = "</ul>" + ansText;
  outputUL(outputArea, results);
}
