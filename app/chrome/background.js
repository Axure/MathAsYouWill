chrome.webRequest.onHeadersReceived.addListener(function(details) {

});

// Show TeX code when pressing the icon.
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(null, {
        code: "showTex();"
    });
});

// Define constants.
var storage = chrome.storage.local;
var customConfigPrefix = 'MathJax.Hub.Config({tex2jax: {';
var customConfigSuffix = 'processEscapes: true}})';
var customConfigSuffix2 = 'processEscapes: true},';




// Determine the MathJax configuration

function GenerateConfig(domainUrl) {
    //read options from storage
    storage.get('domainList', function (items) {
        if (items.domainList) {
            var currentDomainList = items.domainList;
            console.log('Loading list successful');

            //processing
            var listLength = currentDomainList.length;
            for (var i = 0; i < listLength; i++) {
                var matchPattern = new RegExp(currentDomainList[i][0]);
            }
        }
    });
}




// Send messages to content script for debugging.

function DebugSendMessage(message) {

}



// On current tab loaded.
chrome.tabs.onUpdated.addListener(function (tabId, info) {
    if (info.status === "complete") {

        storage.get('domainList', function (items) {
            if (items.domainList) {

                var currentDomainList = items.domainList;
                var listLength = currentDomainList.length;


                chrome.tabs.get(tabId, function (tab) {

                    //	var current = tabs[0];
                    //	var tabId = current.id;
                    var domainUrl = tab.url;

                    var ifReplace = false;
                    for (var i = 0; i < listLength; i++) {
                        var matchPattern = new RegExp(currentDomainList[i][0]);
                        if (domainUrl.match(matchPattern) != null) {
                            ifReplace = (ifReplace || currentDomainList[i][1]);
                        }
                    }

                    //==================================================================
                    var ifRender = false;
                    var customConfigInline = '';

                    for (var i = 0; i < listLength; i++) {

                        var matchPattern = new RegExp(currentDomainList[i][0]);

                        if (domainUrl.match(matchPattern) != null) {

                            ifRender = (ifRender || currentDomainList[i][2]);

                            if (currentDomainList[i][2] === true) {
                                customConfigInline = (customConfigInline + "['" + currentDomainList[i][3] + "','" + currentDomainList[i][4] + "'],");
                            }
                        }
                    }

                    if (customConfigInline != '') {
                        customConfigInline = customConfigInline.substring(0, customConfigInline.length - 1);
                        customConfigInline = 'inlineMath: [ ' + customConfigInline + '],';
                    }
                    //==================================================================
                    var ifDisplay = false;
                    var customConfigDisplay = '';
                    var customAlign = 'C';

                    for (var i = 0; i < listLength; i++) {

                        var matchPattern = new RegExp(currentDomainList[i][0]);


                        if (domainUrl.match(matchPattern) != null) {
                            ifDisplay = (ifDisplay || (currentDomainList[i][5] && currentDomainList[i][2]));

                            if ((currentDomainList[i][5] && currentDomainList[i][2]) === true) {
                                customConfigDisplay = (customConfigDisplay + "['" + currentDomainList[i][6] + "','" + currentDomainList[i][7] + "'],");
                                customAlign = currentDomainList[i][8];
                            }
                        }
                    }

                    if (customConfigDisplay != '') {
                        customConfigDisplay = customConfigDisplay.substring(0, customConfigDisplay.length - 1);
                        customConfigDisplay = 'displayMath: [ ' + customConfigDisplay + '],'; }


                    switch (customAlign) {
                    case 'L':
                        customAlign = 'left';
                        break;
                    case 'C':
                        customAlign = 'center';
                        break;
                    case 'R':
                        customAlign = 'right';
                        break;
                    }
                    customAlign = 'displayAlign: "' + customAlign + '"})';
                    //==================================================================
                    if (ifDisplay) {
                        var customConfig = customConfigPrefix + customConfigInline + customConfigDisplay + customConfigSuffix2 + customAlign;
                    } else {
                        var customConfig = customConfigPrefix + customConfigInline + customConfigSuffix;
                    }

                    chrome.tabs.get(tabId, function (tab) {
                        chrome.tabs.sendMessage(tab.id, {
                            replace: ifReplace,
                            render: ifRender,
                            config: customConfig
                        }, function (response) {});
                    });

                });


            }

        });
    };
});


// Listen to message passed from content_script.
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.type === 'mathjax-error') {
            chrome.notifications.clear('mathjax-error', function (notificationId) {});
            chrome.notifications.create('mathjax-error', request.opt, function (notificationId) {});
        }
    });

// Context menus
var refreshMathJax = chrome.contextMenus.create({
    'title': 'Load MathJax Temporarily',
    'onclick': LoadMathJaxTemporarily
});

function LoadMathJaxTemporarily() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            update: true
        });
    });
}