// Dynamically generate the git message
function generateMessage(){
  const filePath = document.getElementById("filePath");
  const commitAll = document.getElementById("commitAll");
  const pushOriginMain = document.getElementById("pushOriginMain");
  const dropdownOptions = document.getElementById("dropdownOptions");
  const dropdownValue = dropdownOptions.value;
  const message = document.getElementById("message");
  var filePathContent = document.getElementById("filePathContent");
  var pushOriginMainContent = document.getElementById("pushOriginMainContent");
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

  if (pushOriginMain.checked) {
    pushOriginMainContent.textContent = 'git push origin main';;
  } else {
    pushOriginMainContent.textContent = '';
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

// Capitalize the dropdown adjective if utilized
function capitalizeWord(word){
  const firstLetter = word.charAt(0);
  const remainingLetters = word.substring(1);
  const capitalFirstLetter = firstLetter.toUpperCase();

  return capitalFirstLetter + remainingLetters;
}

// Copy the git message to the clipboard
function copyToClipboard(){
  const filePathContent = document.getElementById("filePathContent");
  const messageContent = document.getElementById("messageContent");
  const pushOriginMainContent = document.getElementById("pushOriginMainContent");
  const copiedMessageAlert = document.getElementById("copiedMessageAlert");
  var copiedMessage;

  if (pushOriginMainContent == null){
    copiedMessage = filePathContent.textContent + '\n' + messageContent.textContent;
  } else {
    copiedMessage = filePathContent.textContent + '\n' + messageContent.textContent + '\n' + pushOriginMainContent.textContent;
  }

  copiedMessageAlert.textContent = 'Copied message successfully!';
  navigator.clipboard.writeText(copiedMessage);
}

// Reset all formatting for the form
function resetForm(){
  const copiedMessageAlert = document.getElementById("copiedMessageAlert");

  copiedMessageAlert.textContent = '';
}