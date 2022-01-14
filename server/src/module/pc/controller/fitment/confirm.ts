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
import { SUCCESS, DATA_MODEL_UPDATE_FAIL } from '~/constant/code';
import * as ROLE from '~/constant/role_access';
import { USER_FINISH_FITMENT_STEP, PROPERTY_COMPANY_CONFIRM_STEP } from '~/constant/fitment';

interface RequestBody {
    id: number;
    community_id: number;
}

const PcFitmentConfirmAction = <Action>{
    router: {
        path: '/fitment/confirm',
        method: 'post',
        authRequired: true,
        roles: [ROLE.ZXDJ],
        verifyCommunity: true
    },
    validator: {
        body: [
            {
                name: 'id',
                required: true,
                regex: /^\d+$/
            },
            {
                name: 'community_id',
                regex: /^\d+$/,
                required: true
            }
        ]
    },
    response: async ctx => {
        const { id, community_id } = <RequestBody>ctx.request.body;
        const confirmed_at = Date.now();

        const affect = await ctx.model
            .from('ejyy_fitment')
            .update({
                step: PROPERTY_COMPANY_CONFIRM_STEP,
                confirm_user_id: ctx.pcUserInfo.id,
                confirmed_at
            })
            .where('community_id', community_id)
            .andWhere('step', USER_FINISH_FITMENT_STEP)
            .andWhere('id', id);

        if (affect !== 1) {
            return (ctx.body = {
                code: DATA_MODEL_UPDATE_FAIL,
                message: '装修确认完工失败'
            });
        }

        ctx.body = {
            code: SUCCESS,
            message: '装修确认完工成功',
            data: {
                confirmed_at,
                confirmUserInfo: {
                    id: ctx.pcUserInfo.id,
                    real_name: ctx.pcUserInfo.real_name
                }
            }
        };
    }
};

export default PcFitmentConfirmAction;
