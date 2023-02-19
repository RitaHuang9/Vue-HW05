export default{
    props:['productId','temp','addCart','updateCarts'],
    data(){
        return{
            qty: 1,
        }
    },
    watch:{
        productId(){
            console.log('modalId:', this.productId);
        }
    },
    methods: {
        hide(){
            this.modal.hide();
        }
    },
    template:  `
    <div class="modal fade" id="userProductModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
<div class="modal-dialog modal-xl" role="document">
    <div class="modal-content border-0">
    <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="exampleModalLabel">
        <span>{{ temp.title }}</span>
    </h5>
        <button type="button" class="btn-close"
                data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <div class="row">
        <div class="col-sm-6">
            <img class="img-fluid" :src="temp.imageUrl"  alt="">
    </div>
        <div class="col-sm-6">
            <span class="badge bg-primary rounded-pill ms-0">{{ temp.category }}</span>
            <p>商品描述：{{ temp.description }}</p>
            <p>商品內容：{{  temp.content }}</p>
            <div class="h5">{{ temp.price }} 元</div>
            <del v-if="temp.price !== temp.origin_price" class="h6">原價 {{ temp.origin_price }} 元</del>
            
            <div>
            <div class="input-group">
            <select name="" id="" class="form-control" v-model="qty">
            <option :value="i" v-for=" i in 20" :key=" i + '12344'" >{{ i }}</option>
        </select>
                <button type="button" class="btn btn-primary" @click="addCart(temp.id, qty)">加入購物車</button>
    </div>
    </div>
    </div>
        <!-- col-sm-6 end -->
    </div>
    </div>
    </div>
    </div>
    </div>
    `,
}