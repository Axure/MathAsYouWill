/**
 * The object to parse CSP.
 *
 * @param policy The CSP to be parsed.
 * @returns {Policy}
 * @constructor
 */
function Policy(policy) {
    // Allow empty policies
    if (!policy) {
        this.raw = '';
        this.directives = {};
        return this;
    }

    policy = policy.toLowerCase();

    this.raw = policy;
    this.directives = {};

    var directives = this.raw.split(';');
    for (var i = 0; i < directives.length; ++i) {
        var directive = directives[i].trim();
        var tokens = directive.split(/\s+/);

        var name = tokens[0];
        if (!name) {
            continue;
        }
        var values = tokens.slice(1, tokens.length);
        this.directives[name] = values.join(' ');
    }
    return this;
}

Policy.prototype.get = function (directive) {
    if (!this.directives[directive])
        return '';
    return this.directives[directive];
};

Policy.prototype.add = function (directive, value) {
    if (!this.directives[directive]) {
        this.directives[directive] = value;
    } else {
        this.directives[directive] += ' ' + value;
    }
    return this.directives[directive];
};

Policy.prototype.set = function (directive, value) {
    if (!value) {
        delete this.directives[directive];
        return;
    }
    this.directives[directive] = value;
    return this.directives[directive];
};

Policy.prototype.remove = function (directive, value) {
    if (!this.directives[directive]) {
        return;
    } else {
        var directiveValues = this.directives[directive].split(' ');
        var index = directiveValues.indexOf(value);
        if (index > -1) {
            directiveValues.splice(index, 1);
            this.directives[directive] = directiveValues.join(' ');
        }
    }
};

Policy.prototype.toString = Policy.prototype.string = function () {
    var out = '';
    for (var directive in this.directives) {
        if (this.directives[directive]) {
            out += directive + ' ' + this.directives[directive] + '; ';
        }
    }
    return out.trim();
};

Policy.prototype.toPrettyString = Policy.prototype.prettyString = function () {
    var out = '';
    for (var directive in this.directives) {
        if (this.directives[directive]) {
            out += directive + '\n\t' + this.directives[directive] + ';\n';
        }
    }
    return out.substring(0, out.length - 1);
};

/**
 * Modify the header to work on some pages with strict CSP.
 */
chrome.webRequest.onHeadersReceived.addListener(function (detail) {
        console.log(detail);
        for (var i = 0; i < detail.responseHeaders.length; ++i) {
            var header = detail.responseHeaders[i];
            console.log(header);
            if (header.name == "Content-Security-Policy") {
                var policy = new Policy(detail.responseHeaders[i].value);
                policy.add('script-src', "'unsafe-eval'");
                //detail.responseHeaders[i].value = "unsafe-eval";
                detail.responseHeaders[i].value = policy.toString();
                console.log("Header modified!");
                console.log(detail.responseHeaders[i]);
                console.log(detail.responseHeaders);
            }
        }
        return {
            responseHeaders: detail.responseHeaders
        };
    },
    {
        urls: ["\u003Call_urls\u003E"],
        types: ['main_frame']
    },
    ["blocking", "responseHeaders"]
);

/**
 * Show LaTeX code when pressing the icon.
 */
chrome.browserAction.onClicked.addListener(function (tab) {
    //chrome.browserAction.setBadgeText({text: "yeah"});
    console.log("I am clicked!");
    chrome.tabs.executeScript(null, {
        code: "showTex();"
    });
});

/**
 * Define the constants
 * @type {!StorageArea}
 */
var storage = chrome.storage.local;
var customConfigPrefix = 'MathJax.Hub.Config({tex2jax: {';
var customConfigSuffix = 'processEscapes: true}})';
var customConfigSuffix2 = 'processEscapes: true},';

console.log("Background has begun!");


/**
 * Generate the MathJax configuration according to the current domain.
 *
 * @param domainUrl The current domain URL.
 */
function GenerateConfig(domainUrl) {
    //read options from storage
    storage.get('domainList', function (items) {
        if (items.domainList) {
            var currentDomainList = items.domainList;
            console.log('Loading list successful');

            //processing
            var listLength = currentDomainList.length;
            for (var i = 0; i < listLength; i++) {
                var matchPattern = new RegExp(currentDomainList[i].regex);
            }
        }
    });
}


// Send messages to content script for debugging.

function DebugSendMessage(message) {

}

/**
 * On current tab loaded, load the domain list and generate the configurations.
 */
chrome.tabs.onUpdated.addListener(function (tabId, info) {
    chrome.browserAction.setBadgeText({text: "yeah"});
    console.log("A tab has been loaded!");
    if (info.status === "complete") {

        storage.get('domainList', function (items) {
            if (items.domainList) {

                var currentDomainList = items.domainList;
                var listLength = currentDomainList.length;

                console.log(currentDomainList);
                chrome.tabs.get(tabId, function (tab) {

                    //	var current = tabs[0];
                    //	var tabId = current.id;
                    var domainUrl = tab.url;
                    console.log("Domain url is " + tab.url);

                    var ifReplace = false;
                    for (var i = 0; i < listLength; i++) {
                        var matchPattern = new RegExp(currentDomainList[i].regex);
                        if (domainUrl.match(matchPattern) != null) {
                            ifReplace = (ifReplace || currentDomainList[i].if_replace);
                        }
                    }

                    //==================================================================
                    var ifRender = false;
                    var customConfigInline = '';

                    for (var i = 0; i < listLength; i++) {

                        var matchPattern = new RegExp(currentDomainList[i].regex);

                        if (domainUrl.match(matchPattern) != null) {

                            ifRender = (ifRender || currentDomainList[i].if_render);

                            if (currentDomainList[i].if_render === true) {
                                customConfigInline = (customConfigInline + "['" + currentDomainList[i].r_left + "','" + currentDomainList[i].r_right + "'],");
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

                        var matchPattern = new RegExp(currentDomainList[i].regex);


                        if (domainUrl.match(matchPattern) != null) {
                            ifDisplay = (ifDisplay || (currentDomainList[i].inline && currentDomainList[i].if_render));

                            if ((currentDomainList[i].inline && currentDomainList[i].if_render) === true) {
                                customConfigDisplay = (customConfigDisplay + "['" + currentDomainList[i].i_left + "','" + currentDomainList[i].i_right + "'],");
                                customAlign = currentDomainList[i].alignment;
                            }
                        }
                    }

                    if (customConfigDisplay != '') {
                        customConfigDisplay = customConfigDisplay.substring(0, customConfigDisplay.length - 1);
                        customConfigDisplay = 'displayMath: [ ' + customConfigDisplay + '],';
                    }


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

                    console.log({
                        replace: ifReplace,
                        render: ifRender,
                        config: customConfig
                    });

                    chrome.tabs.get(tabId, function (tab) {
                        chrome.tabs.sendMessage(tab.id, {
                            replace: ifReplace,
                            render: ifRender,
                            config: customConfig
                        }, function (response) {
                        });
                    });

                });


            }

        });
    }
    ;
});


// Listen to message passed from content_script.
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.type === 'mathjax-error') {
            chrome.notifications.clear('mathjax-error', function (notificationId) {
            });
            chrome.notifications.create('mathjax-error', request.opt, function (notificationId) {
            });
        }
    });

/**
 * Create entries in the context menu.
 * @type {number}
 */
var refreshMathJax = chrome.contextMenus.create({
    'title': 'Load MathJax Temporarily',
    'onclick': LoadMathJaxTemporarily
});

/**
 * Load MathJax temporarily.
 */
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