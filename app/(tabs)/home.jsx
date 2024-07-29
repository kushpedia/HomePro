import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Category from '../../components/Home/Category'
import Cleaningservices from '../../components/Home/Cleaningservices'
import Repairservices from '../../components/Home/RepairServices'


const home = () => {
	return (
		<ScrollView style={{

			flex: 1,
			marginTop: 20,
			marginLeft: 8,
			marginBottom: 20,
		}}
			showsVerticalScrollIndicator={false}>

			<Header />
			{/* <Text>Home</Text>
			<Text>Home2</Text> */}
			<Category />


			<Cleaningservices />
			<Repairservices />

		</ScrollView>
	)
}

export default home

const styles = StyleSheet.create({})