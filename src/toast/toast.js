import angular from 'angular'
import moduleUtil from '../util/util'
import moduleDialog from '../dialog/dialog'


import toast_tpl from './toast.html'
import loading_tpl from './loading.html'


function toastController($scope,$timeout) {
    $timeout(function () {
        $scope.$dialogOk();
    },$scope.$options.duration)
}
toastController.$inject=['$scope','$timeout'];

function loadingController($scope,$timeout) {
    $timeout(function () {
        $scope.$dialogOk();
    },10000)
}
loadingController.$inject=['$scope','$timeout'];



function hcmuiToast($hcmuiDialog) {
    let service = {};

    service.toast = function (content, options) {
        /**
         * .toast 一般用于操作成功时的提示场景
         * @param {string} content toast的文字
         * @param {number=} [options.duration=3000] 多少毫秒后关闭toast
         * @param {string=} options.className 自定义类名
         *
         * @example
         * weui..toast('操作成功', 3000);
         * weui..toast('操作成功', {
         *     duration: 3000,
         *     className: 'custom-classname',
         *     callback: function(){ console.log('close') }
         * });
         */

        if (typeof options === 'number') {
            options = {
                duration: options
            };
        }

        options = angular.extend({
            content:content||'操作成功',
            duration: 3000,
            template: toast_tpl,
            className: (options&&options.className) || '',
            mask: false,
            controller: 'ToastController',
        }, options);

        return $hcmuiDialog.showDialog(options);
    };

    service.loading = function (content, options) {
        /**
         * .loading
         * @param {string} content loading的文字
         * @param {object=} options 配置项
         * @param {string=} options.className 自定义类名
         *
         * @example
         * var .loading = weui..loading('.loading', {
         *     className: 'custom-classname'
         * });
         * setTimeout(function () {
         *     .loading.hide(function() {
         *          console.log('`.loading` has been hidden');
         *      });
         * }, 3000);
         */

        options = angular.extend({
            content:content||'加载中...',
            template: loading_tpl,
            className: (options&&options.className) || '',
            mask: false,
            controller: 'LoadingController',
        }, options);

        return $hcmuiDialog.showDialog(options,true);
    };

    return service;

}

hcmuiToast.$inject = ['$hcmuiDialog'];


export default angular
    .module('hcmui.toast', [
        moduleDialog.name,
        moduleUtil.name
    ])
    .controller('ToastController',toastController)
    .controller('LoadingController',loadingController)
    .factory('$hcmuiToast', hcmuiToast)
