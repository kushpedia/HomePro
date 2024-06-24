import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CategoryItem({ category }) {
	return (
		<TouchableOpacity >
			<View style={{
				padding: 15,
				borderRadius: 10,
				backgroundColor: 'white',
				marginLeft: 15,

			}}>
				<Image source={{ uri: category.imageUrl }}
					style={{
						width: 100,
						height: 80,
					}} />
				<Text
					style={{
						textAlign: 'center',
						fontFamily: 'outfit-Medium',
						fontSize: 14,
						marginTop: 10,
					}}
				>{category.name}</Text>
			</View>

		</TouchableOpacity>
	)
}

