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