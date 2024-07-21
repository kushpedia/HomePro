import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const MessagesHeader = ({ image, name }) => {
	return (
		<View
			style={styles.container}>

			<Image source={{ uri: image }}
				style={styles.image} />
			<Text style={styles.nameText}>{name}</Text>
		</View>
	)
}

export default MessagesHeader



const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
		marginTop: 10,
		marginHorizontal: 10,
		marginBottom: 10,
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 8,
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 50,
		marginLeft: 2,
	},
	nameText: {
		fontSize: 16,
		fontFamily: 'BreeSerif-Regular',
	}

})