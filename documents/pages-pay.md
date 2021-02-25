### Pay component  points



#### the workflow of button '立即支付'

> 1. install 'element-ui' on demand
>
> 2. install 'qrcode' through [npmjs](https://www.npmjs.com/package/qrcode) or [github](https://github.com/soldair/node-qrcode) tutorials
>
> 3. 



#### 1.1 install element-ui on demand and import in main.js

```js
1.yarn add element-ui -S

2.main.js

import {Button, Message, MessageBox } from 'element-ui';

# the element-ui component has 2 register style. use $ or not
Vue.use(Button);
//or Vue.component(Button.name, Button);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = Message.alert;
Vue.prototype.$message = Message;

```





#### 1.2  install qrcode and use it 

```js
install:
yarn add qrcode -S

tutorial in ES6/ES7:
// With async/await
const generateQR = async text => {
  try {
    console.log(await QRCode.toDataURL(text))
  } catch (err) {
    console.error(err)
  }
}
```







#### 1.3 支付订单按钮回调

```js
methods: {
		async getPayInfo() {
			const result = await this.$API.reqPayInfo(this.orderNum);
			if (result.code === 200) {
				this.payInfo = result.data;
			}
		},
		// 立即支付按钮 回调
		async pay() {
			// 第一步根据支付信息当中的codeUrl生成二维码进行弹框提示
			try {
				// 使用trycatch语法来判断QRCode成功还是失败
				let imgUrl = await QRCode.toDataURL(this.payInfo.codeUrl);
				// 把生成的二维码图片进行展示
				this.$alert(`<img src="${imgUrl}" />`, "请使用微信扫码支付", {
					dangerouslyUseHTMLString: true,
					showClose: true,
					showCancelButton: true,
					cancelButtonText: "支付遇到问题",
					confirmButtonText: "我已支付成功",
					center: true,
					// beforeClose 一旦被调用,可以对消息盒子进行关闭/不关闭的控制
					beforeClose: (action, instance, done) => {
						// action代表用户点击的是哪个按钮,confirm确定按钮 cancel取消按钮
						if (action === "confirm") {
							// 用户点击确定 判断有无支付
							// if (!this.payStatus) {
								// 只需要判断未支付情况
								// this.$message.info(
									"请确保支付成功,成功后会自动跳转到支付成功页面"
								// );
							// }

							//后门
							clearInterval(this.timer);
							this.timer = null;
							done();
							this.$router.push("/paysuccess");
						} else if (action === "cancel") {
							// 用户点击取消
							// 1.提示
							this.message.warning("支付问题联系客服:xxx-xxx");
							// 2.清除定时器
							clearInterval(this.timer);
							this.timer = null;
							// 3.关闭消息盒子
							done();
						}
					},
					// then和catch分别对应点击成功和点击取消按钮的后续操作;如果没有会报错;但是,点击调用他们后消息盒子会强制关闭.现在的需求是点击后进行判断才决定关闭与否.
				})
					.then(() => {})
					.catch(() => {});

				// 轮询,弹出框之后必须要添加. 间隔2秒发请求,返回这个订单的支付状态. 用来判断用户是否已经支付
				if (!this.timer) {
					// 这里必须添加判断,确保订单支付轮询只开启一个定时器
					this.timer = setInterval(async () => {
						const result = await this.$API.reqPayStatus(
							this.orderNum
						);
						if (result.code === 200) {
							// 代表支付状态是成功的
							// 1.更新支付状态数据,用来对用户进行点击按钮时进行判断
							this.payStatus = 200;
							// 2.提示支付成功
							this.$message.success("支付成功");
							// 3.清除定时器
							clearInterval(this.timer); //清除定时器,让其在管理模块中失效
							this.timer = null; //清除定时器Id
							// 4.关闭弹出框,自动跳转支付页面
							this.$msgbox.close();
							this.$router.push("/paysuccess");
						}
					}, 2000);
				}
			} catch (error) {
				// 生成二维码图片链接失败
				this.$message.error("付款二维码生成失败" + error.message);
			}
		},
	},
};
```





#### 1.4 支付流程

```js
1、生成了二维码
2、messageBox展示了二维码
3、刚展示完二维码：立马轮询 就需要发请求（这个请求要连续的去发） 隔2秒发一次 ，去查询支付状态是否支付完成
4、后台会在发请求后返回支付状态码  支付状态码如果是205代表还在支付中，如果是200代表支付成功
5、根据返回的支付状态码去决定后续操作
1》如果在查询回来是200的时候，我们要自动跳转到支付成功页面，关闭messageBox,
2》把这个状态码还要保存在data当中，用来去作为用户点击已成功支付按钮的判断依据

6、去单独的处理点击我已成功支付或者支付遇到问题按钮的逻辑
1》点击我已成功支付，那么要根据data当中存储的状态码判断是否真的支付完成，
  如果没有完成，停在当前页面并提示,不关闭messageBox,
2》点击支付遇到问题，那么我们要提示用户找谁处理，停止往后台发请求，关闭messageBox
```

