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
    path: 'notice',
    meta: {
        title: '小区通知',
        authRequired: true,
        layout: 'sider',
        nav: true,
        icon: 'notication',
        roles: [ROLES.XQTZ]
    },
    component: () => import('./index'),
    children: [
        {
            path: '',
            meta: {
                title: '全部通知',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.XQTZ]
            },
            component: () => import('./list')
        },
        {
            path: 'create',
            meta: {
                title: '发布通知',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.XQTZ]
            },
            component: () => import('./create')
        },
        {
            path: 'preview/:id',
            meta: {
                title: '通知预览',
                authRequired: true,
                layout: 'sider',
                nav: false,
                roles: [ROLES.XQTZ]
            },
            component: () => import('./preview')
        },
        {
            path: 'update/:id',
            meta: {
                title: '修改通知',
                authRequired: true,
                layout: 'sider',
                nav: false,
                roles: [ROLES.XQTZ]
            },
            component: () => import('./update')
        }
    ]
};
