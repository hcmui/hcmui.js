import angular from 'angular'
import hcmui from '../src/hcmui.js'

require('hcmui');

export default angular
    .module('hcmui.sample', [
        hcmui.name
    ])
    .controller('HcmuiController', ['$hcmuiNotify', '$hcmuiToast', '$hcmuiActionSheet', '$hcmuiTopTips','$scope', '$timeout', function ($hcmuiNotify, $hcmuiToast, $hcmuiActionSheet,$hcmuiTopTips, $scope, $timeout) {
        $scope.$ctrl = this;

        this.alert = function () {
            $hcmuiNotify.alert('你好，HCM Cloud！', {
                title: '提示'
            }).then(function () {
                console.log('OK Close')
            }, function () {
                console.log('Cancel Close')
            });
        };
        this.confirm = function () {
            $hcmuiNotify.confirm('你好，HCM Cloud！', {
                title: '提示',
                mask: true
            }).then(function () {
                console.log('OK Close')
            }, function () {
                console.log('Cancel Close')
            });
        };
        this.toast = function () {
            $hcmuiToast.toast();
        };
        this.loading = function () {
            let loading = $hcmuiToast.loading();

            $timeout(function () {
                loading.$dialogOk();
            }, 3000)
        };
        this.actionSheet = function () {
            $hcmuiActionSheet.actionSheet([
                {
                    label: '拍照',
                    onClick: function () {
                        console.log('拍照');
                    }
                }, {
                    label: '从相册选择',
                    onClick: function () {
                        console.log('从相册选择');
                    }
                }, {
                    label: '其他',
                    onClick: function () {
                        console.log('其他');
                    }
                }
            ], [
                {
                    label: '取消',
                    onClick: function () {
                        console.log('取消');
                    }
                }
            ], {
                className: 'custom-classname'
            })
        };
        this.topTips=function () {
            $hcmuiTopTips.topTips('请输入正确的字段');
        }
    }])
