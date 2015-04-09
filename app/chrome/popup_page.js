/**
 * Created by zhenghu on 15 年 四月. 2..
 */

// We need to check if the regex matches the current domain?
// We can let the user choose whether to display all the regex or the regexes that match the current page....

angular.module('MaYW_Popup', ['ngRoute'])

.service('Rules', function() {

        var self = this;

        this.fetch = function() {
            if (this.projects) return;

            return function() {
                self.rules = [{
                    id: 1,
                    regex: "This1",
                    if_replace: true,
                    if_render: true,
                    r_left: "F",
                    r_right: "R",
                    inline: true,
                    i_left: "C",
                    i_right: "F,",
                    alignment: "r",
                    old: true
                },{
                    id: 2,
                    regex: "This2",
                    if_replace: true,
                    if_render: true,
                    r_left: "F",
                    r_right: "R",
                    inline: true,
                    i_left: "C",
                    i_right: "F,",
                    alignment: "r",
                    old: true
                },{
                    id: 3,
                    regex: "This3",
                    if_replace: true,
                    if_render: true,
                    r_left: "F",
                    r_right: "R",
                    inline: true,
                    i_left: "C",
                    i_right: "F,",
                    alignment: "r",
                    old: true
                }]
            }


        }



    }) // The service that retrieves data from local storage?

    .config( [
        '$compileProvider',
        function( $compileProvider )
        {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
            // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
        }
    ])

// write the router
.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'RuleListController as ruleList',
            templateUrl: '/app/html/templates/popup_main.html',
            resolve: {
                rules: function(Rules) {
                    return Rules.fetch();
                }
            }
        })
        .when('/edit/:ruleId', {
            controller: 'EditRuleController as editRules',
            templateUrl: '/app/html/templates/popup_detail.html'
        })
        .when('/new', {
            controller: 'NewRuleController as editRules',
            templateUrl: '/app/html/templates/popup_detail.html'
        })
        .otherwise({
            redirectTo: '/'
        })







    })

.controller('RuleListController', function(rules) {
        var ruleList = this;
        ruleList.rules = rules;

        this.rules = [{
            id: 1,
            regex: "This1",
            if_replace: true,
            if_render: true,
            r_left: "F",
            r_right: "R",
            inline: true,
            i_left: "C",
            i_right: "F,",
            alignment: "r",
            old: true
        },{
            id: 2,
            regex: "This2",
            if_replace: true,
            if_render: true,
            r_left: "F",
            r_right: "R",
            inline: true,
            i_left: "C",
            i_right: "F,",
            alignment: "r",
            old: true
        },{
            id: 3,
            regex: "This3",
            if_replace: true,
            if_render: true,
            r_left: "F",
            r_right: "R",
            inline: true,
            i_left: "C",
            i_right: "F,",
            alignment: "r",
            old: true
        }]
    })

.controller('NewRuleController', function($location, Rules) {

    })

.controller('EditRuleController', function($location, $routeParams, Rules) {

    });