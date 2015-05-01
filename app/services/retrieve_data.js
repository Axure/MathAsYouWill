(function (angular, undefined) {
	'use strict';

	angular
		.module('services', [])
		.service('GetDomainList', GetDomainList)
		.service('SetDomainList', SetDomainList);

	var storage = chrome.storage.local;

	GetDomainList.$inject = ['$q'];
	function GetDomainList($q) {

		return {
			get: function() {
				var deferred = $q.defer();

				storage.get('domainList', function(items) {
					if (items.domainList) {
						deferred.resolve(items.domainList)
					} else {
						deferred.reject('Get Storage Failed!');
					}
				});

				return deferred.promise;

			}
		}


	}

	SetDomainList.$inject = ['$q'];
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