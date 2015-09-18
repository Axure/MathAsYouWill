(function (angular) {
    angular
        .module('MaYW', ['services'])
        .controller('OptionController', OptionPageController);

    OptionPageController.$inject = ['GetDomainList', 'SetDomainList'];
    /**
     *
     * @param GetDomainList
     * @param SetDomainList
     * @constructor
     */
    function OptionPageController(GetDomainList, SetDomainList) {

        var vm = this;
        vm.enabledModel = {isEnabled: true};
        vm.domainList = [];

        /**
         * Get the domain list using the service.
         */
        GetDomainList.get().then(function (domainList) {
            vm.domainList = domainList;
            console.log(vm.domainList);
            if (vm.domainList === []) {
                console.log("Fucked");
                vm.domainList = [];
            }
        });


        function loadDomainList() {
            console.log("Fucked!");
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

        /**
         * Add a row.
         */
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

        /**
         * Save all the rules.
         */
        vm.saveRules = function () {
            vm.domainList = vm.domainList.filter(function (item) {
                return item.isEnabled;
            });
            SetDomainList.set(vm.domainList).then(
                function () {
                    console.log('Save successful!');
                    // Do something with the message.
                }
            )
        };

        /**
         * Delete a row.
         * @param domain
         */
        vm.delRow = function (domain) {
            console.log(JSON.stringify(domain));
            domain.isEnabled = false;
        };

        function resetRules() {
            // console.log a message box for options.
        }

    }
})(angular);