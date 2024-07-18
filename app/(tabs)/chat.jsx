
import {
	ActivityIndicator, StyleSheet, TextInput,
	Text, View, FlatList, TouchableOpacity, Image, ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../configs/FirebaseConfig'
import { collection, getDocs, query, limit, where } from 'firebase/firestore'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';
import ChatCard from '../../components/chat/ChatCard'


const chat = () => {
	const { user } = useUser()

	const [messages, setMessages] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		getMessages()
	}, [])

	const getMessages = async () => {
		setIsLoading(true)
		setMessages([])

		const q = query(collection(db, 'Messages'), where("receiverEmail", '==', user?.primaryEmailAddress?.emailAddress))
		const snapshot = await getDocs(q)
		snapshot.forEach((doc) => {
			setMessages((prev) => [...prev, { id: doc?.id, ...doc.data() }])
		});
		setIsLoading(false)
	}
	const getUnreadCount = (id) => {
		return messages.filter((message) => !message.read && message.id == id).length + 1;
	};
	return (
		<View style={{
			display: 'flex',
			marginTop: 20,
		}}>
			<View style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginTop: 20,
			}}>
				<Text style={{
					fontSize: 32,
					marginTop: 20,
					marginLeft: 80,
					fontFamily: 'Outfit-Bold',
				}}>Messages</Text>

				<View style={{
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
				}}>

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
				{messages?.length > 0 && isLoading == false ?

					messages?.map((message, index) =>
						<ChatCard key={index} message={message} count={getUnreadCount(message.id)} />

					) : isLoading ? < ActivityIndicator
						size='xlarge'
						color='red' /> :
						<Text> No Messages</Text>
				}



			</ScrollView>


		</View>
	)
}

export default chat