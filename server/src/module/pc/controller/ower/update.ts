/**
 * +----------------------------------------------------------------------
 * | 「e家宜业」 —— 助力物业服务升级，用心服务万千业主
 * +----------------------------------------------------------------------
 * | Copyright (c) 2020~2021 https://www.chowa.com All rights reserved.
 * +----------------------------------------------------------------------
 * | Licensed 未经许可不能去掉「e家宜业」和「卓瓦科技」相关版权
 * +----------------------------------------------------------------------
 * | Author: jixuecong@chowa.cn
 * +----------------------------------------------------------------------
 */
 
import { Action } from '~/types/action';
import { SUCCESS, QUERY_ILLEFAL, OWER_FACE_IMG_FAILED } from '~/constant/code';
import { BINDING_BUILDING } from '~/constant/status';
import * as ROLE from '~/constant/role_access';
import * as faceService from '~/service/face';
import utils from '~/utils';

interface RequestBody {
    id: number;
    community_id: number;
    name: string;
    idcard: string;
    face_img: string;
}

const PcOwerUpdateAction = <Action>{
    router: {
        path: '/ower/update',
        method: 'post',
        authRequired: true,
        roles: [ROLE.YZDA],
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
                name: 'id',
                regex: /^\d+$/,
                required: true
            },
            {
                name: 'name',
                required: true,
                max: 8
            },
            {
                name: 'idcard',
                required: true,
                validator: val => utils.idcard.verify(val),
                message: '身份证号验证失败'
            },
            {
                name: 'face_img',
                required: true,
                validator: val => /^\/face\/[a-z0-9]{32}|default\.(jpg|jpeg|png)$/.test(val)
            }
        ]
    },
    response: async ctx => {
        const { community_id, id, name, idcard, face_img } = <RequestBody>ctx.request.body;

        const communityOwer = await ctx.model
            .from('ejyy_wechat_mp_user')
            .leftJoin('ejyy_user_building', 'ejyy_user_building.wechat_mp_user_id', 'ejyy_wechat_mp_user.id')
            .leftJoin('ejyy_building_info', 'ejyy_building_info.id', 'ejyy_user_building.building_id')
            .where('ejyy_wechat_mp_user.id', id)
            .andWhere('ejyy_building_info.community_id', community_id)
            .andWhere('ejyy_user_building.status', BINDING_BUILDING)
            .first();

        if (!communityOwer) {
            return (ctx.body = {
                code: QUERY_ILLEFAL,
                message: '非本小区业主，无发更新信息'
            });
        }

        const descriptor = await faceService.gerDescriptor(face_img);

        if (!descriptor) {
            return (ctx.body = {
                code: OWER_FACE_IMG_FAILED,
                message: '人脸相片采集失败'
            });
        }

        await ctx.model
            .from('ejyy_wechat_mp_user')
            .update({
                real_name: name,
                idcard,
                face_img,
                face_descriptor: JSON.stringify(descriptor)
            })
            .where('id', id);

        ctx.body = {
            code: SUCCESS
        };
    }
};

export default PcOwerUpdateAction;
