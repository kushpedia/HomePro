import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { useRouter } from 'expo-router';


const ServiceProviderCard = ({ provider }) => {
	const router = useRouter()
	return (
		<ScrollView>

			<View style={styles.container}>

				<Image style={styles.image} source={{ uri: provider.profilePic }} />
				<View style={styles.innerContainer}>
					<Text
						style={{
							fontFamily: 'outfit-Bold',
							fontSize: 22,
							color: '#007cb9'
						}}>{provider.name}</Text>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							gap: 5,

						}}><Ionicons name="location" size={24} color="black" />
						<Text style={{
							fontSize: 16,
							color: 'black',
							fontFamily: 'outfit-Medium',
						}}>{provider.location}</Text></View>

					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							gap: 5,

						}}><Ionicons name="call" size={24} color="black" />
						<Text style={{
							fontSize: 16,
							color: 'black',
							fontFamily: 'outfit-Medium',
						}}>{provider.phone}</Text></View>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							gap: 5,

						}}>
						<Rating
							type='star'
							ratingCount={5}
							imageSize={24}
							count={provider.ratings}
							readonly={true}

						/>
						<Text
							style={{
								fontSize: 20,
								color: 'black',
								textAlign: 'Top',
								fontFamily: 'outfit-Bold',
							}}
						>{provider.ratings}</Text>
					</View>
					<TouchableOpacity
						onPress={() => router.push(`/providerProfile/` + provider.email)}
						style={styles.select}>

						<Text
							style={{
								color: 'white',
								fontSize: 18,
								fontFamily: 'outfit-Bold',
							}}>View Profile</Text>
					</TouchableOpacity>
				</View>


			</View>

		</ScrollView>
	)
}

export default ServiceProviderCard

const styles = StyleSheet.create({
	innerContainer: {
		display: 'flex',
		marginLeft: 15,
		gap: 8,


	},
	container: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		borderWidth: 1,
		borderColor: 'grey',
		borderRadius: 8,
		padding: 10,
		backgroundColor: 'white',
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 20,
		marginTop: 2,
		borderWidth: 1,
		borderColor: 'grey',
	},
	select: {
		backgroundColor: '#007cb9',
		borderRadius: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '20',
		height: 40,
		length: 60

	},


})