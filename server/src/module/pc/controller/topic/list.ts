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
import { TRUE, FALSE } from '~/constant/status';
import * as ROLE from '~/constant/role_access';

interface RequestBody {
    community_id: number;
    page_num: number;
    page_size: number;
    published: typeof TRUE | typeof FALSE;
}

const PcTopicListAction = <Action>{
    router: {
        path: '/topic/list',
        method: 'post',
        authRequired: true,
        verifyCommunity: true,
        roles: [ROLE.ZTGL]
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
            },
            {
                name: 'published',
                validator: val => [TRUE, FALSE].includes(val)
            }
        ]
    },
    response: async ctx => {
        const { community_id, page_num, page_size, published } = <RequestBody>ctx.request.body;
        const where = {};

        if (published !== undefined) {
            where['ejyy_topic.published'] = published;
        }

        const list = await ctx.model
            .from('ejyy_topic')
            .leftJoin('ejyy_property_company_user', 'ejyy_property_company_user.id', 'ejyy_topic.created_by')
            .where(where)
            .andWhere('ejyy_topic.community_id', community_id)
            .select(ctx.model.raw('SQL_CALC_FOUND_ROWS ejyy_topic.id'))
            .select(
                'ejyy_topic.id',
                'ejyy_topic.banner_img',
                'ejyy_topic.title',
                'ejyy_topic.published',
                'ejyy_topic.created_at',
                'ejyy_topic.created_by',
                'ejyy_property_company_user.real_name'
            )
            .limit(page_size)
            .offset((page_num - 1) * page_size)
            .orderBy('ejyy_topic.id', 'desc');

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

export default PcTopicListAction;
