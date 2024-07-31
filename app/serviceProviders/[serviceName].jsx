import { ActivityIndicator, StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, query, getDocs, where } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import ServiceProviderCard from '../../components/ServiceProvider/ServiceProviderCard'
const ServiceProviders = () => {
	const navigation = useNavigation()
	const { serviceName } = useLocalSearchParams()

	const [isLoading, setIsLoading] = useState(false)
	const [serviceProviders, setserviceProviders] = useState([])

	useEffect(() => {

		navigation.setOptions({
			headerShown: true,
			headerTitle: serviceName,
		})
		getServiceProviders()
	}, [])
	const getServiceProviders = async () => {
		setIsLoading(true)
		setserviceProviders([])
		const q = query(collection(db, 'Profile'), where("serviceName", '==', serviceName))
		const snapshot = await getDocs(q)
		snapshot.forEach((doc) => {
			setserviceProviders((prev) => [...prev, doc.data()])

		});
		setIsLoading(false)
	}

	return (
		<View style={{ display: 'flex', marginTop: 30 }}>
			{serviceProviders?.length > 0 && isLoading == false ?
				<FlatList
					data={serviceProviders}
					onRefresh={getServiceProviders}
					refreshing={isLoading}
					renderItem={({ item, index }) => (
						<ServiceProviderCard provider={item} />


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
						<Text>No Service Providers Found for </Text>
						<Text
							style={{
								fontFamily: 'outfit-Bold',
								fontSize: 16,
							}}>{serviceName} </Text>
					</View>
			}
		</View>
	)
}

export default ServiceProviders

const styles = StyleSheet.create({})