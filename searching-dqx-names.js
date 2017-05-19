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
        if (item.name.match(/^[\u3040-\u30FF]+$/)) {
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

  function processFile(url, fCallback, var_args){
    function xhrSuccess(){
      this.callback.apply(this, this.arguments);
    }
    function xhrError(){
      console.error(this.statusText);
    }
    var request = new XMLHttpRequest();
    request.callback = fCallback;
    request.arguments = Array.prototype.slice.call(arguments, 2);
    request.onload = xhrSuccess;
    request.onerror = xhrError;
    request.open("get", url, true);
    request.send(null);
  }

  function appendHitNames(outputArea, inputReg, omitKanji){
    var nameArray = JSON.parse(this.responseText);
    var results = searchHitNames(inputReg, omitKanji, nameArray);
    var newUL = createUL(results);
    outputArea.appendChild(newUL);
  }

  function answerNames(outputArea, inputReg, omitKanji){
    var nameFiles = JSON.parse(this.responseText);
    cleanChildNodes(outputArea);
    for (var i = 0; i < nameFiles.length; i++){
      var fileName = location + nameFiles[i];
      processFile(fileName, appendHitNames, outputArea, inputReg, omitKanji);
    }
  }

  var location = "Data/";
  if (opt_location) {
    location = opt_location;
  }
  var FILE_INDEX = 'data-index.json';
  processFile(location+FILE_INDEX, answerNames, outputArea, inputReg, omitKanji);


};
window['searchDqxNames'] = searchDqxNames;



