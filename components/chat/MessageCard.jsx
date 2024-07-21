import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MessageCard = ({ record }) => {

	return (
		<View style={{}}>
			<Text style={{}}
			>{record.text}</Text>
			<Text>{record.createdAt}</Text>
		</View >
	)
}

export default MessageCard

const styles = StyleSheet.create({



})