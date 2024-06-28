import { ActivityIndicator, StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../configs/FirebaseConfig'
import { collection, getDocs, query, limit, where } from 'firebase/firestore'


const Repairservices = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [cleaningServices, setcleaningServices] = useState([])

	useEffect(() => {
		getcleaningServices()
	}, [])
	const getcleaningServices = async () => {
		setIsLoading(true)
		setcleaningServices([])
		try {
			const q = query(collection(db, 'Services'), where("category", '==', "Maintenance"))
			const querySnapshot = await getDocs(q)
			querySnapshot.forEach((doc) => {
				setcleaningServices((prev) => [...prev, doc.data()])
				setIsLoading(false)
			})
		} catch (err) {
			alert(err)
		}




	}
	return (
		<View>
			<View style={{
				padding: 10,
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				marginTop: 5,
			}}>
				<Text
					style={{
						fontFamily: 'outfit-Bold',
						fontSize: 16,

					}}>Repairing Services</Text>
				<Text
					style={{
						fontFamily: 'outfit-Medium'
					}}>View All</Text>

			</View>
			{cleaningServices?.length > 0 && isLoading == false ?
				< FlatList
					showsHorizontalScrollIndicator={false}
					horizontal={true}
					data={cleaningServices}
					renderItem={({ item, index }) => (
						<TouchableOpacity
							style={{ marginLeft: 10, marginTop: 10, shadow: { shadowColor: 'red', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 10, elevation: 25 } }}>
							<View style={{
								padding: 15,
								borderRadius: 10,
								marginRight: 15,
								backgroundColor: 'white',

							}}>
								<Image source={{ uri: item.imageUrl ? item.imageUrl : 'https://ocdn.eu/pulscms-transforms/1/ov6k9kpTURBXy82OWE2OWZmNWQxMDgwNGYzY2IxMmNiMjI3YzdhODQ1NS5qcGeSlQMAzFDNCgDNBaCTBc0DFs0Brt4AAqEwBqExAA' }}
									style={{
										width: 250,
										height: 150,
										borderRadius: 10,
									}} />
								<Text
									style={{
										textAlign: 'center',
										fontFamily: 'BreeSerif-Bold',
										fontSize: 13,
										marginTop: 4,
									}}
								>{item.name}</Text>



							</View>



						</TouchableOpacity>

					)}
				/> : < ActivityIndicator
					size='large'
					color='grey' />
			}

		</View>
	)
}

export default Repairservices