function generateMessage(){
  var file_or_path = document.getElementById("file_or_path");
  var commit_all = document.getElementById("commit_all");
  var dropdown_options = document.getElementById("dropdown_options");
  var dropdown_value = dropdown_options.value;
  var message = document.getElementById("message");
  var new_message;

  if (commit_all.checked) {
    document.getElementById("file_or_path_content").textContent = 'git add .';
  } else if (file_or_path.value.length > 0) {
    document.getElementById("file_or_path_content").textContent = `git add ${file_or_path.value}`;
  } else {
    document.getElementById("file_or_path_content").textContent = '';
  }

  if (dropdown_value.length == 0){
    new_message = message.value;
  } else {
    var capitalizedWord = capitalizeWord(dropdown_value);

    new_message = `${capitalizedWord} ${message.value}`;
  }

  if (message.value.length > 0) {
    document.getElementById("message_content").textContent = `git commit -m "${new_message}"`;
  } else {
    document.getElementById("message_content").textContent = '';
  }
}

function capitalizeWord(word){
  var firstLetter = word.charAt(0);
  var remainingLetters = word.substring(1);
  var capitalFirstLetter = firstLetter.toUpperCase();
  return capitalFirstLetter + remainingLetters;
}