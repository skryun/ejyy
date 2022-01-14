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

interface RequestBody {
    community_id: number;
}

const PcEnergyRepeaterOptionAction = <Action>{
    router: {
        path: '/energy/repeater_option',
        method: 'post',
        authRequired: true,
        roles: [ROLE.NHGL],
        verifyCommunity: true
    },
    validator: {
        body: [
            {
                name: 'community_id',
                regex: /^\d+$/,
                required: true
            }
        ]
    },
    response: async ctx => {
        const { community_id } = <RequestBody>ctx.request.body;

        const list = await ctx.model
            .from('ejyy_iot_meter_repeater')
            .where('community_id', community_id)
            .select(ctx.model.raw('SQL_CALC_FOUND_ROWS ejyy_iot_meter_repeater.id'))
            .select('id', 'name');

        ctx.body = {
            code: SUCCESS,
            data: {
                list
            }
        };
    }
};

export default PcEnergyRepeaterOptionAction;
