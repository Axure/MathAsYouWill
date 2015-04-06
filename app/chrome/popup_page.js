/**
 * Created by zhenghu on 15 年 四月. 2..
 */


angular.module('popup_page', ['ngRoute'])

.service('getDomain')


.config(function($routeProvider) {
        $routeProvider
            .when('/popup.html'), {
            controller: 'PopupListController as popupList',
            templateUrl: ''
        }
    })