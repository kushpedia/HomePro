import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../configs/FirebaseConfig'
import { collection, getDocs, query } from 'firebase/firestore'
import CategoryItem from './CategoryItem'

const Category = () => {
	useEffect(() => {
		getCategoryList()
	}, [])
	const [categoryList, setCategoryList] = useState([])
	const getCategoryList = async () => {
		setCategoryList([])
		const q = query(collection(db, 'Category'))
		const querySnapshot = await getDocs(q)
		querySnapshot.forEach((doc) => {
			setCategoryList((prev) => [...prev, doc.data()])
		})

	}


	return (
		<View>
			<View style={{
				padding: 10,
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				marginTop: 4,
			}}>
				<Text
					style={{
						fontFamily: 'BreeSerif-Regular',
						fontSize: 16,

					}}>Categories</Text>
				<Text
					style={{
						fontFamily: 'outfit-Medium',
						marginBottom: 2,
					}}>View All</Text>
			</View>
			<FlatList
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				data={categoryList}
				renderItem={({ item, index }) => (
					<CategoryItem category={item}
					/>
				)}
			/>
		</View>
	)
}

export default Category