<template>
	<transition name="fade-loading">
		<div class="l-loading" v-if="this.isloading">
			<i class="loading"></i>
		</div>
	</transition>
</template>

<script>
	export default {
		data () {
			return {};
		},
		props: {
			isloading: {
				type: Boolean,
				default: false
			}
		},
		computed: {
		},
		methods: {
		}
	};
</script>

<style lang="less">
	.fade-loading-enter-active, .fade-loading-leave-active{
  		transition: all 0.2s ease     
	}
	.fade-loading-enter, .fade-loading-leave-active{
  		opacity: 0 
	}
	.l-loading{
		position: absolute;
    	top: 50%;
    	left: 50%;
    	z-index: 99999;
		transform: translate3d(-50%, -50%, 0);
		.text{
			text-align: center;
    		font-size: 13px;
    		color: #000;
    		margin-top: 0.2rem;
		}
		.loading {
		    display: block;
		    width: 1.69rem; 
		    height: 1.9rem;
		    background: url('../common/images/loading.png') 0 0 no-repeat;
		    // background: url('/static/img/loading.png') 0 0 no-repeat;
		    // background: url('../common/images/web_heart_animation.png') 0 0 no-repeat;
		    background-size: 4200%;
		    animation: heart-burst steps(41) 1.25s infinite both;
		}
		.stop {
		    animation-play-state: paused;
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
