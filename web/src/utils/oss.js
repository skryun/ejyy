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

import request from './request';

let accessid = '';
let signature = '';
let policy = '';
let expire = 0;
let host = '';
let saveName = '';
let now = Date.now();

function ossRes() {
    return {
        host,
        key: saveName,
        policy,
        OSSAccessKeyId: accessid,
        success_action_status: '200',
        signature
    };
}

export default filename => {
    now = Date.now();
    saveName = filename;

    if (expire < now + 10000) {
        return request.get('/upload/sign').then(res => {
            policy = res.data['policy'];
            accessid = res.data['accessid'];
            signature = res.data['signature'];
            expire = parseInt(res.data['expire']);
            host = res.data['host'];

            return ossRes();
        });
    } else {
        return Promise.resolve(ossRes());
    }
};
