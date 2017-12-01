<template>
    <div class="custom-spinner">
        <nav-bar title="Custom Spinner"></nav-bar>

        <simple-scroll v-if="imgList.length" :on-refresh="refresh" :on-infinite="infinite" :distance="0">
            <div class="spinner-refresh" slot="refresh-spinner"></div>
            <ul>
                <li v-for="item in imgList">
                    <img :src="item.img" alt="">
                </li>
            </ul>
            <svg class="spinner" style="stroke: #4b8bf4;" slot="infinite-spinner" viewBox="0 0 64 64">
            <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
        </simple-scroll>
    </div>
</template>

<script>
    import NavBar from './NavBar.vue';
    import Qs from 'qs';
    const PAGESIZE = 5;
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
                        console.log(res)
                        if (res.code === '000000') {
                            let isNoData = res.data.isLast;
                            if (isInfinite) {
                                this.imgList = this.imgList.concat(res.data.imgList);
                            } else {
                                this.imgList = res.data.imgList;
                            }
                            console.log(this.imgList);

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
    .custom-spinner{
        height: 100vh;
        overflow: hidden;
        ul li {
            img{
                width: 100%;
                height: 100%;
            }
        }
        .spinner-refresh{
            width: 45px;
            height: 45px;
            margin-right: 10px;
            background: url('../assets/refresh.png') 0 0 no-repeat;
            background-size: 3600%;
            animation: heart-burst steps(35) 0.8s infinite both;
        }
        @keyframes heart-burst {
            0% {
                background-position: 0%;
            }
            100% {
                background-position: 100%;
            }
        }
    }
</style>
