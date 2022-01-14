/**
 * +----------------------------------------------------------------------
 * | 「e家宜业」 —— 助力物业服务升级，用心服务万千业主
 * +----------------------------------------------------------------------
 * | Copyright (c) 2020~2022 https://www.chowa.cn All rights reserved.
 * +----------------------------------------------------------------------
 * | Licensed 未经许可不能去掉「e家宜业」和「卓瓦科技」相关版权
 * +----------------------------------------------------------------------
 * | Author: jixuecong@chowa.cn
 * +----------------------------------------------------------------------
 */

import { CwComponent } from '../common/component';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
import { GRAY, RED } from '../common/color';
import { toPromise } from '../common/utils';
CwComponent({
    mixins: [button, openType],
    props: {
        show: {
            type: Boolean,
            observer(show) {
                !show && this.stopLoading();
            }
        },
        title: String,
        message: String,
        theme: {
            type: String,
            value: 'default'
        },
        useSlot: Boolean,
        className: String,
        customStyle: String,
        asyncClose: Boolean,
        messageAlign: String,
        beforeClose: null,
        overlayStyle: String,
        useTitleSlot: Boolean,
        showCancelButton: Boolean,
        closeOnClickOverlay: Boolean,
        confirmButtonOpenType: String,
        width: null,
        zIndex: {
            type: Number,
            value: 2000
        },
        confirmButtonText: {
            type: String,
            value: '确认'
        },
        cancelButtonText: {
            type: String,
            value: '取消'
        },
        confirmButtonColor: {
            type: String,
            value: RED
        },
        cancelButtonColor: {
            type: String,
            value: GRAY
        },
        showConfirmButton: {
            type: Boolean,
            value: true
        },
        overlay: {
            type: Boolean,
            value: true
        },
        transition: {
            type: String,
            value: 'scale'
        }
    },
    data: {
        loading: {
            confirm: false,
            cancel: false
        },
        callback: () => {}
    },
    methods: {
        onConfirm() {
            this.handleAction('confirm');
        },
        onCancel() {
            this.handleAction('cancel');
        },
        onClickOverlay() {
            this.close('overlay');
        },
        close(action) {
            this.setData({ show: false });
            wx.nextTick(() => {
                this.$emit('close', action);
                const { callback } = this.data;
                if (callback) {
                    callback(action, this);
                }
            });
        },
        stopLoading() {
            this.setData({
                loading: {
                    confirm: false,
                    cancel: false
                }
            });
        },
        handleAction(action) {
            this.$emit(action, { dialog: this });
            const { asyncClose, beforeClose } = this.data;
            if (!asyncClose && !beforeClose) {
                this.close(action);
                return;
            }
            this.setData({
                [`loading.${action}`]: true
            });
            if (beforeClose) {
                toPromise(beforeClose(action)).then(value => {
                    if (value) {
                        this.close(action);
                    } else {
                        this.stopLoading();
                    }
                });
            }
        }
    }
});
