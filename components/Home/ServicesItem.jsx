import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, query, getDocs, where } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'

const ServicesItem = ({ services, onServicePress }) => {


	return (

		<View
			style={{
				display: 'flex',
				flexDirection: 'row',
				backgroundColor: 'white',


			}}>
			<View style={{
				padding: 15,
				borderRadius: 10,
				marginRight: 2,


			}}>
				<Image source={{ uri: services.imageUrl ? services.imageUrl : 'https://ocdn.eu/pulscms-transforms/1/ov6k9kpTURBXy82OWE2OWZmNWQxMDgwNGYzY2IxMmNiMjI3YzdhODQ1NS5qcGeSlQMAzFDNCgDNBaCTBc0DFs0Brt4AAqEwBqExAA' }}
					style={{
						width: 180,
						height: 120,
						borderRadius: 10,
					}} />
			</View>
			<View >
				<View>
					<Text
						style={{

							textAlign: 'center',
							fontFamily: 'outfit-Bold',
							fontSize: 18,
							marginTop: 20,
						}}
					>{services.name}</Text>
				</View>

				<View style={{ flexDirection: 'row' }}>
					<Text
						style={{
							flex: 1,
							flexWrap: 'wrap',

							fontFamily: 'outfit-Medium',
							textAlign: 'left',
							fontSize: 16,
							marginTop: 2,
						}}
					>{services.description}</Text>
				</View>

				<View style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginTop: 5,

				}}>
					<View style={{
						display: 'flex',
						flexDirection: 'row',
						gap: 5
					}}>


					</View>

				</View>
			</View>





		</View>
	)
}

export default ServicesItem