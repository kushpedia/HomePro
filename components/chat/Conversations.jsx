import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import { useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router';

const Conversations = ({ myMessages, groupedId }) => {
	const navigation = useNavigation();
	const router = useRouter();
	const { user } = useUser()
	const loggedEmail = user?.primaryEmailAddress?.emailAddress
	const messagesFinal = myMessages[groupedId][0]
	const messagesGroupedTogether = myMessages[groupedId]

	const unreadMessages = myMessages[groupedId].filter(message => !message.read && message.senderEmail != loggedEmail);
	const count = unreadMessages.length

	const getImage = () => {
		if (messagesFinal.senderEmail == loggedEmail) {
			return messagesFinal.receiverImage
		} else {
			return messagesFinal.senderImage
		}
	}
	const MessageImage = getImage()
	const MessageName = messagesFinal.senderEmail != loggedEmail ? messagesFinal.senderName : messagesFinal.receiverName
	const handleNavigate = () => {
		navigation.navigate('GroupedMessages', { data: messagesGroupedTogether, MessageImage, MessageName });
	};
	return (


		<TouchableOpacity
			key={groupedId}
			onPress={handleNavigate}

			style={{
				display: 'flex',
				flexDirection: 'row',
				gap: 10,

				marginTop: 5,
			}}
		>
			<View
				style={{
					displayy: 'flex',
					gapp: 10,
				}}>
				<Image source={{ uri: getImage() ? getImage() : 'https://winaero.com/blog/wp-content/uploads/2017/12/User-icon-256-blue.png' }}
					style={{
						width: 50,
						height: 50,
						borderRadius: 80,
					}} />
			</View>
			<View
				style={{
					borderBottomColor: '#E8F3EA',
					borderBottomWidth: 1,
				}}>
				<Text
					style={{
						fontSize: 16,
						fontFamily: 'BreeSerif-Regular',

					}}>{messagesFinal.senderEmail != loggedEmail ? messagesFinal.senderName : messagesFinal.receiverName}</Text>
				<View style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',

				}}>
					<Text
						style={{
							width: 250,
						}}>{messagesFinal.text}</Text>

					{count > 0 ?

						<Text
							style={{
								textAlign: 'center',
								fontSize: 12,

								width: 30,
								height: 30,
								backgroundColor: '#00DC8C',
								color: 'black',
								borderRadius: 100,
								padding: 5,
							}}>{count}</Text> : ''

					}

				</View>
			</View>
		</TouchableOpacity >
	)
}

export default Conversations

const styles = StyleSheet.create({})

