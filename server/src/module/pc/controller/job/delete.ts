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
import { SUCCESS, DATA_MODEL_REMOVE_FAIL } from '~/constant/code';

interface RequestParams {
    id: number;
}

const PcJobDeleteAction = <Action>{
    router: {
        path: '/job/delete/:id',
        method: 'get',
        authRequired: true,
        roles: []
    },
    validator: {
        params: [
            {
                name: 'id',
                required: true,
                regex: /^\d+$/
            }
        ]
    },
    response: async ctx => {
        const { id } = <RequestParams>ctx.params;

        const used = await ctx.model
            .from('ejyy_property_company_user')
            .where('job_id', id)
            .first();

        if (used) {
            return (ctx.body = {
                code: DATA_MODEL_REMOVE_FAIL,
                message: '部门信息使用中，无法删除'
            });
        }

        await ctx.model
            .from('ejyy_property_company_job')
            .where('id', id)
            .delete();

        ctx.body = {
            code: SUCCESS,
            message: '删除部门信息成功'
        };
    }
};

export default PcJobDeleteAction;
