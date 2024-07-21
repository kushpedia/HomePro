import { Stack } from 'expo-router';

export default function ChatLayout() {
	return (
		<Stack>
			<Stack.Screen name="ConversationsHomePage" options={{ headerShown: false }} />
			<Stack.Screen name="GroupedMessages" options={{ title: 'Inbox' }} />
		</Stack>
	);
}