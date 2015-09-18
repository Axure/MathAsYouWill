(function (angular, undefined) {
    'use strict';

    /**
     * The angular module `services`.
     */
    angular
        .module('services', [])
        .service('GetDomainList', GetDomainList)
        .service('SetDomainList', SetDomainList);

    var storage = chrome.storage.local;

    /**
     * Dependency injection.
     * @type {string[]}
     */
    GetDomainList.$inject = ['$q'];
    /**
     * The object to get domain list.
     *
     * @param $q
     * @returns {{get: Function}}
     * @constructor
     */
    function GetDomainList($q) {

        return {
            get: function () {
                var deferred = $q.defer();

                storage.get('domainList', function (items) {
                    if (items.domainList) {
                        console.log("Got successful!");
                        console.log(JSON.stringify(items.domainList));
                        deferred.resolve(items.domainList)
                    } else {
                        console.log("Original does not exist!");
                        items.domainList = [];
                        deferred.resolve(items.domainList);
                        console.log(JSON.stringify(items.domainList));
                        //deferred.reject('Get Storage Failed!');
                    }
                });

                return deferred.promise;

            }
        }


    }

    /**
     * Dependency injection.
     * @type {string[]}
     */
    SetDomainList.$inject = ['$q'];
    /**
     * The object set the domain list.
     *
     * @param $q
     * @returns {{set: Function}}
     * @constructor
     */
    function SetDomainList($q) {
        return {
            set: function set(domainList) {
                var deferred = $q.defer();

                storage.set({
                    'domainList': domainList
                }, function () {
                    if (domainList.length === 0) {
                        storage.remove('domainList', function () {
                            deferred.resolve('Data removed');
                        });
                    } else {
                        deferred.resolve('Successfully saved!');
                    }
                });

                return deferred.promise;
            }
        }
    }


})(angular);