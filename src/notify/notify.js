/**
 * Created by suitongjian on 2017/3/7.
 */

import angular from 'angular'
import moduleUtil from '../util/util'

import notify_tpl from './notify_tpl.html'


function hcmuiDialogDefaultController($scope) {
    $scope.$ctrl = this;
}
hcmuiDialogDefaultController.$inject = ['$scope'];


function hcmuiNotify($hcmuiUtil, $compile, $controller, $rootScope, $q) {
    let service = {};

    function showDialog(options) {
        /**
         * className:
         * template:模板
         * controller:
         * mask:
         */

        options = angular.extend({
            className: '',
            mask: true,
            template: '',
            controller: 'HcmuiDialogDefaultController'
        }, options);

        let _defer = $q.defer();

        let _mask = angular.element('<div class="weui-mask"></div>');


        let _dialog = angular
            .element('<div class="weui-dialog"></div>')
            .append(options.template);

        if($hcmuiUtil.isAndroid()){
            _dialog.addClass('weui-skin_android');
        }

        let _wrapper = angular.element(`<div class='${options.className}'></div>`);
        options.mask && _wrapper.append(_mask);
        _wrapper
            .append(_dialog);


        let _scope = $rootScope.$new();
        _dialog = $compile(_dialog)(_scope);


        let invokeCtrl = $controller(options.controller, {$scope: _scope}, true);
        let ctrl = invokeCtrl();

        let _dialog_close = function () {
            if (options.mask) {
                _mask.addClass('weui-animate-fade-out').on('animationend webkitAnimationEnd', function () {
                    _mask.remove();
                });
            }
            _dialog
                .addClass('weui-animate-fade-out')
                .on('animationend webkitAnimationEnd', function () {
                    _wrapper.remove();
                });
        };

        ctrl.$dialogOk = function (data) {
            _defer.resolve(data);
            _dialog_close();
        };

        ctrl.$dialogCancel = function (data) {
            _defer.reject(data);
            _dialog_close();
        };
        ctrl.$btnClick = function (_btn, _event) {
            if (_btn.onClick) {
                _btn.onClick(_event);
            } else {
                if (_btn.type === 'cancel') {
                    ctrl.$dialogCancel(_event);
                } else {
                    ctrl.$dialogOk(_event);
                }
            }
        };

        _dialog.data('$ngControllerController', ctrl);

        let _parent = angular.element(document.getElementsByTagName('body'));
        _mask.addClass('weui-animate-fade-in');
        _dialog.addClass('weui-animate-fade-in');
        _parent.append(_wrapper);
        return _defer.promise;
    }

    service.alert = function (content, options) {
        /**
         * alert 警告弹框，功能类似于浏览器自带的 alert 弹框，用于提醒、警告用户简单扼要的信息，只有一个“确认”按钮，点击“确认”按钮后关闭弹框。
         * @param {string} content 弹窗内容
         * @param {object=} options 配置项
         * @param {string=} options.title 弹窗的标题
         * @param {string=} options.className 自定义类名
         * @param {array=} options.buttons 按钮配置项，详情参考dialog
         * @return {promise}
         *
         * @example
         * $hcmuiNotify.alert('普通的alert');
         * $hcmuiNotify.alert('自定义标题的alert', { title: '自定义标题' });
         * $hcmuiNotify.alert('自定义按钮的alert', {
         *     title: '自定义按钮的alert',
         *     buttons: [{
         *         label: 'OK',
         *         type: 'primary',
         *         onClick: function(){ console.log('ok') }
         *     }]
         * });
         */
        options = angular.extend({
            title: null,
            content: '',
            className: '',
            buttons: [{
                label: '确定',
                class: 'primary',
                type: 'ok'
            }]
        }, options);
        return showDialog({
            template: notify_tpl,
            className: options.className || '',
            mask: true,
            controller: ['$scope', function ($scope) {
                $scope.$ctrl = this;
                this.content = content;
                this.options = angular.extend({}, options);
            }]
        });
    };

    service.confirm=function(content,options){
        /**
         * 确认弹窗
         * @param {string} content 弹窗内容
         * @param {object=} options 配置项
         * @param {string=} options.title 弹窗的标题
         * @param {string=} options.className 自定义类名
         * @param {array=} options.buttons 按钮配置项，详情参考dialog
         *
         * @example
         * weui.confirm('普通的confirm');
         * weui.confirm('自定义标题的confirm', { title: '自定义标题' });
         * weui.confirm('带回调的confirm', function(){ console.log('yes') }, function(){ console.log('no') });
         * var confirmDom = weui.confirm('手动关闭的confirm', function(){
         *     return false; // 不关闭弹窗，可用confirmDom.hide()来手动关闭
         * });
         * weui.confirm('带回调的自定义标题的confirm', function(){ console.log('yes') }, function(){ console.log('no') }, {
         *     title: '自定义标题'
         * });
         * weui.confirm('自定义按钮的confirm', {
         *     title: '自定义按钮的confirm',
         *     buttons: [{
         *         label: 'NO',
         *         type: 'default',
         *         onClick: function(){ console.log('no') }
         *     }, {
         *         label: 'YES',
         *         type: 'primary',
         *         onClick: function(){ console.log('yes') }
         *     }]
         * });
         */
        options = angular.extend({
            title: null,
            content: '',
            className: '',
            buttons: [{
                label: '取消',
                class: 'default',
                type: 'cancel'
            },{
                label: '确定',
                class: 'primary',
                type: 'ok'
            }]
        }, options);
        return showDialog({
            template: notify_tpl,
            className: options.className || '',
            mask: true,
            controller: ['$scope', function ($scope) {
                $scope.$ctrl = this;
                this.content = content;
                this.options = angular.extend({}, options);
            }]
        });

    };

    return service;

}

hcmuiNotify.$inject = ['$hcmuiUtil', '$compile', '$controller', '$rootScope', '$q'];


export default angular
    .module('hcmui.notify', [
        moduleUtil.name
    ])
    .controller('HcmuiDialogDefaultController', hcmuiDialogDefaultController)
    .factory('$hcmuiNotify', hcmuiNotify)
