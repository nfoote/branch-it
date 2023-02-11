let selectedText, range, activeElement;

chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {
		activeElement = document.activeElement;

		if (isMatchingInputType(activeElement?.tagName.toLowerCase())) {
			activeElement.value = activeElement.value.slice(activeElement.selectionStart, activeElement.selectionEnd)?.replaceAll(' ', '-');;
		} else {
			setSelectedText();
		}

        // TODO: Send a response for debugging/error messages
        // sendResponse();
    }
);

const isMatchingInputType = type => {
    switch (type) {
        case "input":
        case "textarea":
			return true;
        default:
			false;
    }
};

const setSelectedText = () => {
  const selectObj = window.getSelection();
  const a = document.createElement("a");

  selectedText = selectObj.toString();
  range = selectObj.getRangeAt(0)

  a.innerHTML = selectedText
  a.type = "link";
  a.href = ""
  a.target = "_blank";
  range.deleteContents();
  range.insertNode(a);
}