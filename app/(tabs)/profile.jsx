import { View, Text, ScrollView, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../components/Profile/Header'
import { Ionicons } from '@expo/vector-icons';
import Logout from '../../components/Logout';
import { useRouter } from 'expo-router';
import PersonalDetails from '../../components/Profile/PersonalDetails';

const profile = () => {
	const router = useRouter()
	const onPressPersonalDetails = () => {

		<PersonalDetails />

	}
	return (
		<ScrollView
			showsVerticalScrollIndicator={false}>
			<Header />
			{/* profile details */}
			<View style={styles.container}
				onPress={onPressPersonalDetails}>
				<View style={styles.view}>
					<Ionicons name={'person'} size={36} color="black"
						style={styles.icons} />
					<Text
						style={styles.textDetails}>Profile Details</Text>
				</View>
				<View>
					<Ionicons name="chevron-forward-sharp" size={32} color="black" />
				</View>
			</View>
			{/* change password */}
			<TouchableOpacity style={styles.container}>
				<View style={styles.view}>
					<Ionicons name={'lock-closed'} size={36} color="black"
						style={styles.icons} />
					<Text
						style={styles.textDetails}>Change Password</Text>
				</View>
				<View>
					<Ionicons name="chevron-forward-sharp" size={32} color="black" />
				</View>
			</TouchableOpacity>
			{/* services */}
			<TouchableOpacity style={styles.container}>
				<View style={styles.view}>
					<Ionicons name={'card'} size={36} color="black"
						style={styles.icons} />
					<Text
						style={styles.textDetails}>My Services</Text>
				</View>
				<View>
					<Ionicons name="chevron-forward-sharp" size={32} color="black" />
				</View>
			</TouchableOpacity>
			{/* history */}
			<TouchableOpacity style={styles.container}>
				<View style={styles.view}>
					<Ionicons name={'time-sharp'} size={36} color="black"
						style={styles.icons} />
					<Text
						style={styles.textDetails}>History</Text>
				</View>
				<View>
					<Ionicons name="chevron-forward-sharp" size={32} color="black" />
				</View>
			</TouchableOpacity>
			{/* contact us */}
			<TouchableOpacity style={styles.container}>
				<View style={styles.view}>
					<Ionicons name={'mail'} size={36} color="black"
						style={styles.icons} />
					<Text
						style={styles.textDetails}>Contact Us</Text>
				</View>
				<View>
					<Ionicons name="chevron-forward-sharp" size={32} color="black" />
				</View>
			</TouchableOpacity>

			<Logout />
		</ScrollView>
	)
}

export default profile

const styles = StyleSheet.create({

	container: {
		display: 'flex',
		flexDirection: 'row',
		padding: 10,
		justifyContent: 'space-between',
		borderWidth: 1,
		borderColor: 'grey',
		marginHorizontal: 6,
		marginTop: 10,
		borderRadius: 10,
	},
	icons: {
		backgroundColor: '#f0ffff',
		borderRadius: 10,
	},
	view: {
		display: 'flex',
		flexDirection: 'row',
		padding: 10,
		gap: 20,
		justifyContent: 'space-between',
	},
	textDetails: {
		fontFamily: 'outfit-Bold',
		textAlign: 'center',
		fontSize: 18,
	}
})