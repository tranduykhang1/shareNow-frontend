import React from "react";

import images from "constants/Images/images";

const style = {
	container: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	logo: {
		width: 100,
		height: 100,
		margin: "20px auto",
		display: 'flex'
	},
	text: {
		fontWeight: 500
	},
	title: {
		fontWeight: 700
	},
	img: {
		marginTop: 20,
		height: 400,
		width: 400,
	},
};

const EmailConfirm = (props) => {
	return (
		<div style={style.container}>
			<img src={images.logo} alt="" style={style.logo} />
			<h3 style={style.title}>Xác nhận Email của bạn</h3>
			<h4 style={style.text}>
				Chúng tôi đã gửi đường dẫn để cập nhật mật khẩu đến email của bạn
				vui lòng kiểm tra
			</h4>
			<img src={images.emailSend} alt="Email send image" style={style.img} />
		</div>
	);
};

export default EmailConfirm;
