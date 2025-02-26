// Define global variables
var newFilePathsCount = 0;

// Generate the git message
function generateMessage(){
  displayFilePathContent();
  displayExtraFilePathContent();
  displayMessageContent();
  displayPushOriginContent();
}

// Display the main file or file path
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

// Display the extra file or file paths
function displayExtraFilePathContent(){
  for (let i = 1; i < newFilePathsCount + 1; i++) {
    const newFilePathInput = document.getElementById(`newFilePath_${i}`);
    var filePathContent = document.getElementById(`filePathContent_${i}`);

    if (newFilePathInput.value.length > 0) {
      filePathContent.textContent = `git add ${newFilePathInput.value}`;
    } else {
      filePathContent.textContent = '';
    }
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

// Create a new file path input
function addFilePath(){
  const addedFilePaths = document.getElementById('addedFilePaths');
  const newFilePathContainer = document.createElement('div');
  const newFilePath = document.createElement('input');

  newFilePathsCount += 1;

  newFilePathContainer.setAttribute('id', `filePathContainer_${newFilePathsCount}`);
  newFilePath.setAttribute('id', `newFilePath_${newFilePathsCount}`);
  newFilePath.setAttribute('type', 'text');
  newFilePath.setAttribute('name', 'filePath');
  newFilePath.setAttribute('size', '50');

  newFilePathContainer.appendChild(newFilePath);

  addedFilePaths.append(newFilePathContainer);

  createContentDisplay(newFilePathsCount);
}

// Create a new file path paragraph element in the message
function createContentDisplay(newFilePathsCount){
  const addedFilePathsContent = document.getElementById('addedFilePathsContent');
  const newFilePathContent = document.createElement('p')

  newFilePathContent.setAttribute('id', `filePathContent_${newFilePathsCount}`);

  addedFilePathsContent.append(newFilePathContent);
}

// Copy the git message to the clipboard
function copyToClipboard(){
  const filePathContent = document.getElementById('filePathContent');
  const messageContent = document.getElementById('messageContent');
  const pushOriginContent = document.getElementById('pushOriginContent');
  const copiedMessageAlert = document.getElementById('copiedMessageAlert');
  var copiedMessage = filePathContent.textContent + '\n';

  if (newFilePathsCount > 0){
    for (let i = 1; i < newFilePathsCount + 1; i++) {
      var newFilePathContent = document.getElementById(`filePathContent_${i}`);

      copiedMessage += newFilePathContent.textContent + '\n';
    }
  }

  copiedMessage += messageContent.textContent + '\n';

  if (pushOriginContent !== null){
    copiedMessage += pushOriginContent.textContent;
  }

  copiedMessageAlert.textContent = 'Copied message successfully!';

  navigator.clipboard.writeText(copiedMessage);

  // setTimeout(resetForm, 1000);
}

// Reset all formatting for the form
function resetForm(){
  const copiedMessageAlert = document.getElementById('copiedMessageAlert');

  for (let i = 1; i < newFilePathsCount + 1; i++) {
    const newFilePathInput = document.getElementById(`newFilePath_${i}`);
    const newFilePathContent = document.getElementById(`filePathContent_${i}`);
    const newFilePathContainer = document.getElementById(`filePathContainer_${i}`);

    newFilePathInput.remove();
    newFilePathContent.remove();
    newFilePathContainer.remove();
  }

  copiedMessageAlert.textContent = '';

  newFilePathsCount = 0;
}