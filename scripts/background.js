// TODO: Read these from storage
const prefix1 = "feature";
const prefix2 = "bug";
const replaceCharacter = "-";

setUpContextMenu = () => {
  chrome.contextMenus.create({
    title: "Branch it",
    type: "normal",
    id: "A",
    contexts: ["all"],
  });

  chrome.contextMenus.create({
    title: `${prefix1}/`,
    id: `p/${prefix1}`,
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    title: `${prefix2}/`,
    id: `p/${prefix2}`,
    contexts: ["selection"],
  });
};

const convertTextToBranchName = (text, menuItemId) => {
  let result = text?.replaceAll(" ", replaceCharacter);

  if (menuItemId.startsWith("p")) {
    const prefix = menuItemId.slice("2");
    result = `${prefix}/${result}`;
  }

  return result;
};

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  (async () => {
    const { id } = tab;
    const { editable, frameId, menuItemId, selectionText } = info;

    const response = await chrome.tabs.sendMessage(
      id,
      { branchName: convertTextToBranchName(selectionText, menuItemId) },
      () => {}
    );
    // TODO: do something with response here if the input text can't be set from the content script. 
  })();
});

chrome.runtime.onInstalled.addListener(() => {
  // When the app gets installed, set up the context menu
  setUpContextMenu();
});
