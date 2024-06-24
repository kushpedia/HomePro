import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Category from '../../components/Home/Category'
import Cleaningservices from '../../components/Home/Cleaningservices'


const home = () => {
	return (
		<View style={{
			flex: 1,
			marginTop: 20,
			marginLeft: 8,
		}}>

			<Header />

			<Category />

			<Cleaningservices />


		</View>
	)
}

export default home

const styles = StyleSheet.create({})