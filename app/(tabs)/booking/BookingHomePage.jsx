import {
	StyleSheet, Text, View, TextInput,
	TouchableOpacity
} from 'react-native'
import React from 'react'
import BookingHeader from '../../../components/booking/BookingHeader'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const BookingHomePage = () => {
	const navigation = useNavigation();
	const handleNavigate = () => {
		navigation.navigate('AddTasksPage');
	};
	return (
		<View style={styles.container}>
			<BookingHeader />
			<TouchableOpacity
				onPress={handleNavigate}
				style={styles.touchableOpacity}
			><Text
				style={styles.postText}
			>Post A Task</Text>
				<Ionicons name="chevron-forward" size={24} color="black" />
			</TouchableOpacity>
		</View>
	)
}

export default BookingHomePage

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		marginTop: 38,
	},
	touchableOpacity: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'space-between',
		justifyContent: 'center',
		padding: 10,
		gap: 80,
		width: '85%',
		height: 50,
		backgroundColor: '#00bbf0',
		borderRadius: 10,
		marginTop: 20,
		marginHorizontal: 20,
	},
	postText: {
		fontFamily: 'merriweather-BoldItalic',
		fontSize: 16,
	}
})