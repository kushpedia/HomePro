import {
	StyleSheet, Text, View,
	FlatList, ActivityIndicator, Image, TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, query, getDocs, where } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import { Rating } from 'react-native-ratings';
import { Ionicons } from '@expo/vector-icons';

const GetProfile = () => {
	const navigation = useNavigation()
	const { email } = useLocalSearchParams()
	const [isLoading, setIsLoading] = useState(false)
	const [serviceProviderProfile, setServiceProviderProfile] = useState([])
	useEffect(() => {

		navigation.setOptions({
			headerShown: true,
			headerTitle: 'Provider Profile',
		})
		getProfile()
	}, [])
	const getProfile = async () => {
		setIsLoading(true)
		setServiceProviderProfile([])

		const q = query(collection(db, 'Profile'), where("email", '==', email))
		const snapshot = await getDocs(q)
		snapshot.forEach((doc) => {
			setServiceProviderProfile((prev) => [...prev, doc.data()])

		});
		setIsLoading(false)
	}

	return (

		<View style={{
			display: 'flex', marginTop: 20, marginLeft: 10,
			backgroundColor: 'white'
		}}>
			{serviceProviderProfile?.length > 0 && isLoading == false ?
				<FlatList
					data={serviceProviderProfile}
					renderItem={({ item }) => (
						<View
							style={{
								display: 'flex',
								flexDirection: 'row',
								gap: 20
							}}>
							<Image source={{ uri: item.profilePic }}
								style={{
									width: 120,
									height: 150,
									borderRadius: 20,
									marginTop: 2,
									borderWidth: 1,
									borderColor: 'grey',
								}} />
							<View
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}>


								<Text
									style={{
										fontSize: 20,
										color: '#007cb9',
										fontFamily: 'outfit-Bold',
									}}>{item.name}</Text>
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
										count={item.ratings}
										readonly={true}

									/>
									<Text
										style={{
											fontSize: 20,
											color: 'black',
											textAlign: 'Top',
											fontFamily: 'outfit-Bold',
										}}
									>{item.ratings}</Text>
								</View>

							</View>

							<View style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								marginLeft: 20
							}}>
								<TouchableOpacity>
									<Ionicons name="heart-outline" size={32} color="red" />
								</TouchableOpacity>
							</View>

						</View>
					)
					}>

				</FlatList > : isLoading ? < ActivityIndicator
					size='xlarge'
					color='red' /> :
					<View style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: '50%',

					}}>
						<Text>No Details Find </Text>

					</View>
			}
		</View >

	)
}

export default GetProfile

const styles = StyleSheet.create({})