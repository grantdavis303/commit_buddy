function generateMessage(){
  var filePath = document.getElementById("filePath");
  var commitAll = document.getElementById("commitAll");
  var dropdownOptions = document.getElementById("dropdownOptions");
  var dropdownValue = dropdownOptions.value;
  var message = document.getElementById("message");
  var newMessage;

  if (commitAll.checked) {
    document.getElementById("filePathContent").textContent = 'git add .';
  } else if (filePath.value.length > 0) {
    document.getElementById("filePathContent").textContent = `git add ${filePath.value}`;
  } else {
    document.getElementById("filePathContent").textContent = '';
  }

  if (dropdownValue.length == 0){
    newMessage = message.value;
  } else {
    var capitalizedWord = capitalizeWord(dropdownValue);

    newMessage = `${capitalizedWord} ${message.value}`;
  }

  if (message.value.length > 0) {
    document.getElementById("messageContent").textContent = `git commit -m "${newMessage}"`;
  } else {
    document.getElementById("messageContent").textContent = '';
  }
}

function capitalizeWord(word){
  var firstLetter = word.charAt(0);
  var remainingLetters = word.substring(1);
  var capitalFirstLetter = firstLetter.toUpperCase();
  return capitalFirstLetter + remainingLetters;
}