//function GenerateEmptyTable() {
//    var tableToAdd = document.createElement('table');
//    tableToAdd.id = 'domain-list-table';
//    return tableToAdd;
//}
//
//function NewEmptyRow() {
//    columnNumber = 9;
//    var rowToAdd = document.createElement('tr');
//
//    var cellToAdd = new Array();
//
//    var contentToAdd = new Array();
//
//    for (var i = 0; i < 9; i++) {
//        cellToAdd[i] = NewCenteredTd(widthArray[i]);
//        cellToAdd[i].className = 'domain-list-cell';
//    }
//
//    //processing
//
//    for (var i = 0; i < 9; i++) {
//
//        if (i === 1 || i === 2 || i === 5) {
//            contentToAdd[i] = NewCheckbox();
//            if (i === 1 || i === 2) {
//                //				contentToAdd[i].disabled = false;
//            } else {
//                //				contentToAdd[i].disabled = true;
//            }
//        } else {
//            if (i === 8) {
//                contentToAdd[i] = NewDiv();
//                var radioSet = NewRadioSet();
//                for (var j = 0; j < 3; j++) {
//                    var correspondingLabel = document.createElement('label');
//                    correspondingLabel.id = radioSet[j].id + '-parent-label';
//                    correspondingLabel.innerHTML = alignTextArray[j];
//                    correspondingLabel.appendChild(radioSet[j]);
//                    contentToAdd[i].appendChild(correspondingLabel);
//                }
//            } else {
//                contentToAdd[i] = NewTextArea();
//                if (i === 0) {
//                    //					contentToAdd[i].disabled = false;
//                } else {
//                    //					contentToAdd[i].disabled = true;
//                }
//            }
//        }
//
//
//    }
//
//    for (var i = 0; i < 9; i++) {
//        contentToAdd[i].className = 'domian-list-text';
//        contentToAdd[i].id = 'row' + (GetCurrentRowNumber() + 1) + '-' + 'column' + (i + 1);
//    }
//
//    for (var i = 0; i < 9; i++) {
//        cellToAdd[i].appendChild(contentToAdd[i]);
//        rowToAdd.appendChild(cellToAdd[i]);
//    }
//
//
//    //appending
//
//    for (var i = 0; i < 9; i++) {
//        rowToAdd.appendChild(cellToAdd[i]);
//    }
//
//    return rowToAdd;
//}
//
//function NewDiv() {
//    var newDiv = document.createElement('div');
//    return newDiv;
//}
//
//function NewRadioSet() {
//    newRadioSet = new Array()
//    for (var i = 0; i < 3; i++) {
//        newRadioSet[i] = document.createElement('input');
//        newRadioSet[i].type = 'radio';
//        newRadioSet[i].id = 'row' + (GetCurrentRowNumber() + 1) + '-' + 'radio' + alignTextArray[i];
//        newRadioSet[i].name = 'row' + (GetCurrentRowNumber() + 1);
//        if (i === 1) {
//            newRadioSet[i].checked = true;
//        } else {
//            newRadioSet[i].checked = false;
//        }
//    }
//    return newRadioSet;
//}
//
//function NewCheckbox() {
//    var newCheckbox = document.createElement('input');
//    newCheckbox.type = 'checkbox';
//    newCheckbox.checked = false;
//    return newCheckbox;
//}
//
//function NewCenteredTd(tdWidth) {
//    var newCenteredTd = document.createElement('td');
//    newCenteredTd.align = 'center';
//    newCenteredTd.height = '18px';
//    newCenteredTd.width = tdWidth;
//    return newCenteredTd;
//}
//
//function NewTextArea() {
//    var newTextArea = document.createElement('textarea');
//
//    newTextArea.style.overflow = 'hidden';
//    newTextArea.style.width = '99%';
//    newTextArea.style.height = '16px';
//    newTextArea.style.border = '0px';
//    newTextArea.resize = 'none';
//
//    return newTextArea;
//}
//
//var alignArray = new Array('left', 'center', 'right');
//var alignTextArray = new Array('L', 'C', 'R');
//var widthArray = new Array('450px', '80px', '80px', '40px', '40px', '80px', '40px', '40px', '100px');
//
//function InitializeTable() {
//    var dataTable = GenerateEmptyTable();
//    dataTable.border = '1';
//    dataTable.align = 'center';
//    dataTable.width = 'auto';
//
//
//    var headRow = document.createElement('tr');
//
//    var headColumn = new Array();
//
//    var innerHTMLarray = new Array('Regex', 'Replace', 'Render', 'L', 'R', 'Inline', 'L', 'R', 'Align');
//
//    for (var i = 0; i < 9; i++) {
//        headColumn[i] = NewCenteredTd(widthArray[i]);
//        headColumn[i].innerHTML = innerHTMLarray[i];
//    }
//
//
//
//    for (var i = 0; i < 9; i++) {
//        headRow.appendChild(headColumn[i]);
//    }
//
//
//
//    dataTable.appendChild(headRow);
//
//    document.querySelector('div#virtual-body').appendChild(dataTable);
//}
//
//function AddRowButtonOnClick() {
//    var table = document.getElementById('domain-list-table');
//    table.appendChild(NewEmptyRow());
//}
//
//function ResetData() {
//    storage.remove('domainList', function (items) {
//        ShowMessage('Data removed');
//    });
//}
//
//function SaveCurrentDomainList() {
//    var currentDomainList = new Array();
//    if (GetCurrentRowNumber() === 0) {
//        ShowMessage('No data!');
//        return;
//    }
//    var redundantRow = 0;
//    for (var i = 0; i < GetCurrentRowNumber(); i++) {
//        var ifEmpty = false;
//        for (var j = 1; j <= 9; j++) {
//            var cellId = '#' + 'row' + (i + 1) + '-' + 'column' + j;
//            if (j === 1) {
//                var listValue = document.querySelector(cellId).value;
//                ifEmpty = ifEmpty || (listValue === '');
//            }
//        }
//        if (ifEmpty) {
//            redundantRow++;
//        } else {
//            currentDomainList[i - redundantRow] = new Array();
//            for (var j = 1; j <= 9; j++) {
//                var cellId = '#' + 'row' + (i + 1) + '-' + 'column' + j;
//                if (j === 2 || j === 3 || j === 6) {
//                    var listValue = document.querySelector(cellId).checked;
//                } else {
//                    if (j != 9) {
//                        var listValue = document.querySelector(cellId).value;
//                    } else {
//                        var radioPrefix = '#' + 'row' + (i + 1) + '-' + 'radio';
//                        var radioArray = new Array();
//                        for (var k = 0; k < 3; k++) {
//                            radioArray[k] = radioPrefix + alignTextArray[k];
//                            if (document.querySelector(radioArray[k]).checked) {
//                                listValue = alignTextArray[k];
//                            }
//                        }
//                    }
//                }
//                currentDomainList[i - redundantRow][j - 1] = listValue;
//            }
//        }
//    }
//    storage.set({
//        'domainList': currentDomainList
//    }, function () {
//        if (currentDomainList.length === 0) {
//            storage.remove('domainList', function (items) {
//                ShowMessage('Data removed');
//            });
//        } else {
//            ShowMessage('Successfully saved!');
//        }
//    });
//}
//
//function GetCurrentDomainList() {
//    storage.get('domainList', function (items) {
//        if (items.domainList) {
//            var currentDomainList = items.domainList;
//            ShowMessage('Loaded saved data!');
//            var listLength = currentDomainList.length;
//            for (var i = 0; i < listLength; i++) {
//                AddRowButtonOnClick();
//                for (var j = 1; j <= 9; j++) {
//                    var cellId = '#' + 'row' + (i + 1) + '-' + 'column' + j;
//                    if (j === 2 || j === 3 || j === 6) {
//                        if (currentDomainList[i][j - 1]) {
//                            document.querySelector(cellId).checked = true;
//                        } else {
//                            document.querySelector(cellId).checked = false;
//                        }
//                    } else {
//                        if (j != 9) {
//                            document.querySelector(cellId).value = currentDomainList[i][j - 1];
//                        } else {
//                            var radioPrefix = '#' + 'row' + (i + 1) + '-' + 'radio';
//                            var radioId = radioPrefix + currentDomainList[i][j - 1];
//
//                            document.querySelector(radioId).checked = true;
//                        }
//                    }
//                }
//            }
//        } else {
//            ShowMessage('No save data!');
//        }
//    });
//}
//
//
//function GetCurrentRowNumber() {
//    return document.querySelectorAll('td.domain-list-cell').length / 9;
//}
//
//
//var storage = chrome.storage.local;
//
//function ShowMessage(msg) {
//    var messageOpt = {
//        type: 'basic',
//        title: 'Options',
//        message: msg,
//        iconUrl: 'icon128.png'
//    }
//    chrome.notifications.clear(msg, function (notificationId) {});
//    chrome.notifications.create(msg, messageOpt, function (notificationId) {});
//}
//
//function ClassicalMessage(msg) {
//  var message = document.querySelector('#message');
//  message.innerText = msg;
//  setTimeout(function() {
//    message.innerText = '';
//  }, 3000);
//}
//
//function ShowHint(){
//	ClassicalMessage('Leave regexp blank to delete that row');
//}
//
//document.addEventListener('DOMContentLoaded', function () {
//    InitializeTable();
//    GetCurrentDomainList();
//	ShowHint();
//    document.getElementById('addRowButton').addEventListener('click', AddRowButtonOnClick);
//    document.getElementById('saveRuleButton').addEventListener('click', SaveCurrentDomainList);
//    document.getElementById('resetRuleButton').addEventListener('click', ResetData);
//});
//
//
//
//angular.module('MaYW_Options', [])
//    .controller('DomainListController', function() {
//       var domainList = this;
//
////        domainList.domains = domainList.retrieveDomain(); // retrieving
//        domainList.domains = [
//            {
//                regex: "This1",
//                if_replace: true,
//                if_render: true,
//                r_left: "F",
//                r_right: "R",
//                inline: true,
//                i_left: "C",
//                i_right: "F,",
//                alignment: "r",
//                old: true
//            }, {domain: "This2"}, {domain: "This3"}
//
//        ];
//
//        domainList.debug = function() {
//            for(var i = 0; i < domainList.size(); ++i) {
//                console.log(domainList.domains[i][domain])
//            }
//            return domainList.domains;
//        };
//
//        domainList.addDomain = function(domain) {
//            domainList.domains.push(domain);
//            console.log(domainList);
//            console.log(typeof domainList.domains);
//        };
//
//        domainList.fuck = "Fuck yourself!";
//
//        domainList.addNewRow = function() {
//            domainList.addDomain({
//                    regex: "",
//                    if_replace: false,
//                    if_render: false,
//                    r_left: "",
//                    r_right: "",
//                    inline: false,
//                    i_left: "",
//                    i_right: "",
//                    alignment: "",
//                    old: false
//                }
//            )
//        };
//
//        domainList.activated = function() {
//            var count = 0;
//            angular.forEach(domainList.domains, function(todo) {
//                count += todo.done ? 0 : 1;
//            });
//            console.log(count);
//            return count;
//        };
//
//        domainList.size = function() {
//            return Object.keys(domainList.domains).length;
//        };
//
//
//
//
//        domainList.retrieveDomain = function() {
//            storage.get('domainList', function (items) {
//                if (items.domainList) {
//                    var currentDomainList = items.domainList;
//                    ShowMessage('Loaded saved data!');
//
//                } else {
//                    ShowMessage('No save data!');
//                }
//            });
//        }; // How to invoke this function on lunch?
//
//
//
//
//    });



(function(angular) {
    angular
        .module('MaYW', ['services'])
        .controller('OptionController', OptionPageController);

    OptionPageController.$inject = ['GetDomainList', 'SetDomainList'];
    function OptionPageController(GetDomainList, SetDomainList) {

        var vm = this;
        //vm.loadDomainList = loadDomainList();
        //vm.submitDomainList = submitDomainList();
        //vm.addRow = addRow();
        //vm.delRow = delRow();
        //vm.resetRules = resetRules();
        vm.enabledModel = {isEnabled: true};
        vm.domainList = [
            {
                regex: "This1",
                if_replace: true,
                if_render: true,
                r_left: "F",
                r_right: "R",
                inline: true,
                i_left: "C",
                i_right: "F,",
                alignment: "r",
                old: true,
                isEnabled: true
            }, {domain: "This2", isEnabled: true}, {domain: "This3", isEnabled: false}

        ];
        alert(vm.domainList);
        function loadDomainList() {
            alert("Fucked!");
            GetDomainList.get().then(
                function(domainList) {
                    vm.domainList = domainList.map(function(item) {
                        item.isEnabled = true;
                        return item;
                    });
                },
                function(message) {
                    // Do something with the message
                });
        }

        function submitDomainList() {
            domainList = domainList.filter(function(item) {
               return item.isEnabled;
            });
            SetDomainList.set(domainList).then(
                function() {
                    // Do something with the message.
                }
            )
        }

        //loadDomainList();

        function addRow() {
            //vm.domainList.push({});
        }

        vm.delRow = function delRow(domain) {
            alert(JSON.stringify(domain));
            domain.isEnabled = false;
        };

        function resetRules() {
            // Alert a message box for options.
        }

    }
})(angular);