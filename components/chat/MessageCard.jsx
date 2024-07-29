import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

const MessageCard = ({ record }) => {
	const { user } = useUser()
	const LoggedEmail = user?.primaryEmailAddress?.emailAddress
	return (
		<View style={[styles.container, record.senderEmail == LoggedEmail ? styles.messageText : styles.otherMessages]}>
			<Text style={{}}
			>{record.text}</Text>
			<Text>{record.createdAt}</Text>
		</View >
	)
}

export default MessageCard

const styles = StyleSheet.create({
	container: {
		maxWidth: '75%',
		padding: 10,
		borderRadius: 20,
		marginHorizontal: 10,

	},
	messageText: {
		backgroundColor: '#0084ff',
		borderTopRightRadius: 0,
	},
	otherMessages: {
		backgroundColor: '#e5e5e5',
		borderTopLeftRadius: 0,
	}


})