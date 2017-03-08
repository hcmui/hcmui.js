/**
 * Created by suitongjian on 2017/3/7.
 */

import angular from 'angular'
import moduleUtil from '../util/util'
import moduleDialog from '../dialog/dialog'

import notify_tpl from './notify_tpl.html'

function hcmuiNotify($hcmuiDialog) {
    let service = {};

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
            content: content||'',
            template: notify_tpl,
            className: (options&&options.className) || '',
            mask: true,
            buttons: [{
                label: '确定',
                class: 'primary',
                type: 'ok'
            }]
        }, options);
        return $hcmuiDialog.showDialog(options);
    };

    service.confirm = function (content, options) {
        /**
         * 确认弹窗
         * @param {string} content 弹窗内容
         * @param {object=} options 配置项
         * @param {string=} options.title 弹窗的标题
         * @param {string=} options.className 自定义类名
         * @param {array=} options.buttons 按钮配置项，详情参考dialog
         *
         * @example
         * weui..confirm('普通的confirm');
         * weui..confirm('自定义标题的confirm', { title: '自定义标题' });
         * weui..confirm('带回调的confirm', function(){ console.log('yes') }, function(){ console.log('no') });
         * var confirmDom = weui..confirm('手动关闭的confirm', function(){
         *     return false; // 不关闭弹窗，可用confirmDom.hide()来手动关闭
         * });
         * weui..confirm('带回调的自定义标题的confirm', function(){ console.log('yes') }, function(){ console.log('no') }, {
         *     title: '自定义标题'
         * });
         * weui..confirm('自定义按钮的confirm', {
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
            content: content||'',
            template: notify_tpl,
            className: (options&&options.className)||'',
            buttons: [{
                label: '取消',
                class: 'default',
                type: 'cancel'
            }, {
                label: '确定',
                class: 'primary',
                type: 'ok'
            }]
        }, options);
        return $hcmuiDialog.showDialog(options);

    };

    return service;

}

hcmuiNotify.$inject = ['$hcmuiDialog'];


export default angular
    .module('hcmui.notify', [
        moduleDialog.name,
        moduleUtil.name
    ])
    .factory('$hcmuiNotify', hcmuiNotify)
