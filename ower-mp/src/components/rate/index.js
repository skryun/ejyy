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

import { getAllRect } from '../common/utils';
import { CwComponent } from '../common/component';
import { canIUseModel } from '../common/version';
CwComponent({
    field: true,
    classes: ['icon-class'],
    props: {
        value: {
            type: Number,
            observer(value) {
                if (value !== this.data.innerValue) {
                    this.setData({ innerValue: value });
                }
            }
        },
        readonly: Boolean,
        disabled: Boolean,
        allowHalf: Boolean,
        size: null,
        icon: {
            type: String,
            value: 'star'
        },
        voidIcon: {
            type: String,
            value: 'star'
        },
        color: {
            type: String,
            value: '#ffd21e'
        },
        voidColor: {
            type: String,
            value: '#c7c7c7'
        },
        disabledColor: {
            type: String,
            value: '#bdbdbd'
        },
        count: {
            type: Number,
            value: 5,
            observer(value) {
                this.setData({ innerCountArray: Array.from({ length: value }) });
            }
        },
        gutter: null,
        touchable: {
            type: Boolean,
            value: true
        }
    },
    data: {
        innerValue: 0,
        innerCountArray: Array.from({ length: 5 })
    },
    methods: {
        onSelect(event) {
            const { data } = this;
            const { score } = event.currentTarget.dataset;
            if (!data.disabled && !data.readonly) {
                this.setData({ innerValue: score + 1 });
                if (canIUseModel()) {
                    this.setData({ value: score + 1 });
                }
                wx.nextTick(() => {
                    this.$emit('input', score + 1);
                    this.$emit('change', score + 1);
                });
            }
        },
        onTouchMove(event) {
            const { touchable } = this.data;
            if (!touchable) return;
            const { clientX } = event.touches[0];
            getAllRect(this, '.cw-rate__icon').then(list => {
                const target = list
                    .sort(item => item.right - item.left)
                    .find(item => clientX >= item.left && clientX <= item.right);
                if (target != null) {
                    this.onSelect(Object.assign(Object.assign({}, event), { currentTarget: target }));
                }
            });
        }
    }
});
