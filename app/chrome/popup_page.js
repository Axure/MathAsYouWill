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

// write the router
.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'RuleListController as ruleList',
            templateUrl: '/app/html/popup_main.html',
            resolve: {
                rules: function(Rules) {
                    return Rules.fetch();
                }
            }
        })
        //.when('/edit/:domainId', {
        //    controller: 'EditRuleController as editRules',
        //    templateUrl: 'popup_detail.html'
        //})
        //.when('/edit/:ruleId', {
        //    controller: 'NewRuleController as editRules',
        //    templateUrl: 'popup_detail.html'
        //})
        .otherwise({
            redirectTo: '/'
        })







    })

.controller('RuleListController', function(rules) {
        var ruleList = this;
        ruleList.rules = rules;

        this.rules = [{
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
    });

//.controller('NewRuleController', function($location, Rules) {
//
//    })
//
//    .controller('EditRuleController', function($location, $routeParams, Rules) {
//
//    });