import {
	View, Text, Image, ActivityIndicator,
	TextInput, TouchableOpacity, ToastAndroid, ScrollView,
	FlatList,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, query, getDocs, where, addDoc, orderBy, limit } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import { Rating } from 'react-native-ratings';
import { useUser } from '@clerk/clerk-expo';
import CurrentDate from '../subcomponents/CurrentDate';

const Reviews = ({ serviceProvider }) => {
	const currentDate = new Date()
	const todayDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}  ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`

	const [reviews, setReviews] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [rating, setRating] = useState(4)
	const [userInput, setUserInput] = useState()
	const { user } = useUser()

	useEffect(() => {
		getReviews()
	}, [])

	const getReviews = async () => {
		setIsLoading(true)
		setReviews([])
		const q = query(collection(db, 'Reviews'), where("serviceProviderEmail", '==', serviceProvider[0].email))
		const snapshot = await getDocs(q)
		snapshot.forEach((doc) => {
			setReviews((prev) => [...prev, doc.data()])

		});
		setIsLoading(false)
	}

	const onsubmit = async () => {

		const docRef = collection(db, "Reviews")
		const data = {
			serviceProviderEmail: serviceProvider[0].email,
			rating: rating,
			comment: userInput,
			name: user?.fullName,
			userImage: user?.imageUrl,
			commenterEmail: user?.primaryEmailAddress?.emailAddress,
			date: todayDate,
		}
		await addDoc(docRef, data)
		ToastAndroid.show("Review Submitted Successfully", ToastAndroid.TOP)
		setUserInput([])
		getReviews()

	}
	return (
		<ScrollView style={{
			display: 'flex',
			marginHorizontal: 10,
			marginBottom: 30,
		}}
			showsVerticalScrollIndicator={false}>

			<Text
				style={{
					fontFamiy: 'Outfit-Bold',
					fontSize: 18,
					marginLeft: 80,
					padding: 8,
					color: '#007cb9',
				}}>Reviews</Text>
			<View style={{
				display: 'flex',
				borderColor: 'grey',
				borderWidth: 1,
				padding: 10,
				borderRadius: 10,
			}}><View style={{
				display: 'flex',
				flexDirection: 'row',
				gap: 10,
			}}>
					<Text
						style={{
							fontSize: 20,
							fontFamily: 'outfit-Regular',
							marginTop: 8,
						}}> Select Rating</Text>
					<Rating
						showRating={false}
						imageSize={24}
						onFinishRating={(rating) => setRating(rating)}
						style={{ paddingVertical: 10 }}
					/>
				</View>
				<TextInput
					placeholder='Enter You Comments Here'
					onChangeText={(value) => { setUserInput(value) }}

					numberOfLines={4}
					padding={10}
					textAlignVertical='top'
					borderWidth={1}
					borderRadius={10}
					borderColor='grey'
				/>
				<TouchableOpacity
					disabled={!userInput}
					onPress={() => { onsubmit() }}
					style={{
						padding: 20,
						backgroundColor: '#3377ff',
						marginTop: 10,
						borderRadius: 10,
					}}
				>
					<Text
						style={{
							textAlign: 'center',
							color: 'white',
							fontFamily: 'Outfit-Bold',
							fontSize: 18,
						}}
					>Submit</Text>
				</TouchableOpacity>

			</View>
			{reviews?.length > 0 && isLoading == false ?

				<View>
					{reviews?.map((review, index) => (
						<View key={index}
							style={{
								display: 'flex',
								flexDirection: 'row',
								gap: 10,

								padding: 10,
								borderRadius: 15,
								borderColor: 'grey',
								borderWidth: 1,
								marginTop: 10,
								flexWrap: 'wrap',


							}}>
							<View style={{
								display: 'flex',
								flexDirection: 'row',
								gap: 10,
								alignItems: 'center',
							}}>
								<Image source={{ uri: review?.userImage }}
									style={{

										width: 50,
										height: 50,
										borderRadius: 25
									}}
								/>
								<View>
									<Text
										style={{
											fontSize: 20,
											color: '#007cb9',
											fontFamily: 'outfit-Bold',
										}}>{review?.name}</Text>
								</View>
								{review?.date ? <CurrentDate date={review?.date} /> : null}

							</View>
							<View style={{
								display: 'flex',
								alignItems: 'flex-start',
								justifyContent: 'space-between',
							}}>
								<View
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										gap: 8
									}}>
									<Rating
										readonly={true}
										imageSize={20}
										ratingCount={review.rating}
										style={{
											alignItems: 'flex-start',
										}} />
									<Text
										style={{
											fontSize: 20,
											color: 'black',
											textAlign: 'Top',
											fontFamily: 'outfit-Bold',
										}}>{review.rating}</Text>
								</View>

								<Text
									style={{
										fontSize: 16,

									}}>{review.comment}</Text>
							</View>

						</View>
					)
					)}



				</View> : isLoading ? < ActivityIndicator
					size='xlarge'
					color='red' /> :
					<Text> No Reviews Found</Text>}

		</ScrollView>
	)
}

export default Reviews