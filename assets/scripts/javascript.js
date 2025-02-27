// Define global variables
var addedFilePathsCount = 0;

// Continually generate the git message
function generateMessage(){
  displayMainFilePathContent();
  displayExtraFilePathContent();
  displayMessageContent();
  displayPushOriginContent();
}

// Display the file or file path for all inputs
function displayMainFilePathContent(){
  const filePath = document.getElementById('filePath');
  const commitAllCheckbox = document.getElementById('commitAllCheckbox');
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

function displayExtraFilePathContent(){
  for (let i = 1; i < addedFilePathsCount + 1; i++) {
    const newFilePathInput = document.getElementById(`newFilePathInput_${i}`);
    var newFilePathContent = document.getElementById(`newFilePathContent_${i}`);

    if (commitAllCheckbox.checked){
      newFilePathContent.style.display = 'none';
    } else {
      newFilePathContent.style.display = 'block';
    }

    if (newFilePathInput.value.length > 0) {
      newFilePathContent.textContent = `git add ${newFilePathInput.value}`;
    } else {
      newFilePathContent.textContent = '';
    }
  }
}

function displayMessageContent(){
  const dropdownOptions = document.getElementById('dropdownOptions');
  const dropdownValue = dropdownOptions.value;
  const message = document.getElementById('message');
  var messageContent = document.getElementById('messageContent');
  var newMessage;

  if (dropdownValue.length == 0){
    newMessage = message.value;
  } else {
    var capitalizedWord = capitalizeWord(dropdownValue);

    newMessage = `${capitalizedWord} ${message.value}`;
  }

  if (message.value.length > 0) {
    messageContent.textContent = `git commit -m "${newMessage}"`;
  } else {
    messageContent.textContent = '';
  }
}

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

function capitalizeWord(word){
  const firstLetter = word.charAt(0);
  const remainingLetters = word.substring(1);
  const capitalFirstLetter = firstLetter.toUpperCase();

  return capitalFirstLetter + remainingLetters;
}

// Create a new file path input w/ container and paragraph element in the displayed git message
function addFilePathContainer(){
  const addedFilePaths = document.getElementById('addedFilePaths');
  const newFilePathContainer = document.createElement('div');
  const newFilePathInput = document.createElement('input');

  addedFilePathsCount += 1;

  newFilePathContainer.setAttribute('id', `filePathContainer_${addedFilePathsCount}`);
  newFilePathInput.setAttribute('id', `newFilePathInput_${addedFilePathsCount}`);
  newFilePathInput.setAttribute('type', 'text');
  newFilePathInput.setAttribute('name', 'filePath');
  newFilePathInput.setAttribute('size', '50');

  newFilePathContainer.appendChild(newFilePathInput);

  addedFilePaths.append(newFilePathContainer);

  addBreak();

  createContentDisplay(addedFilePathsCount);
}

function createContentDisplay(addedFilePathsCount){
  const addedFilePathsContent = document.getElementById('addedFilePathsContent');
  const newFilePathContent = document.createElement('p')

  newFilePathContent.setAttribute('id', `newFilePathContent_${addedFilePathsCount}`);

  addedFilePathsContent.append(newFilePathContent);
}

// Copy the git message to the clipboard
function copyToClipboard(){
  const filePathContent = document.getElementById('filePathContent');
  const messageContent = document.getElementById('messageContent');
  const pushOriginContent = document.getElementById('pushOriginContent');
  var copiedMessage = filePathContent.textContent + '\n';

  if (addedFilePathsCount > 0){
    for (let i = 1; i < addedFilePathsCount + 1; i++) {
      var newFilePathContent = document.getElementById(`newFilePathContent_${i}`);

      if (newFilePathContent.style.display == 'block') {
        copiedMessage += newFilePathContent.textContent + '\n';
      }
    }
  }

  copiedMessage += messageContent.textContent + '\n';

  if (pushOriginContent !== null){
    copiedMessage += pushOriginContent.textContent;
  }

  navigator.clipboard.writeText(copiedMessage);

  displayCopyConfirmation();
}

// Reset all formatting for the form
function resetForm(){
  const copiedMessageAlert = document.getElementById('copiedMessageAlert');

  removeAllAddedFilePaths();
  removeAllAddedBreaks();

  copiedMessageAlert.textContent = '';

  addedFilePathsCount = 0;
}

// Display the green confirmation message briefly
function displayCopyConfirmation(){
  const copiedMessageAlert = document.getElementById('copiedMessageAlert');

  copiedMessageAlert.textContent = 'Copied message successfully!';

  setTimeout(() => {
    copiedMessageAlert.textContent = '';
  }, 1000);
}

// Add a line break below every new file path added
function addBreak(){
  const addedFilePaths = document.getElementById('addedFilePaths');
  const newBreak = document.createElement('br');

  addedFilePaths.append(newBreak);
}

// Remove all new file paths
function removeAllAddedFilePaths(){
  for (let i = 1; i < addedFilePathsCount + 1; i++) {
    const newFilePathInput = document.getElementById(`newFilePathInput_${i}`);
    const newFilePathContent = document.getElementById(`newFilePathContent_${i}`);
    const newFilePathContainer = document.getElementById(`filePathContainer_${i}`);

    newFilePathInput.remove();
    newFilePathContent.remove();
    newFilePathContainer.remove();
  }
}

// Remove all line breaks below every new file path added
function removeAllAddedBreaks(){
  const addedFilePaths = document.getElementById('addedFilePaths');

  addedFilePaths.textContent = '';
}