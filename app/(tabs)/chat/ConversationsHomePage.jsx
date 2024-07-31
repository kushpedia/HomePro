
import {
	ActivityIndicator, StyleSheet, TextInput,
	Text, View, FlatList, TouchableOpacity, Image, ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../../configs/FirebaseConfig'
import { collection, getDocs, query, limit, where, or } from 'firebase/firestore'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';
import Conversations from '../../../components/chat/Conversations'

const ConversationsHomePage = () => {
	const { user } = useUser()
	const [messages, setMessages] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		getMessages()
	}, [])

	const getMessages = async () => {
		setIsLoading(true)
		setMessages([])
		const q = query(collection(db, 'Messages'),
			or(
				where("receiverEmail", '==', user?.primaryEmailAddress?.emailAddress),
				where("senderEmail", '==', user?.primaryEmailAddress?.emailAddress)
			)
		)
		const snapshot = await getDocs(q)
		snapshot.forEach((doc) => {
			setMessages((prev) => [...prev, { id: doc?.id, ...doc.data() }])
		});
		setIsLoading(false)
	}

	// grouping the messages with sender and receiver

	const groupMessages = (messages) => {
		const groupedMessages = {};

		messages.forEach((message) => {
			const { senderEmail, receiverEmail } = message;

			// Create a unique key for the conversation
			const key = [senderEmail, receiverEmail].sort().join('-');

			// Initialize the group if it doesn't exist
			if (!groupedMessages[key]) {
				groupedMessages[key] = [];
			}

			// Add the message to the group
			groupedMessages[key].push(message);
		});

		return groupedMessages;
	};

	const myMessages = groupMessages(messages)
	const groupmessagesKeys = Object.keys(myMessages)


	return (
		<View style={{
			display: 'flex',
			marginTop: 20,
		}}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Messages</Text>

				<View style={styles.search}>

					<TextInput placeholder='Search'
						style={{
							width: 100,
						}} />
					<Ionicons name="search" size={18} color="black" />
				</View>
			</View>
			<ScrollView style={{
				display: 'flex',
				marginHorizontal: 10,
				marginBottom: 30,
				backgroundColor: '#fff',
				borderRadius: 10,
				padding: 8,
				marginTop: 10,

			}}
				showsVerticalScrollIndicator={false}>
				{groupmessagesKeys?.length > 0 && isLoading == false ?

					groupmessagesKeys?.map((messageId, index) =>
						<Conversations groupedId={messageId} myMessages={myMessages} />

					) : isLoading ? < ActivityIndicator
						size='xlarge'
						color='red' /> :
						<Text> No Messages</Text>
				}



			</ScrollView>


		</View>
	)
}

export default ConversationsHomePage
const styles = StyleSheet.create({
	headerStyles: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 20,
	},
	headerText: {
		fontSize: 32,
		marginTop: 20,
		marginLeft: 80,
		fontFamily: 'Outfit-Bold',
	},
	search: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginHorizontal: 10,
		marginTop: 20,
		gap: 10,
		backgroundColor: '#fff',
		padding: 8,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "thistle",
	},
})