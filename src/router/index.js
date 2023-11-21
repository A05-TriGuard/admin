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
                {
                    path: '',
                    name: 'IndexPage',
                    component: () => import('@/views/index/IndexPage.vue')
                }
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
