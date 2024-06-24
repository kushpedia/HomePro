import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

const TabLayout = () => {
	return (
		<Tabs screenOptions={{
			headerShown: false,
		}}>
			<Tabs.Screen name="home"
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
				}} />
			<Tabs.Screen name="booking" options={{
				tabBarLabel: 'Booking',
				tabBarIcon: ({ color }) => <Ionicons name="bookmarks" size={24} color={color} />

			}} />
			<Tabs.Screen name="chat" options={{
				tabBarLabel: 'Chat',
				tabBarIcon: ({ color }) => <Ionicons name="logo-wechat" size={24} color={color} />
			}} />
			<Tabs.Screen name="save" options={{
				tabBarLabel: 'Save',
				tabBarIcon: ({ color }) => <Ionicons name="save" size={24} color={color} />
			}} />
			<Tabs.Screen name="profile" options={{
				tabBarLabel: 'Profile',
				tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} />
			}} />
		</Tabs>
	)
}

export default TabLayout