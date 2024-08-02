import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const InputField = ({ placeholder }) => {


	return (
		<TextInput
			multiline={true} placeholder={placeholder}
			style={styles.formTextInput} />
	)
}

export default InputField

const styles = StyleSheet.create({
	formTextInput: {
		height: 50,
		width: '90%',
		borderColor: '#347474',
		borderWidth: 1,
		borderRadius: 8,
		paddingLeft: 16,
		backgroundColor: '#fff',
		shadowColor: '#00bbf0',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 5,
	},
})