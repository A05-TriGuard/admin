import { createRouter, createWebHistory } from 'vue-router'
import { unauthorized } from "@/net/auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/welcome',
            name: 'Welcome',
            component: () => import('@/views/WelcomeView.vue'),
            children: [
                {
                    path: '',
                    name: 'Login',
                    component: () => import('@/views/welcome/LoginPage.vue')
                }
            ]
        },
        {
            path: '/',
            name: 'Index',
            component: () => import('@/views/IndexView.vue'),
            meta: { isAuthRequired: true },
            children: [
                {   path: '/', 
                    redirect: '/AdministratorList' ,
                    component: () => import('@/views/index/AdministratorList.vue'),
                },
                {
                    path: '/userList',
                    name: 'UserList',
                    component: () => import('@/views/index/UserList.vue')
                },
                {
                    path: '/administratorList',
                    name: 'AdministratorList',
                    component: () => import('@/views/index/AdministratorList.vue')
                },
                {
                    path: '/articleList',
                    name: 'ArticleList',
                    component: () => import('@/views/index/ArticleList.vue')
                },
                {
                    path: '/Edit',
                    name: 'Edit',
                    component: () => import('@/views/index/Edit.vue')
                },
                {
                    path: '/MessageList',
                    name: 'MessageList',
                    component: () => import('@/views/index/MessageList.vue')
                },
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    const { isAuthRequired } = to.meta
    const isUnauthorized = unauthorized()
    if (isAuthRequired && isUnauthorized) {
        next('/welcome')
    } else {
        next()
    }
})

export default router
