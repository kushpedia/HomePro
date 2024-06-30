import React from "react";
import { SafeAreaView, Text, StyleSheet, View, Button } from "react-native";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";

import Constants from "expo-constants"
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
		<View>
			<Button
				title="Sign Out"
				onPress={() => {
					signOut();
				}}
			/>
		</View>



	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	}
});

export default Logout