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
import { SUCCESS } from '~/constant/code';
import * as uuid from 'uuid';
import config from '~/config';

const PcInitStateAction = <Action>{
    router: {
        path: '/init/state',
        method: 'get',
        authRequired: false
    },

    response: async ctx => {
        ctx.session.initState = uuid.v4();

        ctx.body = {
            code: SUCCESS,
            data: {
                state: ctx.session.initState,
                expire: config.session.maxAge
            }
        };
    }
};

export default PcInitStateAction;
