import { Stack } from 'expo-router';

export default function BookingLayout() {
	return (
		<Stack>
			<Stack.Screen name="BookingHomePage" options={{ headerShown: false }} />
			<Stack.Screen name="AddTasksPage" options={{ title: '' }} />
		</Stack>
	);
}