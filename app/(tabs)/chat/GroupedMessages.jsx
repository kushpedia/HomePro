import {
	StyleSheet, Text, View,
	ScrollView, TextInput, Keyboard,
	ToastAndroid, TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import MessagesHeader from '../../../components/chat/MessagesHeader';
import MessageCard from '../../../components/chat/MessageCard';
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';
import { collection, query, getDocs, where, addDoc, orderBy, limit } from 'firebase/firestore'
import { db } from '../../../configs/FirebaseConfig'
const GroupedMessages = () => {
	const currentDate = new Date()
	const [keyboardVisible, setKeyboardVisible] = useState(false);
	const route = useRoute();
	const { user } = useUser()
	const [messageInput, setMessageInput] = useState('')
	const LoggedEmail = user?.primaryEmailAddress?.emailAddress
	const { data, MessageImage, MessageName } = route.params || {};
	const messageSenderName = data[0].senderEmail == LoggedEmail ? data[0].senderName : data[0].receiverName
	const messageReceiverName = data[0].senderEmail != LoggedEmail ? data[0].senderName : data[0].receiverName
	const senderEmails = data[0].senderEmail == LoggedEmail ? data[0].receiverEmail : data[0].senderEmail
	const todayDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}  ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`

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
	const handleMessageSend = async () => {

		const docRef = collection(db, "Messages")
		const data = {
			createdAt: todayDate,
			read: false,
			senderEmail: LoggedEmail,
			receiverEmail: senderEmails,
			receiverName: messageReceiverName,
			senderName: messageSenderName,
			text: messageInput,
			senderImage: user?.imageUrl,
			receiverImage: MessageImage,
			uniquId: `${LoggedEmail}-${senderEmails}-${todayDate}`
		}
		await addDoc(docRef, data)
		ToastAndroid.show("Message Sent", ToastAndroid.TOP)
		console.log(`Message sent successfully : ${messageInput}`)
		setMessageInput('')

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
						value={messageInput}
						onChangeText={(text) => setMessageInput(text)} />
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
		marginBottom: 70,
		flexWrap: 'wrap',
	},
	messageCard: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		marginVertical: 8,
		paddingHorizontal: 10,


		// display: 'flex',
		// flexDirection: 'row',
		// fontSize: 16,
		// fontFamily: 'BreeSerif-Regular',
		// marginTop: 10,
		// borderRadius: 10,
		// padding: 4,
		// borderWidth: 1,



	},
	otherMessages: {
		ustifyContent: 'flex-start',


	},
	messageText: {
		justifyContent: 'flex-end',




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