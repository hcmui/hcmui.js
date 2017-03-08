/**
 * Created by suitongjian on 2017/3/7.
 */

import angular from 'angular'
import moduleUtil from '../util/util'


function hcmuiDialogDefaultController($scope) {
}
hcmuiDialogDefaultController.$inject = ['$scope'];


function hcmuiDialog($hcmuiUtil, $compile, $controller, $rootScope, $q) {
    let service = {};

    service.showDialog = function (options, is_instance) {
        /**
         * className:
         * template:模板
         * controller:
         * mask:
         */

        options = angular.extend({
            className: '',
            mask: true,
            template: '<div></div>',
            controller: 'HcmuiDialogDefaultController',
            animation_show:'weui-animate-fade-in',
            animation_hide:'weui-animate-fade-out'
        }, options);

        let _defer = $q.defer();

        let _mask = angular.element('<div class=""></div>');
        if (options.mask) {
            _mask.addClass('weui-mask')
        } else {
            _mask.addClass('weui-mask_transparent')
        }

        let _dialog = angular
            .element(options.template);

        if ($hcmuiUtil.isAndroid()) {
            _dialog.addClass('weui-skin_android');
        }

        let _wrapper = angular.element(`<div class='${options.className}'></div>`);

        _wrapper
            .append(_mask);
        _wrapper
            .append(_dialog);


        let _dialog_close = function () {
            if (options.mask) {
                _mask.addClass('weui-animate-fade-out').on('animationend webkitAnimationEnd', function () {
                    _mask.remove();
                });
            }
            _dialog
                .addClass(options.animation_hide)
                .on('animationend webkitAnimationEnd', function () {
                    _wrapper.remove();
                });
        };


        let _scope = $rootScope.$new();

        _scope.$options = options;

        _scope.$dialogOk = function (data) {
            _defer.resolve(data);
            _dialog_close();
        };

        _scope.$dialogCancel = function (data) {
            _defer.reject(data);
            _dialog_close();
        };
        _scope.$btnClick = function (_btn, _event) {
            if (_btn.onClick) {
                _btn.onClick(_event);
            } else {
                if (_btn.type === 'cancel') {
                    _scope.$dialogCancel(_event);
                } else {
                    _scope.$dialogOk(_event);
                }
            }
        };
        _dialog = $compile(_dialog)(_scope);

        let invokeCtrl = $controller(options.controller, {$scope: _scope}, true);

        let ctrl = invokeCtrl();


        _dialog.data('$ngControllerController', ctrl);

        let _parent = angular.element(document.getElementsByTagName('body'));
        _mask.addClass('weui-animate-fade-in');
        _dialog.addClass(options.animation_show);
        _parent.append(_wrapper);

        if (is_instance) {
            return _scope
        } else {
            return _defer.promise;
        }
    };


    return service;

}

hcmuiDialog.$inject = ['$hcmuiUtil', '$compile', '$controller', '$rootScope', '$q'];


export default angular
    .module('hcmui.dialog', [
        moduleUtil.name
    ])
    .controller('HcmuiDialogDefaultController', hcmuiDialogDefaultController)
    .factory('$hcmuiDialog', hcmuiDialog)
