import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: function(res) {
        require(['@/views/login.vue'], res)
      },
    },
    {
    	path: '/register',
    	name: 'register',
    	component: function(res) {
        require(['@/views/register.vue'], res)
      },
    },
    {
      path: '/sellerRegister',
      name: 'sellerRegister',
      component: function(res) {
        require(['@/views/sellerRegister.vue'], res)
      },
    },
    {
      path: '/customer',
      name: 'customer-index',
      redirect: '/customer/shops',
      component: function(res) {
        require(['@/views/customer/index.vue'], res)
      },
      children: [
        {
          path: 'shops',
          name: 'customer-shops',
          component: function(res) {
            require(['@/views/customer/shops.vue'], res)
          }
        },
        {
          path: 'foods/:id',
          name: 'customer-foods',
          component: function(res) {
            require(['@/views/customer/foods.vue'], res)
          },
        },
        {
          path: 'myOrders',
          name: 'customer-myOrders',
          redirect: '/customer/myOrders/orders',
          component: function(res) {
            require(['@/views/customer/myOrders.vue'], res)
          },
          children: [
            {
              path: 'orders',
              name: 'customer-orders',
              component: function(res) {
                require(['@/views/customer/orders.vue'], res)
              }
            }
          ]
        },
      ]
    },
    {
      path: '/seller',
      name: 'seller-index',
      redirect: '/seller/foods',
      component: function(res) {
        require(['@/views/seller/index.vue'], res)
      },
      children: [
        {
          path: 'foods',
          name: 'seller-foods',
          component: function(res) {
            require(['@/views/seller/myFoods.vue'], res)
          }
        },
        {
          path: 'myOrders',
          name: 'seller-myOrders',
          redirect: '/seller/myOrders/orders',
          component: function(res) {
            require(['@/views/seller/myOrders.vue'], res)
          },
          children: [
            {
              path: 'orders',
              name: 'seller-orders',
              component: function(res) {
                require(['@/views/seller/orders.vue'], res)
              }
            },
            {
              path: 'ordering',
              name: 'seller-ordering',
              component: function(res) {
                require(['@/views/seller/ordering.vue'], res)
              }
            },
            {
              path: 'info',
              name: 'seller-info',
              component: function(res) {
                require(['@/views/seller/info.vue'], res)
              }
            },
          ]
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin-index',
      redirect: '/admin/admin',
      component: function(res) {
        require(['@/views/admin/index.vue'], res)
      },
      children: [
        {
          path: 'admin',
          name: 'admin-admin',
          component: function(res) {
            require(['@/views/admin/admin.vue'], res)
          }
        },
        {
          path: 'examine',
          name: 'admin-examine',
          component: function(res) {
            require(['@/views/admin/examine.vue'], res)
          }
        }
      ]
    }
  ]
})
