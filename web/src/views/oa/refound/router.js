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

const ROLES = require('@/constants/role');

module.exports = {
    path: 'refound',
    meta: {
        title: '财务报销',
        authRequired: true,
        layout: 'sider',
        nav: true,
        icon: 'refound',
        roles: [ROLES.ANYONE]
    },
    component: () => import('./index'),
    children: [
        {
            path: '',
            meta: {
                title: '报销申请',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.ANYONE]
            },
            component: () => import('./apply')
        },
        {
            path: 'flow',
            meta: {
                title: '审批流程',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.ANYONE]
            },
            component: () => import('./flow')
        },
        {
            path: 'detail/:id',
            meta: {
                title: '报销详细',
                authRequired: true,
                layout: 'sider',
                nav: false,
                roles: [ROLES.ANYONE]
            },
            component: () => import('./detail')
        }
    ]
};
