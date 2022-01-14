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

import { Action } from '~/types/action';
import * as ROLE from '~/constant/role_access';
import { SUCCESS } from '~/constant/code';
import utils from '~/utils';

interface RequestBody {
    password: string;
}

const PcUserResetAction = <Action>{
    router: {
        path: '/user/reset',
        method: 'post',
        authRequired: true,
        roles: [ROLE.RLZY]
    },
    validator: {
        body: [
            {
                name: 'password',
                required: true,
                max: 32
            }
        ]
    },
    response: async ctx => {
        const { password } = <RequestBody>ctx.request.body;

        await ctx.model
            .from('ejyy_property_company_user')
            .where('id', ctx.pcUserInfo.id)
            .update('password', utils.crypto.md5(password));

        ctx.body = {
            code: SUCCESS,
            message: '重置登录密码成功'
        };
    }
};

export default PcUserResetAction;
