<template>
	<div class="pay-main">
		<div class="pay-container">
			<div class="checkout-tit">
				<h4 class="tit-txt">
					<span class="success-icon"></span>
					<span class="success-info"
						>订单提交成功，请您及时付款，以便尽快为您发货~~</span
					>
				</h4>
				<div class="paymark">
					<span class="fl"
						>请您在提交订单<em class="orange time">4小时</em
						>之内完成支付，超时订单会自动取消。订单号：<em>{{
							orderNum
						}}</em></span
					>
					<span class="fr"
						><em class="lead">应付金额：</em
						><em class="orange money"
							>￥{{ payInfo.totalFee }}</em
						></span
					>
				</div>
			</div>
			<div class="checkout-info">
				<h4>重要说明：</h4>
				<ol>
					<li>
						尚品汇商城支付平台目前支持<span class="zfb">支付宝</span
						>支付方式。
					</li>
					<li>其它支付渠道正在调试中，敬请期待。</li>
					<li>
						为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。
					</li>
				</ol>
				<h4>
					支付宝账户信息：（很重要，<span class="save"
						>请保存！！！</span
					>）
				</h4>
				<ul>
					<li>支付帐号：11111111</li>
					<li>密码：111111</li>
					<li>支付密码：111111</li>
				</ul>
			</div>
			<div class="checkout-steps">
				<div class="step-tit">
					<h5>支付平台</h5>
				</div>
				<div class="step-cont">
					<ul class="payType">
						<li><img src="./images/pay2.jpg" /></li>
						<li><img src="./images/pay3.jpg" /></li>
					</ul>
				</div>
				<div class="hr"></div>

				<div class="payshipInfo">
					<div class="step-tit">
						<h5>支付网银</h5>
					</div>
					<div class="step-cont">
						<ul class="payType">
							<li><img src="./images/pay10.jpg" /></li>
							<li><img src="./images/pay11.jpg" /></li>
							<li><img src="./images/pay12.jpg" /></li>
							<li><img src="./images/pay13.jpg" /></li>
							<li><img src="./images/pay14.jpg" /></li>
							<li><img src="./images/pay15.jpg" /></li>
							<li><img src="./images/pay16.jpg" /></li>
							<li><img src="./images/pay17.jpg" /></li>
							<li><img src="./images/pay18.jpg" /></li>
							<li><img src="./images/pay19.jpg" /></li>
							<li><img src="./images/pay20.jpg" /></li>
							<li><img src="./images/pay21.jpg" /></li>
							<li><img src="./images/pay22.jpg" /></li>
						</ul>
					</div>
				</div>
				<div class="hr"></div>

				<div class="submit">
					<!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
					<a href="javascript:;" class="btn" @click="pay">立即支付</a>
				</div>
				<div class="otherpay">
					<div class="step-tit">
						<h5>其他支付方式</h5>
					</div>
					<div class="step-cont">
						<span
							><a href="weixinpay.html" target="_blank"
								>微信支付</a
							></span
						>
						<span>中国银联</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import QRCode from "qrcode";
export default {
	name: "Pay",
	data() {
		return {
			payInfo: {},
			orderNum: "",
			payStatus: 0,
		};
	},
	beforeMount() {
		this.orderNum = this.$route.query.orderNum;
	},
	mounted() {
		this.getPayInfo();
	},
	methods: {
		async getPayInfo() {
			const result = await this.$API.reqPayInfo(this.orderNum);
			if (result.code === 200) {
				this.payInfo = result.data;
			}
		},
		// 点击立即支付的回调
		async pay() {
			// 第一步:根据支付信息当中的codeUrl生成二维码进行弹框提示
			// With async/await
			// const generateQR = async (text) => {
			// 	try {
			// 		console.log(await QRCode.toDataURL(text));
			// 	} catch (err) {
			// 		console.error(err);
			// 	}
			// };

			try {
				// 生成二维码图片链接成功
				let imgUrl = await QRCode.toDataURL(this.payInfo.codeUrl);
				// 展示生成的二维码图片 this.$alert返回的也是promise. then对应点击确定按钮之后的操作,catch对应取消按钮之后的操作
				// then和catch存在的问题: 点击后都会强制关闭弹出框msgBox. 而现在不是直接关闭,而是需要判断用户是否支付,才决定关闭.
				this.$alert(`<img src="${imgUrl}" />`, "请使用微信扫码支付", {
					dangerouslyUseHTMLString: true,
					showClose: false,
					showCancelButton: true,
					cancelButtonText: "支付遇到问题",
					confirmButtonText: "我已成功支付",
					center: true,
					// beforeClose一旦被设定,那消息盒子关闭与否,可以在这里进行控制
					beforeClose:(action, instance, done)=>{
						// action:代表用户点击是哪个按钮: confirm-确定 cancel-取消 close-关闭
						if(action==='confirm'){
							// 确定按钮
							//if(!this.payStatus){
								// 如果没有支付
								// 1.提示
								//this.$message.info('请确保支付成功, 成功后会自动跳转');
								// 2.不用关弹出框,也不用关闭定时器
							//}
							// 后门
							done();
							clearInterval(this.timer);
							this.timer = null;
							this.$router.push('/paysuccess')
						}else if(action === 'cancel'){
							// 取消按钮
							// this.$message.success 绿色提示
							// info  灰色 warning黄色  error红色
							// 1.提示
							this.$message.warning('支付问题请联系..');
							// 2.清除定时器
							clearInterval(this.timer); 
							this.timer = null;
							// 3.关闭消息盒子
							done(); //调用就关, 不调不关
						}
					}
				}).then(()=>{
					// 不使用
				}).catch(()=>{
					// 不使用  如果不写点击后在console中会报错
				})


				// 轮询 间隔x秒发一个请求,让后台返回这个订单的支付状态.以判断用户是否已经支付;一个订单只能开启一个定时器
				// 必须添加if,确保订单支付轮询只开启一个定时器
				if (!this.timer) {
					this.timer = setInterval(async () => {
						const result = await this.$API.reqPayStatus(
							this.orderNum
						);
						if (result.code === 200) {
							// 支付状态 成功
							//0.存储成功的code,用于用户点击跳转时进行判断
							this.payStatus = 200;
							//1.提示支付成功
							this.$message.success("支付成功");
							//2.关闭定时器 ++(清定时器必须彻底)
							clearInterval(this.timer); //clearInterval只是清除了定时器,不让管理模块中的定时器生效
							this.timer = null; //把之前设置定时器的编号id也清除.清除定时器也可以使用clearTimeout, 相应的也可以,但一般不这么用.
							//3.跳转: 关闭MessageBox, 再跳转
							this.$$msgbox.close();
							this.$router.push("/paysuccess");
						} 
					}, 2000);
				}
			} catch (error) {
				// 生成失败
				this.$message.error("生成失败" + error.message);
			}
		},
	},
};
</script>

<style lang="less" scoped>
.pay-main {
	margin-bottom: 20px;

	.pay-container {
		margin: 0 auto;
		width: 1200px;

		a:hover {
			color: #4cb9fc;
		}

		.orange {
			color: #e1251b;
		}

		.money {
			font-size: 18px;
		}

		.zfb {
			color: #e1251b;
			font-weight: 700;
		}

		.checkout-tit {
			padding: 10px;

			.tit-txt {
				font-size: 14px;
				line-height: 21px;

				.success-icon {
					width: 30px;
					height: 30px;
					display: inline-block;
					background: url(./images/icon.png) no-repeat 0 0;
				}

				.success-info {
					padding: 0 8px;
					line-height: 30px;
					vertical-align: top;
				}
			}

			.paymark {
				overflow: hidden;
				line-height: 26px;
				text-indent: 38px;

				.fl {
					float: left;
				}

				.fr {
					float: right;

					.lead {
						margin-bottom: 18px;
						font-size: 15px;
						font-weight: 400;
						line-height: 22.5px;
					}
				}
			}
		}

		.checkout-info {
			padding-left: 25px;
			padding-bottom: 15px;
			margin-bottom: 10px;
			border: 2px solid #e1251b;

			h4 {
				margin: 9px 0;
				font-size: 14px;
				line-height: 21px;
				color: #e1251b;
			}

			ol {
				padding-left: 25px;
				list-style-type: decimal;
				line-height: 24px;
				font-size: 14px;
			}

			ul {
				padding-left: 25px;
				list-style-type: disc;
				line-height: 24px;
				font-size: 14px;
			}
		}

		.checkout-steps {
			border: 1px solid #ddd;
			padding: 25px;

			.hr {
				height: 1px;
				background-color: #ddd;
			}

			.step-tit {
				line-height: 36px;
				margin: 15px 0;
			}

			.step-cont {
				margin: 0 10px 12px 20px;

				ul {
					font-size: 0;

					li {
						margin: 2px;
						display: inline-block;
						padding: 5px 20px;
						border: 1px solid #ddd;
						cursor: pointer;
						line-height: 18px;
					}
				}
			}
		}

		.submit {
			text-align: center;

			.btn {
				display: inline-block;
				padding: 15px 45px;
				margin: 15px 0 10px;
				font: 18px "微软雅黑";
				font-weight: 700;
				border-radius: 0;
				background-color: #e1251b;
				border: 1px solid #e1251b;
				color: #fff;
				text-align: center;
				vertical-align: middle;
				cursor: pointer;
				user-select: none;
				text-decoration: none;
			}
		}
	}
}
</style>
