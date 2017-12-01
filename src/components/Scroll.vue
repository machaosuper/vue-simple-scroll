<template>
    <div class="scroll-wrapper" ref="scrollWrapper" 
    @touchstart="start" 
    @mousedown="start" 
    @touchmove="move" 
    @mousemove="move" 
    @touchend="end" 
    @mouseup="end" 
    @touchcancel="end" 
    :style="[{top: '-' + loadingHeight + 'px',height: 'calc(100% + ' + loadingHeight + 'px - ' + offset + 'px)'}, {
        transform: 'translate3d(0, ' + top + 'px, 0)',
        webkitTransform: 'translate3d(0, ' + top + 'px, 0)'
      }]" :class="{'touching': touching}" 
    @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined"
    >
        <div ref="loadingIcon" class="loading-icon flex" v-if="onRefresh">
            <slot name="refresh-spinner">
                <spinner-refresh :style="{fill: refreshLayerColor, stroke: refreshLayerColor}"></spinner-refresh>
            </slot>
            <span v-if="isRefreshText" :style="{color: refreshLayerColor}">{{statusText}}</span>
        </div>
        <div class="content-wrapper" ref="content">
            <slot></slot>
            <div class="more-data flex" v-if="onInfinite">
                <slot name="infinite-spinner" v-if="!isNoData">
                      <spinner-infinite :style="{fill: loadingLayerColor, stroke: loadingLayerColor}"></spinner-infinite>
                </slot>
                <span :style="{color: loadingLayerColor}">{{isNoData ? noDataText : infiniteLoadingText}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import SpinnerRefresh from './SpinnerRefresh.vue'
    import SpinnerInfinite from './SpinnerInfinite.vue'
    export default {
        name: 'l-scroll',
        components: { SpinnerRefresh, SpinnerInfinite },
        props: {
            onRefresh: Function,
            onInfinite: Function,
            distance: {
                type: Number,
                default: 0
            },
            isRefreshText: {
                type: Boolean,
                default: true
            },
            noDataText: {
                type: String,
                default: '我是有底线的~~'
            },
            infiniteLoadingText: {
                type: String,
                default: '加载中'
            },
            offset: {
                type: Number,
                default: 0
            },
            refreshLayerColor: {
                type: String,
                default: '#ff6863'
            },
            loadingLayerColor: {
                type: String,
                default: '#ff6863'
            }

        },
        data () {
            return {
                loadingHeight: 0,
                contnetHeight: 0,
                scrollHeight: 0,
                status: 0,
                top: 0,
                pageX: 0,
                pageY: 0,
                isNoData: false,
                infiniteLoading: false,
                touching: true
            };
        },
        watch: {
        },
        created () {
        },
        mounted () {
            this.$nextTick(() => {
                this.init();
            });
        },
        filters: {
        },
        computed: {
            statusText () {
                let text = '';
                switch (this.status) {
                    case 0:
                        text = '下拉刷新';
                        break;
                    case 1:
                        text = '松开刷新';
                        break;
                    case 2:
                        text = '加载中...';
                        break;
                    case 3:
                        text = '刷新成功';
                        break;
                }
                return text;
            }
        },
        methods: {
            init () {
                this.target = this.$el;
                this.loadingHeight = this.onRefresh ? this.$refs.loadingIcon.clientHeight : 0;
                this._calculateHeight();
            },
            _calculateHeight () {
                this.$nextTick(() => {
                    this.contentHeight = this.$refs.content.clientHeight;
                    this.scrollHeight = this.contentHeight - this.target.clientHeight - this.loadingHeight;
                    // console.log('contentHeight:' + this.contentHeight + ' el:' + this.target.clientHeight + ' loadingHeight:' + this.loadingHeight);
                });
            },
            start (e) {
                if (this.target.scrollTop > 0 || !this.onRefresh) {
                    return false;
                }
                this.touching = true;
                const touch = e.touches ? e.touches[0] : e;
                this.pageX = touch.pageX;
                this.pageY = touch.pageY;
            },
            move (e) {
                if ((this.target.scrollTop > 0 || !this.touching) || !this.onRefresh) {
                    return false;
                }
                const touch = e.touches ? e.touches[0] : e;
                let distX = touch.pageX - this.pageX;
                let distY = touch.pageY - this.pageY;
                if (distY > 0) e.preventDefault();
                this.top = Math.pow(distY, 0.9) + (this.status === 2 ? this.loadingHeight : 0)
                if (this.status === 2 || this.status === 3) return;
                if (this.top >= this.loadingHeight) {
                    this.status = 1;
                } else {
                    this.status = 0;
                }
            },
            end (e) {
                this.touching = false;
                if (this.target.scrollTop > 0 || !this.onRefresh) {
                    return false;
                }
                if (this.status === 2 || this.status === 3) {
                    this.top = this.loadingHeight
                    return
                }
                if (this.status === 1) {
                    this.refresh()
                } else {
                    this.status = 0
                    this.top = 0
                }
            },
            refresh () {
                this.status = 2
                this.top = this.loadingHeight
                this.onRefresh(this.refreshDone)
            },
            refreshDone () {
                this.status = 3;
                setTimeout(() => {
                    this.status = 0;
                    this.top = 0;
                    this.resetInfinite();
                }, 1000);  
            },
            infinite () {
                this.infiniteLoading = true
                this.onInfinite(this.infiniteDone)
            },
            infiniteDone (isNoData) {
                this.infiniteLoading = false;
                this._calculateHeight();
                if (isNoData) {
                    this.isNoData = isNoData
                }
            },
            resetInfinite () {
                this.infiniteLoading = false;
                this.isNoData = false;
                this._calculateHeight();
            },
            setInfiniteStatus (status) {
                this.isNoData = status;
                this._calculateHeight();
            },
            scrollTop (top) {
                this.target.scrollTop = top;
            },
            getPosition () {
                return his.target.scrollTop;
            },
            onScroll () {
                console.log('infiniteLoading:' + this.infiniteLoading + 'isNoData:' + this.isNoData);
                if (this.infiniteLoading || this.isNoData) {
                    return
                }
                console.log('scrollTop:' + this.target.scrollTop + 'scrollHeight:' + this.scrollHeight);
                if (this.target.scrollTop >= (this.scrollHeight - this.distance)) {
                    this.infinite()
                }
            }
        }
    };
</script>

<style lang="scss">
    .flex{
        display: flex;
    }
    ::-webkit-scrollbar{
        display: none;
    }
    .scroll-wrapper{
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        height: 100%;
        position: relative;
        // padding-bottom: 46px;
        transition-duration: 300ms;
        &.touching{
            transition-duration: 0ms;
        }
        .loading-icon{
            align-items: center;
            justify-content: center;
            padding: 10px 0;
            font-size: 13px;
            svg{
                height: 30px;
                padding-right: 10px;
            }
        }
        .more-data{
            align-items: center;
            justify-content: center;
            svg{
                height: 30px;
                padding-right: 10px;
            }
        }
    }
</style>
