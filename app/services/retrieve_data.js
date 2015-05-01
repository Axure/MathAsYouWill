(function (angular, undefined) {
	'use strict';

	angular
		.module('MaYW')
		.service('GetDomainList', GetDomainList);



	GetDomainList.$inject = ['$q'];
	function GetDomainList() {

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

})(angular);