import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import * as WebBrowser from "expo-web-browser";
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from './../hooks/useWarmUpBrowser';
WebBrowser.maybeCompleteAuthSession();

const Login = () => {
	useWarmUpBrowser();
	const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

	const onContinuePress = React.useCallback(async () => {
		try {
			const { createdSessionId, signIn, signUp, setActive } =
				await startOAuthFlow();

			if (createdSessionId) {
				setActive({ session: createdSessionId });
			} else {
				// Use signIn or signUp for next steps such as MFA
			}
		} catch (err) {
			console.error("OAuth error", err);
		}
	}, []);
	return (
		<View style={{
			flex: 1,


		}}>
			<View>
				<View
					style={{
						display: 'flex',
						marginTop: 50,
						display: 'flex',
						position: 'absolute',
						zIndex: 1,
						marginLeft: 20,

					}}>
					<Text
						style={{
							fontSize: 70,
							fontWeight: 'bold',
							color: 'white',

							fontStyle: 'italic',

						}}>Your Home, Our Priority </Text>
					<Text
						style={{
							fontSize: 18,
							color: 'white',
							fontWeight: 'bold',
							fontStyle: 'italic',
							marginTop: 10,
							marginLeft: 50,
						}}>Bringing Quality Home Services To You</Text>
				</View>

				<View style={{

					height: 610,
					width: 380,
					marginHorizontal: 10,
					marginTop: 20,
				}}>
					<Image source={require('./../assets/images/homeservices.png')}
						style={{
							width: '100%',
							height: '100%',

							borderRadius: 20,
						}}
					/>
				</View>

			</View>
			<TouchableOpacity
				onPress={onContinuePress}
				style={{
					display: 'flex',
					flexDirection: 'row',
					gap: 10,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'lightgrey',
					width: 390,
					marginHorizontal: 10,
					height: 70,
					borderWidth: 1,
					borderColor: 'blue',
					borderRadius: 10,
					position: 'absolute',
					zIndex: 2,
					marginTop: 700,

				}}>
				<Image
					source={require('./../assets/images/googleIcon.png')} />
				<Text
					style={{
						color: 'blue',
						fontSize: 24,
						fontWeight: 'bold',
						fontFamily: 'outfit-Bold',

					}}>Get Started With Google</Text>

			</TouchableOpacity>

		</View>
	)
}

export default Login