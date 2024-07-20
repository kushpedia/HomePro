import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const ChatCard = ({ message, count }) => {
	return (
		<TouchableOpacity style={{
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
			marginTop: 5,
		}}>
			<View
				style={{
					displayy: 'flex',
					gapp: 10,
				}}>
				<Image source={{ uri: message.senderImage ? message.senderImage : 'https://ocdn.eu/pulscms-transforms/1/ov6k9kpTURBXy82OWE2OWZmNWQxMDgwNGYzY2IxMmNiMjI3YzdhODQ1NS5qcGeSlQMAzFDNCgDNBaCTBc0DFs0Brt4AAqEwBqExAA' }}
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
					}}>{message.senderName}</Text>
				<View style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}>
					<Text
						style={{
							width: 250,
						}}>{message.text}</Text>

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
		</TouchableOpacity>
	)
}

export default ChatCard

const styles = StyleSheet.create({})