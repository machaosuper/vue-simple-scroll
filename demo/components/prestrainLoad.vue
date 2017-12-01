<template>
    <div class="custom-load-distance">
        <nav-bar title="Custom Load Distance"></nav-bar>
        <simple-scroll v-if="imgList.length" :on-refresh="refresh" :on-infinite="infinite" :distance="600">
            <ul>
                <li v-for="item in imgList">
                    <img :src="item.img">
                </li>
            </ul>
        </simple-scroll>
    </div>
</template>

<script>
    import NavBar from './NavBar.vue';
    import Qs from 'qs';
    const PAGESIZE = 10;
    export default {
        data () {
            return {
                list: 50,
                pageNo: 0,
                imgList: {}
            };
        },
        created () {
            this.getData();
        },
        components: { NavBar },
        methods: {
            refresh (done) {
                console.log('refresh');
                this.getData(() => {
                    this.pageNo = 0;
                    done();
                }, false, true);
                
            },
            infinite (done) {
                console.log('infinite');
                this.getData((isNoData) => {
                    done(isNoData);
                }, true);
            },
            getData (callback, isInfinite, isRefresh) {
                let params = {};
                params.pageSize = PAGESIZE;
                params.pageNo = isInfinite ? ++this.pageNo : 0;
                params = Qs.stringify(params);
                this.$http.post('/api/imgList', params).then((res) => {
                    if (res.status === 200) {
                        res = res.data;
                        if (res.code === '000000') {
                            let isNoData = res.data.isLast;

                            if (isInfinite) {
                                this.imgList = this.imgList.concat(res.data.imgList);
                            } else {
                                this.imgList = res.data.imgList;
                            }
                            callback && callback(isNoData);
                        }
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    };
</script>

<style lang="scss">
    .custom-load-distance{
        height: 100vh;
        overflow: hidden;
        ul li {
            height: 260px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
