import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from "expo-secure-store";

const Logout = () => {
	const tokenCache = {
		getToken(key) {
			try {
				return SecureStore.getItemAsync(key);
			} catch (err) {
				return null;
			}
		},
		saveToken(key, value) {
			try {
				return SecureStore.setItemAsync(key, value);
			} catch (err) {
				return null;
			}
		},
	};

	const { isLoaded, signOut } = useAuth();
	return (

		<TouchableOpacity
			style={{
				display: 'flex',
				flexDirection: 'row',
				alighnItems: 'center',
				justifyContent: 'space-between',
				backgroundColor: "blue",
				borderRadius: 10,
				height: 50,
				marginTop: 40,
				padding: 10,
				marginHorizontal: 80,
			}}

			onPress={() => {
				signOut();
			}}
		>
			<Text
				style={{
					textAlign: "center",
					color: "white",
					fontSize: 24,
					fontFamily: "outfit-Bold",
				}}> Log Out</Text><Ionicons name="exit-outline" size={32} color="white"
					style={{ marginRight: 10 }} />
		</TouchableOpacity>




	);
};



export default Logout