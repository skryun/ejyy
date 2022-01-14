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

import { CwPage } from '../common/page';
import $dialog from '../../components/dialog/dialog';
import $toast from '../../components/toast/toast';
import $notify from '../../components/notify/notify';
import utils from '../../utils/index';

CwPage({
    data: {
        // form data start
        subject: '',
        content: '',
        // form data end
        submiting: false
    },
    validator: {
        formFields: ['subject', 'content'],
        formRule: {
            subject: [
                { required: true, message: '请输入功能主旨' },
                { max: 20, message: '功能主旨不能超过20个字' },
                { min: 2, message: '功能主旨应大于2个字' }
            ],
            content: [
                { required: true, message: '请输入功能描述' },
                { max: 200, message: '功能描述不能超过200个字' },
                { min: 5, message: '功能描述应大于5个字' }
            ]
        }
    },
    save() {
        this.validate(() => {
            $toast.loading({
                duration: 0,
                forbidClick: true,
                message: '提交中…'
            });

            this.setData({
                submiting: true
            });

            const { subject, content } = this.data;

            utils
                .request({
                    url: '/feedback/feature',
                    method: 'post',
                    data: {
                        subject,
                        content
                    }
                })
                .then(
                    res => {
                        this.setData({
                            submiting: false
                        });
                        $toast.clear();

                        $dialog
                            .alert({
                                forbidClick: true,
                                title: '提交成功',
                                message: '感谢您对「e家宜业」的支持'
                            })
                            .then(() => {
                                wx.navigateBack({ delta: 1 });
                            });
                    },
                    res => {
                        this.setData({
                            submiting: false
                        });
                        $toast.clear();
                        $notify({
                            type: 'danger',
                            message: res.message
                        });
                    }
                );
        });
    }
});
