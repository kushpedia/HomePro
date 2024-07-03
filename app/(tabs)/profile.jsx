import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import Header from '../../components/Profile/Header'
import { Ionicons } from '@expo/vector-icons';
import Logout from '../../components/Logout';

const profile = () => {
	const data = [
		{
			'item': 'person', 'details': 'Profile Details'
		},
		{ 'item': 'lock-closed', 'details': 'Change Password' },
		{ 'item': 'card', 'details': 'My Services' },
		{ 'item': 'timer-sharp', 'details': 'History' },
		{ 'item': 'mail', 'details': 'Contact Us' }
	]


	return (


		<ScrollView style={
			{

			}
		} showsVerticalScrollIndicator={false}>
			<Header />
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<TouchableOpacity style={{
						display: 'flex',
						flexDirection: 'row',
						padding: 10,
						justifyContent: 'space-between',
						borderWidth: 1,
						borderColor: 'grey',
						marginHorizontal: 4,
						marginVertical: 10,
						borderRadius: 10,
					}}>
						<View style={{
							display: 'flex',
							flexDirection: 'row',
							padding: 10,
							gap: 20,
							justifyContent: 'space-between',
						}}>
							<Ionicons name={item.item} size={36} color="black"
								style={{
									backgroundColor: '#f0ffff',
									borderRadius: 10,
								}} />
							<Text
								style={{
									fontFamily: 'outfit-Bold',
									textAlign: 'center',
									fontSize: 18,
								}}>{item.details}</Text>
						</View>

						<View>
							<Ionicons name="chevron-forward-sharp" size={32} color="black" />
						</View>


					</TouchableOpacity>
				)}
			/>



			<Logout />
		</ScrollView>


	)
}

export default profile