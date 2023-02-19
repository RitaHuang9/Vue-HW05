import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

import userProductModals from './components/userProductModal.js';

let userProductModal = {};
createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2/',
            api_path: 'rita009',
            products: [],
            productId: '',
            temp: {},
            cart: {},
            loadingItem:{},
        }
    },
    methods: {
        // 取得資料
        getData() {
            axios.get(`${this.url}api/${this.api_path}/products/all`)
                .then((res) => {
                    this.products = res.data.products;
                    console.log('產品列表：', this.products);
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        //取得單一產品資料
        openModal(id) {
            this.productId = id;
            console.log('單一產品資料id', id);
            axios.get(`${this.url}api/${this.api_path}/product/${id}`)
                .then((res) => {
                    // console.log(res);
                    this.temp = res.data.product;
                    console.log('單一產品資料', this.tempProduct);
                    userProductModal.show();
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        },
        //加入購物車
        addCart(product_id, qty = 1) {

            const data = {
                product_id,
                qty
            }
            axios.post(`${this.url}api/${this.api_path}/cart`, { data })
                .then((res) => {
                    console.log(res);
                    userProductModal.hide();
                    this.getCarts();
                })
                .catch((err) => {
                    alert(err.data.message);
                })

            console.log('購物車清單', this.carts);
        },
        //取得購物車
        getCarts() {

            axios.get(`${this.url}api/${this.api_path}/cart`)
                .then((res) => {
                    this.cart = res.data.data
                    console.log('購物車清單', this.cart);
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        },
        // 更新購物車
        updateCarts(item) {
            const data = {
                product_id: item.product.id,
                qty: item.qty
            }
            this.loadingItem = item.id;
            axios.put(`${this.url}api/${this.api_path}/cart/${item.id}`, { data })
                .then((res) => {
                    this.getCarts();
                    this.loadingItem = '';
                    console.log('update購物車', res);
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        },
        // 刪除購物車
        deleteCarts(id) {
            this.loadingItem = id;
            axios.delete(`${this.url}api/${this.api_path}/cart/${id}`)
                .then((res) => {
                    // this.cart = res.data.data
                    this.getCarts();
                    this.loadingItem = '';
                    console.log('delete單一購物車', res);
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        },
        // 清空全部購物車
        deleteAllCarts() {
            
            axios.delete(`${this.url}api/${this.api_path}/carts`)
                .then((res) => {
                    // this.cart = res.data.data
                    this.getCarts();
                    console.log('delete全部購物車', res);
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        },
    },
    components: {
        userProductModals,
    },
    // 生命週期：頁面初始化
    mounted() {
        this.getData();
        userProductModal = new bootstrap.Modal('#userProductModal');
        this.getCarts();
    }
}).mount('#app');