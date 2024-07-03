import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Logout from '../Logout'


const Header = () => {
	const { user } = useUser()
	return (
		<View styel={{}}>

			<View style={{
				padding: 20,
				paddingTop: 40,
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'row',
				gap: 10,
				backgroundColor: 'white',
				borderBottomRightRadius: 20,
				borderBottomLeftRadius: 20,

			}}>
				<Image source={{ uri: user?.imageUrl }}
					style={{ width: 80, height: 80, borderRadius: 50 }} />
				<View>
					<Text>Welcome</Text>
					<Text style={{
						fontSize: 20,
						fontFamily: 'outfit-Regular',

					}}>{user?.fullName}</Text>

				</View>

			</View>

			{/* <Logout /> */}
		</View >
	)
}

export default Header