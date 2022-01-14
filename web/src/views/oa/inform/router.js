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
    path: 'inform',
    meta: {
        title: '行政通知',
        authRequired: true,
        layout: 'sider',
        nav: true,
        icon: 'inform',
        roles: [ROLES.ANYONE]
    },
    component: () => import('./index'),
    children: [
        {
            path: '',
            meta: {
                title: '全部文章',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.ANYONE]
            },
            component: () => import('./main')
        },
        {
            path: 'detail/:id',
            meta: {
                title: '文章详情',
                authRequired: true,
                layout: 'sider',
                nav: false,
                roles: [ROLES.ANYONE]
            },
            component: () => import('./detail')
        },
        {
            path: 'create',
            meta: {
                title: '发布文章',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.XZTZ]
            },
            component: () => import('./create')
        },
        {
            path: 'update/:id',
            meta: {
                title: '修改文章',
                authRequired: true,
                layout: 'sider',
                nav: false,
                roles: [ROLES.XZTZ]
            },
            component: () => import('./update')
        },
        {
            path: 'manage',
            meta: {
                title: '文章管理',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.XZTZ]
            },
            component: () => import('./manage')
        }
    ]
};
