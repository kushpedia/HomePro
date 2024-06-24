import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'


const home = () => {
	return (
		<View style={{
			flex: 1,
			marginTop: 20,
			marginLeft: 8,
		}}>

			<Header />


			<Text>homes</Text>
		</View>
	)
}

export default home

const styles = StyleSheet.create({})