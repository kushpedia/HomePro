import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
	return (
		<View style={{
			displsy: 'flex',
			marginTop: 10,
			backgroundColor: 'white',
			borderRadius: 4,
			marginRight: 5,
			padding: 10,
		}}>

			<View style={{
				display: 'flex', flexDirection: 'row',
				justifyContent: 'space-between',

			}}>
				<TouchableOpacity>
					<Ionicons name="menu" size={32} color="black" />
				</TouchableOpacity>
				<TouchableOpacity>
					<Ionicons name="notifications-outline" size={32} color="black" />
				</TouchableOpacity>
			</View >
			<View style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				flexDirection: 'row',
				marginHorizontal: 1,
				gap: 10,
				marginTop: 10,
				backgroundColor: '#fff',
				padding: 8,
				borderRadius: 10,
				borderWidth: 1,
				borderColor: "thistle",
			}}>

				<TextInput placeholder='Search for Serices'
					style={{
						width: 100,
					}} />
				<Ionicons name="search" size={32} color="black" />
			</View>
		</View>


	)
}

export default Header

const styles = StyleSheet.create({})