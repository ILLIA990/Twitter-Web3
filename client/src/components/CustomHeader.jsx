import {Link} from "react-router-dom";
import React from "react";
import theme from "../constants/color";

export default function CustomHeader() {
    return (
			<div
				style={{
					height: '10vh',
					backgroundColor: theme.primaryColor,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					paddingInline: '10%',
				}}
			>
				<Link to={'/'}>
					<img
						src='./x-social-media-white-icon.png'
						alt='logo'
						style={{
							width: '5.5vh',
							height: '5.5vh',
						}}
					/>
				</Link>
				<Link to={'/profile'}>
					<img
						style={{
							width: '5.5vh',
							height: '5.5vh',
						}}
						src='./avatar.svg'
						alt='user'
					/>
				</Link>
			</div>
		)
}