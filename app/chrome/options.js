(function (angular) {
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
        //vm.loadDomainList = loadDomainList;

        vm.domainList = [];

        GetDomainList.get().then(function (domainList) {
            vm.domainList = domainList;
            console.log(vm.domainList);
            if (vm.domainList === []) {
                console.log("Fucked");
                vm.domainList = [];
            }
        });


        function loadDomainList() {
            alert("Fucked!");
            GetDomainList.get().then(
                function (domainList) {
                    vm.domainList = domainList.map(function (item) {
                        item.isEnabled = true;
                        return item;
                    });
                },
                function (message) {
                    // Do something with the message
                });
        }

        function submitDomainList() {
            domainList = domainList.filter(function (item) {
                return item.isEnabled;
            });
            SetDomainList.set(domainList).then(
                function () {
                    // Do something with the message.
                }
            )
        }

        //loadDomainList();

        vm.addRow = function () {
            vm.domainList.push({
                regex: "",
                if_replace: false,
                if_render: false,
                r_left: "",
                r_right: "",
                inline: false,
                i_left: "",
                i_right: "",
                alignment: "",
                old: true,
                isEnabled: true
            });
        };

        vm.saveRules = function () {
            vm.domainList = vm.domainList.filter(function (item) {
                return item.isEnabled;
            });
            SetDomainList.set(vm.domainList).then(
                function () {
                    alert('Save successful!');
                    // Do something with the message.
                }
            )
        };

        vm.delRow = function (domain) {
            alert(JSON.stringify(domain));
            domain.isEnabled = false;
        };

        function resetRules() {
            // Alert a message box for options.
        }

    }
})(angular);