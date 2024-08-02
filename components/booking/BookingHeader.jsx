import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BookingHeader = () => {
	return (
		<View style={{
			display: 'flex',
			alignItems: 'center',

		}}>
			<Text style={{
				fontFamily: 'merriweather-Bold',
				fontSize: 20,
			}}>My Tasks</Text>
		</View >
	)
}

export default BookingHeader

const styles = StyleSheet.create({})