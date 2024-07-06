import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'


const ServicesItem = ({ services }) => {
	const router = useRouter()

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
					<Text numberOfLines={3}
						ellipsizeMode="tail"
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
					<TouchableOpacity style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: 8,
						borderRadius: 10,
						borderWidth: 1,
						borderColor: 'grey',
						margintop: 4,
					}}

						onPress={() => router.push(`/serviceProviders/` + services.name)}

					>

						<Text
							style={{
								fontFamily: 'outfit-Bold',
								fontSize: 16,
								textAlign: 'center',
								color: '#007cb9',
							}}>Service Providers </Text>
					</TouchableOpacity>

				</View>
			</View>





		</View >
	)
}

export default ServicesItem