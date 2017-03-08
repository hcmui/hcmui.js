import angular from 'angular'
import moduleUtil from '../util/util'
import moduleDialog from '../dialog/dialog'

import action_tpl from './actionSheet.html'


function actionSheetController($scope) {
    $scope.$btnClick = function (_menu, _event) {
        _menu.onClick && _menu.onClick(_event);
        $scope.$dialogOk(_event);
    }
}
actionSheetController.$inject = ['$scope'];


function hcmuiActionSheet($hcmuiDialog, $hcmuiUtil) {
    let service = {};

    service.actionSheet = function (menus = [], actions = [], options = {}) {
        /**
         * actionsheet 弹出式菜单
         * @param {array} menus 上层的选项
         * @param {string} menus[].label 选项的文字
         * @param {function} menus[].onClick 选项点击时的回调
         *
         * @param {array} actions 下层的选项
         * @param {string} actions[].label 选项的文字
         * @param {function} actions[].onClick 选项点击时的回调
         *
         * @param {object=} options 配置项
         * @param {string=} options.className 自定义类名
         *
         * @example
         * weui.actionSheet([
         *     {
         *         label: '拍照',
         *         onClick: function () {
         *             console.log('拍照');
         *         }
         *     }, {
         *         label: '从相册选择',
         *         onClick: function () {
         *             console.log('从相册选择');
         *         }
         *     }, {
         *         label: '其他',
         *         onClick: function () {
         *             console.log('其他');
         *         }
         *     }
         * ], [
         *     {
         *         label: '取消',
         *         onClick: function () {
         *             console.log('取消');
         *         }
         *     }
         * ], {
         *     className: 'custom-classname'
         * });
         */

        let isAndroid = $hcmuiUtil.isAndroid();

        options = angular.extend({
            menus: menus,
            actions: actions,
            template: action_tpl,
            className: (options && options.className) || '',
            mask: true,
            controller: 'ActionSheetController',
            animation_show: isAndroid ? 'weui-animate-fade-in' : 'weui-animate-slide-up',
            animation_hide: isAndroid ? 'weui-animate-fade-out' : 'weui-animate-slide-down'
        }, options);

        return $hcmuiDialog.showDialog(options);
    };

    return service;

}

hcmuiActionSheet.$inject = ['$hcmuiDialog', '$hcmuiUtil'];


export default angular
    .module('hcmui.action_sheet', [
        moduleDialog.name,
        moduleUtil.name
    ])
    .controller('ActionSheetController', actionSheetController)
    .factory('$hcmuiActionSheet', hcmuiActionSheet)
