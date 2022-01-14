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
    page_num: number;
    page_size: number;
}

const PcMeetingMyAction = <Action>{
    router: {
        path: '/meeting/my',
        method: 'post',
        authRequired: true,
        roles: [ROLE.ANYONE],
        verifyCommunity: true
    },
    validator: {
        body: [
            {
                name: 'community_id',
                regex: /^\d+$/,
                required: true
            },
            {
                name: 'page_num',
                regex: /^\d+$/,
                required: true
            },
            {
                name: 'page_size',
                regex: /^\d+$/,
                required: true
            }
        ]
    },
    response: async ctx => {
        const { page_num, page_size, community_id } = <RequestBody>ctx.request.body;

        const list = await ctx.model
            .from('ejyy_meeting')
            .leftJoin('ejyy_property_company_user', 'ejyy_property_company_user.id', 'ejyy_meeting.created_by')
            .leftJoin('ejyy_meeting_room', 'ejyy_meeting_room.id', 'ejyy_meeting.meeting_room_id')
            .where('ejyy_meeting.community_id', community_id)
            .where('ejyy_meeting.created_by', ctx.pcUserInfo.id)
            .select(ctx.model.raw('SQL_CALC_FOUND_ROWS ejyy_meeting.id'))
            .select(
                'ejyy_meeting.id',
                'ejyy_meeting.theme',
                'ejyy_meeting.start_time',
                'ejyy_meeting.end_time',
                'ejyy_meeting.cancel',
                'ejyy_meeting.created_at',
                'ejyy_meeting.created_by',
                'ejyy_property_company_user.real_name',
                'ejyy_meeting_room.name',
                'ejyy_meeting_room.local'
            )
            .limit(page_size)
            .offset((page_num - 1) * page_size)
            .orderBy('ejyy_meeting.id', 'desc');

        const [res] = await ctx.model.select(ctx.model.raw('found_rows() AS total'));

        ctx.body = {
            code: SUCCESS,
            data: {
                list,
                total: res.total,
                page_amount: Math.ceil(res.total / page_size),
                page_num,
                page_size
            }
        };
    }
};

export default PcMeetingMyAction;
