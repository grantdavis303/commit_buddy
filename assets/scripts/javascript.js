// Generate the git message
function generateMessage(){
  displayFilePathContent();
  displayMessageContent();
  displayPushOriginContent();
}

// Display the file or file path
function displayFilePathContent(){
  const commitAllCheckbox = document.getElementById('commitAllCheckbox');
  const filePath = document.getElementById('filePath');
  var commitMessage = document.getElementById('commitMessage');
  var filePathContent = document.getElementById('filePathContent');

  if (commitAllCheckbox.checked && filePath.value.length > 0) {
    commitMessage.style.display = 'block';
    filePathContent.textContent = 'git add .';
  } else if (filePath.value.length > 0) {
    commitMessage.style.display = 'block';
    filePathContent.textContent = `git add ${filePath.value}`;
  } else {
    commitMessage.style.display = 'none';
    filePathContent.textContent = '';
  }
}

// Display the commit message
function displayMessageContent(){
  const dropdownOptions = document.getElementById('dropdownOptions');
  const dropdownValue = dropdownOptions.value;
  const message = document.getElementById('message');
  var newMessage;

  if (dropdownValue.length == 0){
    newMessage = message.value;
  } else {
    var capitalizedWord = capitalizeWord(dropdownValue);
    newMessage = `${capitalizedWord} ${message.value}`;
  }

  if (message.value.length > 0) {
    document.getElementById('messageContent').textContent = `git commit -m "${newMessage}"`;
  } else {
    document.getElementById('messageContent').textContent = '';
  }
}

// Display the push origin command
function displayPushOriginContent(){
  const pushOriginCheckbox = document.getElementById('pushOriginCheckbox');
  const pushOriginInput = document.getElementById('pushOriginInput');
  var pushOriginContent = document.getElementById('pushOriginContent');

  if (pushOriginCheckbox.checked){
    pushOriginContent.textContent = `git push origin ${pushOriginInput.value}`;
  } else {
    pushOriginContent.textContent = '';
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
  const filePathContent = document.getElementById('filePathContent');
  const messageContent = document.getElementById('messageContent');
  const pushOriginContent = document.getElementById('pushOriginContent');
  const copiedMessageAlert = document.getElementById('copiedMessageAlert');
  var copiedMessage;

  if (pushOriginContent == null){
    copiedMessage = filePathContent.textContent + '\n' + messageContent.textContent;
  } else {
    copiedMessage = filePathContent.textContent + '\n' + messageContent.textContent + '\n' + pushOriginContent.textContent;
  }

  copiedMessageAlert.textContent = 'Copied message successfully!';
  navigator.clipboard.writeText(copiedMessage);

  setTimeout(resetForm, 1000);
}

// Reset all formatting for the form
function resetForm(){
  const copiedMessageAlert = document.getElementById('copiedMessageAlert');

  copiedMessageAlert.textContent = '';
}