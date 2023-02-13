let selectedText, range, activeElement;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  activeElement = document.activeElement;
  const { branchName } = message;

  if (isMatchingInputType(activeElement?.tagName.toLowerCase())) {
    activeElement.value = branchName;
  } else {
    sendResponse(false);
  }

  sendResponse(true);
});

const isMatchingInputType = (type) => {
  switch (type) {
    case "input":
    case "textarea":
      return true;
    default:
      false;
  }
};
