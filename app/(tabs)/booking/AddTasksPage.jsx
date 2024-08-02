import {
	StyleSheet, Text,
	View, ScrollView, TextInput,
	ActivityIndicator, Button
} from 'react-native'
import React, { useState, useEffect } from 'react'
import InputField from '../../../components/booking/InputField'
import { collection, query, getDocs, where, addDoc, orderBy, limit } from 'firebase/firestore'
import { db } from '../../../configs/FirebaseConfig'
import RNPickerSelect from 'react-native-picker-select';
const AddTasksPage = () => {
	const [categories, setCategories] = useState([]);
	const [services, setServices] = useState([]);
	const [serviceCategory, setServiceCategory] = useState('');
	const [pickedService, setPickedService] = useState('');
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const fetchCategories = async () => {
			setLoading(true);
			try {
				const q = query(collection(db, 'Category'))
				const snapshot = await getDocs(q)
				const categoryList = snapshot.docs.map(doc => ({
					label: doc.data().name,
					value: doc.data().name
				}));
				setCategories(categoryList);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching categories: ', error);
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);


	useEffect(() => {
		const fetchServices = async () => {
			setLoading(true);
			try {
				const q = query(collection(db, 'Services'))
				const snapshot = await getDocs(q)
				const serviceList = snapshot.docs.map(doc => ({
					label: doc.data().name,
					value: doc.data().name
				}));
				setServices(serviceList);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching categories: ', error);
				setLoading(false);
			}
		};

		fetchServices();
	}, []);



	return (
		<ScrollView>
			<View style={{
				display: 'flex',
				alignItems: 'center',
				marginTop: 10,
			}}>
				<Text style={{
					fontFamily: 'merriweather-Bold',
					fontSize: 20,
				}}>Enter Task Details</Text>
			</View >
			<View style={styles.formContainer}>

				{loading ? (
					<ActivityIndicator size="large" color="#0000ff" />
				) : (
					<View style={styles.formSelectField}>

						<RNPickerSelect

							onValueChange={value => setServiceCategory(value)}
							items={categories}
							placeholder={{ label: 'Select a category', value: null }}

						/>
					</View>
				)}
				{loading ? (
					<ActivityIndicator size="large" color="#0000ff" />
				) : (
					<View style={styles.formSelectField}>

						<RNPickerSelect

							onValueChange={value => setPickedService(value)}
							items={services}
							placeholder={{ label: 'Select Services', value: null }}

						/>
					</View>
				)}

				<InputField
					placeholder='Enter task name' />
				<InputField
					placeholder='Enter Your location' />

				<Button title="Submit Task" onPress={() => console.log(serviceCategory, pickedService)} />
			</View>

		</ScrollView >
	)
}

export default AddTasksPage

const styles = StyleSheet.create({
	formContainer: {
		display: 'flex',
		gap: 30,
		width: '85%',
		marginHorizontal: 'auto',
		backgroundColor: '#fff',
		padding: 10,
		paddingBottom: 60,
		borderRadius: 10,
		marginTop: 20,

	},
	formSelectField: {
		height: 50,
		width: '90%',
		borderColor: '#347474',
		borderWidth: 1,
		borderRadius: 8,
		paddingLeft: 16,
		backgroundColor: '#fff',
		shadowColor: '#00bbf0',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 5,
	},


})