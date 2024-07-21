import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'


const Conversations = ({ myMessages, groupedId }) => {
	const { user } = useUser()
	const loggedEmail = user?.primaryEmailAddress?.emailAddress

	const messagesFinal = myMessages[groupedId][0]

	const unreadMessages = myMessages[groupedId].filter(message => !message.read && message.senderEmail != loggedEmail);

	const count = unreadMessages.length

	return (


		<TouchableOpacity
			key={groupedId}

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
				<Image source={{ uri: messagesFinal.senderImage ? messagesFinal.senderImage : 'https://ocdn.eu/pulscms-transforms/1/ov6k9kpTURBXy82OWE2OWZmNWQxMDgwNGYzY2IxMmNiMjI3YzdhODQ1NS5qcGeSlQMAzFDNCgDNBaCTBc0DFs0Brt4AAqEwBqExAA' }}
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

