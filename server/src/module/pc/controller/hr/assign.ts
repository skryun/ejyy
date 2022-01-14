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
import * as ROLE from '~/constant/role_access';

const PcHrAssignAction = <Action>{
    router: {
        path: '/hr/assign',
        method: 'get',
        authRequired: true,
        roles: [ROLE.RLZY]
    },
    response: async ctx => {
        const access = await ctx.model
            .from('ejyy_property_company_access')
            .select('id', 'name', 'content')
            .orderBy('id', 'desc');

        const department = await ctx.model
            .from('ejyy_property_company_department')
            .select('id', 'name')
            .orderBy('id', 'desc');

        const job = await ctx.model
            .from('ejyy_property_company_job')
            .select('id', 'name', 'parent_id')
            .orderBy('id', 'desc');

        ctx.body = {
            code: SUCCESS,
            data: {
                access,
                department,
                job
            }
        };
    }
};

export default PcHrAssignAction;
