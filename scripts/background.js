setUpContextMenu = () => {
		chrome.contextMenus.create({
		title: 'Branch it',
		type: 'normal',
		id: 'A1',
		contexts: ['all']
	});
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	(async () => {
		const { id } = tab;
		const response = await chrome.tabs.sendMessage(id, {action: "test"}, () => {});
		// TODO: do something with response here
	})();	
});


chrome.runtime.onInstalled.addListener(() => {
  // When the app gets installed, set up the context menu
  setUpContextMenu();
});