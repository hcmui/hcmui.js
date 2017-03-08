/**
 * Created by suitongjian on 2017/3/7.
 */

import angular from 'angular'
import moduleUtil from '../util/util'
import moduleDialog from '../dialog/dialog'
import top_tips_tpl from './topTips.html'


function topTipsController($scope, $timeout) {
    if ($scope.$options.duration != 0) {
        $timeout(function () {
            $scope.$dialogOk();
        }, $scope.$options.duration)
    }
}
topTipsController.$inject = ['$scope', '$timeout'];


function hcmuiTopTips($hcmuiDialog) {
    let service = {};

    service.topTips = function (content, options) {
        /**
         * toptips 顶部报错提示
         * @param {string} content 报错的文字
         * @param {number|function|object=} options 多少毫秒后消失|消失后的回调|配置项
         * @param {number=} [options.duration=3000] 多少毫秒后消失
         * @param {string=} options.className 自定义类名
         * @param {function=} options.callback 消失后的回调
         *
         * @example
         * weui.topTips('请填写正确的字段');
         * weui.topTips('请填写正确的字段', 3000);
         * weui.topTips('请填写正确的字段', function(){ console.log('close') });
         * weui.topTips('请填写正确的字段', {
         *     duration: 3000,
         *     className: 'custom-classname',
         *     callback: function(){ console.log('close') }
         * });
         *
         * // 主动关闭
         * var $topTips = weui.topTips('请填写正确的字段');
         * $topTips.hide(function() {
         *      console.log('`topTips` has been hidden');
         * });
         */
        options = angular.extend({
            title: null,
            content: content || '',
            duration: 3000,
            template: top_tips_tpl,
            controller:'TopTipsController',
            className: (options && options.className) || '',
            mask: false
        }, options);
        return $hcmuiDialog.showDialog(options);
    };

    return service;

}

hcmuiTopTips.$inject = ['$hcmuiDialog'];


export default angular
    .module('hcmui.tooltips', [
        moduleDialog.name,
        moduleUtil.name
    ])
    .controller('TopTipsController', topTipsController)
    .factory('$hcmuiTopTips', hcmuiTopTips)
