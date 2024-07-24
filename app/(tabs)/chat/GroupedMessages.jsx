import { StyleSheet, Text, View, ScrollView, TextInput, Keyboard, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import MessagesHeader from '../../../components/chat/MessagesHeader';
import MessageCard from '../../../components/chat/MessageCard';
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';
const GroupedMessages = () => {
	const [keyboardVisible, setKeyboardVisible] = useState(false);

	const route = useRoute();
	const { user } = useUser()
	const [textInput, setTextInput] = useState('')


	const LoggedEmail = user?.primaryEmailAddress?.emailAddress

	const { data, MessageImage, MessageName } = route.params || {};
	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			() => setKeyboardVisible(true)
		);
		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			() => setKeyboardVisible(false)
		);

		return () => {
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, []);
	const handleMessageSend = () => {
		console.log(textInput)
	}
	return (
		<View >
			<MessagesHeader image={MessageImage} name={MessageName} />

			<ScrollView style={[styles.scrollStyle, keyboardVisible ? styles.keyboardmarginbottom : styles.scrollStyle,]}
				showsVerticalScrollIndicator={false}>

				{data && (
					Object.keys(data).map(key => {
						const record = data[key];
						return (

							<View style={[styles.messageCard, record.senderEmail == LoggedEmail ? styles.messageText : styles.otherMessages]}>
								<MessageCard key={key} record={record} />
							</View>






						);
					})
				)}
				<View style={[styles.inputContainer, keyboardVisible ? styles.keyboardmarginbottom : styles.inputContainer]}>

					<TextInput placeholder='Write a message'
						multiline={true}
						style={{
							width: 200,
						}}
						value={textInput}
						onChangeText={(text) => setTextInput(text)} />
					<TouchableOpacity onPress={handleMessageSend}>
						<Ionicons name="send" size={24} color="black" />
					</TouchableOpacity>

				</View>
			</ScrollView >

		</View >
	)
}

export default GroupedMessages

const styles = StyleSheet.create({
	scrollStyle: {
		display: 'flex',
		marginHorizontal: 10,
		marginBottom: 30,
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 8,
		marginTop: 10,
		flexWrap: 'wrap',
	},
	messageCard: {
		display: 'flex',
		flexDirection: 'row',
		fontSize: 16,
		fontFamily: 'BreeSerif-Regular',
		marginTop: 10,
		borderRadius: 10,
		padding: 4,
		borderWidth: 1,
		width: '86%',

	},
	otherMessages: {
		borderColor: 'green',
		alignItems: 'flex-end',
		backgroundColor: '#F9CB9C',
		alignItems: 'flex-start',

	},
	messageText: {
		borderColor: 'grey',
		alignItems: 'flex-start',
		backgroundColor: '#CFE2F3',
		alignItems: 'flex-end',
		marginLeft: 60,
	},
	inputContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '98%',
		marginTop: 10,
		marginBottom: 10,
		padding: 10,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 10,
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2,
	},
	keyboardmarginbottom: {
		marginBottom: 120,
	}
})