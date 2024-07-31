import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, query, getDocs, where } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'


import ServicesItem from '../../components/Home/ServicesItem'


export default function ServiceListByCategory() {
	const [isLoading, setIsLoading] = useState(false)
	const [serviceByCategory, setServiceByCategory] = useState([])
	const navigation = useNavigation()
	const { category } = useLocalSearchParams()
	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTitle: category,
		})
		getServicesListByCategory()
	}, [])

	const getServicesListByCategory = async () => {
		setIsLoading(true)
		setServiceByCategory([])
		const q = query(collection(db, 'Services'), where("category", '==', category))
		const snapshot = await getDocs(q)
		snapshot.forEach((doc) => {
			setServiceByCategory((prev) => [...prev, doc.data()])

		});
		setIsLoading(false)
	}
	return (
		<View style={{ display: 'flex', marginTop: 30 }}>
			{serviceByCategory?.length > 0 && isLoading == false ?
				<FlatList
					onRefresh={getServicesListByCategory}
					refreshing={isLoading}
					data={serviceByCategory}
					renderItem={({ item, index }) => (
						<ServicesItem services={item}
						/>
					)

					} />
				: isLoading ? < ActivityIndicator
					size='xlarge'
					color='red' />

					: <View style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: '50%',

					}}>
						<Text>No Services Found for </Text>
						<Text
							style={{
								fontFamily: 'outfit-Bold',
								fontSize: 16,
							}}>{category} </Text>
					</View>
			}
		</View>
	)
}

