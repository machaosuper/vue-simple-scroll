<template>
    <div class="tab-refresh-infinite">
        <nav-bar title="tab refresh and infinite"></nav-bar>
        <ul class="tab flex">
            <li v-for="(tab, index) in tabList" :class="{'active': index === tabIndex}" @click="tabClick(index)">{{tab}}</li>
        </ul>
        <simple-scroll v-if="imgData[tabIndex] && imgData[tabIndex].imgList.length" :on-refresh="refresh" :on-infinite="infinite" :distance="0" :offset="94" ref="simpleScroll">
            <ul class="img-list">
                <li v-for="item in imgData[tabIndex].imgList">
                    <img :src="item.img" alt="">
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
                imgData: {},
                tabList: ['全部', '测试1', '测试2', '测试3'],
                tabIndex: 0
            };
        },
        created () {
            this.getData();
        },
        components: { NavBar },
        methods: {
            tabClick (index) {
                this.tabIndex = index;
                this.$refs.simpleScroll.scrollTop(0);
                if (this.imgData[this.tabIndex]) {
                    console.log(this.imgData);
                    this.$refs.simpleScroll.setInfiniteStatus(this.imgData[this.tabIndex].isLast);
                    return false;
                };
                this.getData(() => {
                    this.$nextTick(() => {
                        this.$refs.simpleScroll.resetInfinite();
                    })
                });
            },
            refresh (done) {
                console.log('refresh');
                this.getData(() => {
                    this.$refs.simpleScroll.resetInfinite();
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
                let pageNo = params.pageNo = isInfinite ? ++this.imgData[this.tabIndex].pageNo : 0;
                params.type = this.tabIndex;
                params = Qs.stringify(params);
                this.$http.post('/api/imgList', params).then((res) => {
                    if (res.status === 200) {
                        res = res.data;
                        console.log(res)
                        if (res.code === '000000') {
                            let isNoData = res.data.isLast;
                            res.data.pageNo = pageNo;
                            if (isInfinite) {
                                res.data.imgList = (this.imgData[this.tabIndex].imgList || []).concat(res.data.imgList);
                            }
                            this.$set(this.imgData, this.tabIndex, res.data);
                            console.log(this.imgData);
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
    .tab-refresh-infinite{
        height: 100vh;
        overflow: hidden;
        .tab{
            background: #fff;
            background-color: #fff;
            height: 50px;
            align-items: center;
            position: relative;
            z-index: 2;
            justify-content: space-around;
            border-bottom: 1px solid #ccc;
            li.active{
                color: red;
            }
        }
        ul.img-list li {
            height: 260px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
