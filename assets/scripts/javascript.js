function generateMessage(){
  var filePath = document.getElementById("filePath");
  var filePathContent = document.getElementById("filePathContent");
  var commitAll = document.getElementById("commitAll");
  var dropdownOptions = document.getElementById("dropdownOptions");
  var dropdownValue = dropdownOptions.value;
  var message = document.getElementById("message");
  var commitMessage = document.getElementById("commitMessage");
  var newMessage;

  if (commitAll.checked && filePath.value.length > 0) {
    commitMessage.style.display = 'block';
    filePathContent.textContent = 'git add .';
  } else if (filePath.value.length > 0) {
    commitMessage.style.display = 'block';
    filePathContent.textContent = `git add ${filePath.value}`;
  } else {
    commitMessage.style.display = 'none';
    filePathContent.textContent = '';
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

function copyToClipboard(){
  var filePathContent = document.getElementById("filePathContent");
  var messageContent = document.getElementById("messageContent");
  var copiedMessage = filePathContent.textContent + '\n' + messageContent.textContent;
  var copiedMessageAlert = document.getElementById("copiedMessageAlert");

  copiedMessageAlert.textContent = 'Copied message successfully!';
  navigator.clipboard.writeText(copiedMessage)
}

function resetForm(){
  var copiedMessageAlert = document.getElementById("copiedMessageAlert");
  
  copiedMessageAlert.textContent = '';
}