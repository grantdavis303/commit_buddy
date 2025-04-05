// Global variables
let addedFilePathsCount = 0;
let addedFilePathIds = [];

// Continually generate the git message
function generateMessage() {
  displayMainFilePathContent();
  displayExtraFilePathContent();
  displayMessageContent();
  displayPushOriginContent();
}

function displayMainFilePathContent() {
  const filePath = document.getElementById('filePath');
  const commitAllCheckbox = document.getElementById('commitAllCheckbox');
  let commitMessage = document.getElementById('commitMessage');
  let filePathContent = document.getElementById('filePathContent');

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

function displayExtraFilePathContent() {
  for (let i = 0; i < addedFilePathIds.length; i++) {
    const value = addedFilePathIds[i];
    const newFilePathInput = document.getElementById(`newFilePathInput_${value}`);
    let newFilePathContent = document.getElementById(`newFilePathContent_${value}`);

    if (commitAllCheckbox.checked) {
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

  // for (let i = 1; i < addedFilePathsCount + 1; i++) {
  //   const newFilePathInput = document.getElementById(`newFilePathInput_${i}`);
  //   let newFilePathContent = document.getElementById(`newFilePathContent_${i}`);

  //   if (commitAllCheckbox.checked) {
  //     newFilePathContent.style.display = 'none';
  //   } else {
  //     newFilePathContent.style.display = 'block';
  //   }

  //   if (newFilePathInput.value.length > 0) {
  //     newFilePathContent.textContent = `git add ${newFilePathInput.value}`;
  //   } else {
  //     newFilePathContent.textContent = '';
  //   }
  // }
}

function displayMessageContent() {
  const dropdownOptions = document.getElementById('dropdownOptions');
  const dropdownValue = dropdownOptions.value;
  const message = document.getElementById('message');
  let messageContent = document.getElementById('messageContent');
  let newMessage;

  if (dropdownValue.length == 0) {
    newMessage = message.value;
  } else {
    let capitalizedWord = capitalizeWord(dropdownValue);

    newMessage = `${capitalizedWord} ${message.value}`;
  }

  if (message.value.length > 0) {
    messageContent.textContent = `git commit -m "${newMessage}"`;
  } else {
    messageContent.textContent = '';
  }
}

function displayPushOriginContent() {
  const pushOriginCheckbox = document.getElementById('pushOriginCheckbox');
  const pushOriginInput = document.getElementById('pushOriginInput');
  let pushOriginContent = document.getElementById('pushOriginContent');

  if (pushOriginCheckbox.checked) {
    pushOriginContent.textContent = `git push origin ${pushOriginInput.value}`;
  } else {
    pushOriginContent.textContent = '';
  }
}

// Create everything for a new file path
function addFilePathContainer() {
  const addedFilePaths = document.getElementById('addedFilePaths');
  const newFilePathContainer = document.createElement('div');
  const newFilePathInput = document.createElement('input');
  const newFilePathRemoveButton = document.createElement('button');
  const newBreak = document.createElement('br');

  addedFilePathsCount += 1;
  addedFilePathIds.push(addedFilePathsCount);

  newFilePathContainer.setAttribute('id', `filePathContainer_${addedFilePathsCount}`);

  newFilePathInput.setAttribute('id', `newFilePathInput_${addedFilePathsCount}`);
  newFilePathInput.setAttribute('type', 'text');
  newFilePathInput.setAttribute('name', 'filePath');
  newFilePathInput.setAttribute('size', '50');

  newFilePathRemoveButton.setAttribute('id', `filePathRemoveButton_${addedFilePathsCount}`);
  newFilePathRemoveButton.setAttribute('type', 'button');
  newFilePathRemoveButton.textContent = 'Remove';

  newBreak.setAttribute('id', `newBreak_${addedFilePathsCount}`);

  newFilePathContainer.appendChild(newFilePathInput);
  newFilePathContainer.appendChild(newFilePathRemoveButton);

  addedFilePaths.append(newFilePathContainer);
  addedFilePaths.append(newBreak);

  createRemoveButtonEventListener();
  createContentDisplay(addedFilePathsCount);
}

function createRemoveButtonEventListener() {
  const container = document.getElementById(`filePathRemoveButton_${addedFilePathsCount}`);

  container.addEventListener('click', removeFilePathContainer);
}

function createContentDisplay(addedFilePathsCount) {
  const addedFilePathsContent = document.getElementById('addedFilePathsContent');
  const newFilePathContent = document.createElement('p')

  newFilePathContent.setAttribute('id', `newFilePathContent_${addedFilePathsCount}`);

  addedFilePathsContent.append(newFilePathContent);
}

// Remove everything for an existing file path
function removeFilePathContainer() {
  const elementId = document.activeElement.id;
  const formattedId = elementId.replace('filePathRemoveButton_', '');
  number = Number(formattedId);

  for (let i = 1; i < addedFilePathsCount + 1; i++) {
    if (i == number) {
      const filePathContainer = document.getElementById(`filePathContainer_${number}`);
      const newBreak = document.getElementById(`newBreak_${number}`);
      const newFilePathContent = document.getElementById(`newFilePathContent_${number}`);

      filePathContainer.remove();
      newBreak.remove();
      newFilePathContent.remove();

      for (let i = 0; i < addedFilePathIds.length; i++) {
        if (addedFilePathIds[i] == number) {
          addedFilePathIds.splice(i, 1);
        }
      }

      break
    }
  }
}

// Copy the git message to the clipboard
function copyToClipboard() {
  const filePathContent = document.getElementById('filePathContent');
  const messageContent = document.getElementById('messageContent');
  const pushOriginContent = document.getElementById('pushOriginContent');
  let copiedMessage = filePathContent.textContent + '\n';

  if (addedFilePathIds.length > 0) {
    for (let i = 0; i < addedFilePathIds.length; i++) {
      const value = addedFilePathIds[i];
      let newFilePathContent = document.getElementById(`newFilePathContent_${value}`);

      if (newFilePathContent.style.display == 'block') {
        copiedMessage += newFilePathContent.textContent + '\n';
      }
    }
  }

  copiedMessage += messageContent.textContent + '\n';

  if (pushOriginContent !== null) {
    copiedMessage += pushOriginContent.textContent;
  }

  navigator.clipboard.writeText(copiedMessage);

  displayCopyConfirmation();
}

function displayCopyConfirmation() {
  const copiedMessageAlert = document.getElementById('copiedMessageAlert');

  copiedMessageAlert.textContent = 'Copied message successfully!';
  copiedMessageAlert.style.animation = 'fade_in_out 2s';

  setTimeout(() => {
    copiedMessageAlert.textContent = '';
    copiedMessageAlert.style.animation = '';
  }, 1990);
}

// Reset all formatting for the form
function resetForm() {
  let commitMessage = document.getElementById('commitMessage');

  commitMessage.style.display = 'none';

  removeAllAddedFilePaths();
  removeAllAddedBreaks();

  addedFilePathsCount = 0;
  addedFilePathIds = [];
}

function removeAllAddedFilePaths() {
  for (let i = 0; i < addedFilePathIds.length; i++) {
    const value = addedFilePathIds[i];
    const newFilePathInput = document.getElementById(`newFilePathInput_${value}`);
    const newFilePathContent = document.getElementById(`newFilePathContent_${value}`);
    const newFilePathContainer = document.getElementById(`filePathContainer_${value}`);

    newFilePathInput.remove();
    newFilePathContent.remove();
    newFilePathContainer.remove();
  }
}

function removeAllAddedBreaks() {
  const addedFilePaths = document.getElementById('addedFilePaths');

  addedFilePaths.textContent = '';
}

// Helper Functions
function capitalizeWord(word) {
  const firstLetter = word.charAt(0);
  const remainingLetters = word.substring(1);
  const capitalFirstLetter = firstLetter.toUpperCase();

  return capitalFirstLetter + remainingLetters;
}