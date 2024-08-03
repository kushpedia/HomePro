import {
	StyleSheet, Text,
	View, ScrollView, TextInput,
	ActivityIndicator, Button, ToastAndroid, Dimensions
} from 'react-native'
import React, { useState, useEffect } from 'react'
import InputField from '../../../components/booking/InputField'
import { collection, query, getDocs, where, addDoc, orderBy, limit } from 'firebase/firestore'
import { db } from '../../../configs/FirebaseConfig'
import RNPickerSelect from 'react-native-picker-select';
import { useUser } from '@clerk/clerk-expo'
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
const AddTasksPage = () => {
	const { user } = useUser()
	const LoggedEmail = user?.primaryEmailAddress?.emailAddress
	const [location, setLocation] = useState(null);
	const [pickedLocation, setPickedLocation] = useState(null);
	const [categories, setCategories] = useState([]);
	const [services, setServices] = useState([]);
	const [serviceCategory, setServiceCategory] = useState('');
	const [pickedService, setPickedService] = useState('');
	const [loading, setLoading] = useState(false);
	const [taskDescription, setTaskDescription] = useState('')
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

	const handleSubmit = async () => {

		const docRef = collection(db, "Tasks")
		const data = {
			category: serviceCategory,
			service: pickedService,
			date: new Date().toISOString(),
			taskDescription: taskDescription,
			latitude: pickedLocation.latitude,
			longitude: pickedLocation.longitude,
			status: 'Open',
			postedBy: LoggedEmail,
		}
		await addDoc(docRef, data)
		ToastAndroid.show("Task Posted", ToastAndroid.TOP)
	}
	const getLocation = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			console.log('Permission to access location was denied');
			return;
		}

		const loc = await Location.getCurrentPositionAsync({});
		setLocation({
			latitude: loc.coords.latitude,
			longitude: loc.coords.longitude,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		});
	};

	useEffect(() => {
		getLocation();
	}, []);
	const pickLocationHandler = (event) => {
		setPickedLocation({
			latitude: event.nativeEvent.coordinate.latitude,
			longitude: event.nativeEvent.coordinate.longitude,
		});
	};

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

				{/* <InputField
					placeholder='Enter task name' />
				<InputField
					placeholder='Enter Your location' /> */}

				<TextInput placeholder='Description'
					multiline={true}
					style={styles.formSelectField}
					value={taskDescription}
					onChangeText={(text) => setTaskDescription(text)} />

				<View style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center'
				}}>
					<Text style={{
						fontFamily: 'merriweather-Bold',
						fontSize: 14,
						marginBotton: 10,
					}}>Select Location</Text>
					{location ? (
						<MapView
							style={{
								width: Dimensions.get('window').width * 0.9,
								height: Dimensions.get('window').height * 0.3,
							}}
							initialRegion={location}
							onPress={pickLocationHandler}
						>
							{pickedLocation && (
								<Marker coordinate={pickedLocation} />
							)}
						</MapView>
					) : (
						<Text>Fetching location...</Text>
					)}

				</View>

				<Button title="Submit Task" onPress={handleSubmit} />

			</View>


		</ScrollView >
	)
}

export default AddTasksPage

const styles = StyleSheet.create({
	formContainer: {
		display: 'flex',
		gap: 30,
		width: '95%',
		marginHorizontal: 'auto',
		backgroundColor: '#D78D76',
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