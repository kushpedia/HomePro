import { ActivityIndicator, View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../configs/FirebaseConfig'
import { collection, getDocs, query } from 'firebase/firestore'
import CategoryItem from './CategoryItem'
import { useRouter } from 'expo-router'


const Category = () => {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	useEffect(() => {
		getCategoryList()
	}, [])
	const [categoryList, setCategoryList] = useState([])
	const getCategoryList = async () => {
		setIsLoading(true)
		setCategoryList([])
		const q = query(collection(db, 'Category'))
		const querySnapshot = await getDocs(q)
		querySnapshot.forEach((doc) => {
			setCategoryList((prev) => [...prev, doc.data()])
			setIsLoading(false)
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

			{categoryList?.length > 0 && isLoading == false ?
				<FlatList
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					data={categoryList}
					renderItem={({ item, index }) => (
						<CategoryItem category={item}
							onPress={() => router.push(`/servicesList/` + item.name)}
						/>
					)}
				/> : < ActivityIndicator
					size='large'
					color='grey' />
			}
		</View>
	)
}

export default Category