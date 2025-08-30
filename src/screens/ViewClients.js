import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import Head from '../components/Head';
import ClientComponent from '../components/ClientComponent';
import { useEffect, useState } from 'react';
import { CheckToken } from '../middleware/CheckToken';

export default function ViewClients({ navigation }) {
	// check if user is logged in
	const [isLoggedIn, setIsLoggedIn] = useState('first');

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			console.log('refreshed');
			checkInitialToken();
		});
		return unsubscribe;
	}, [navigation]);

	const checkInitialToken = async () => {
		const hasToken = await CheckToken();
		console.log(hasToken);
		setIsLoggedIn(hasToken);
	};

	useEffect(() => {
		if (!isLoggedIn && isLoggedIn !== 'first') {
			navigation.navigate('SignIn');
		}
	}, [isLoggedIn]); //user verification ends here

	const [clients, setClients] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch(`${process.env.EXPO_PUBLIC_API_URL}/clients`)
			.then((response) => response.json())
			.then((res) => {
				setClients(res.data.clients);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleDelete = (id) => {
		const updatedCLients = clients.filter((client) => client._id !== id);
		setClients(updatedCLients);
	};

	const handleNavigation = () => {
		navigation.navigate('AddClient');
	};

	const loadClients = () => {
		if (isLoading) {
			return <ActivityIndicator size="large" color="#65B741" />;
		}

		return (
			<View className="w-full flex items-center relative">
				{clients.map((client) => (
					<ClientComponent client={client} handleDelete={handleDelete} key={client._id} />
				))}
			</View>
		);
	};

	return isLoggedIn ? (
		<View className="mt-10 w-screen">
			{/* <Head /> */}
			<View className="ml-7 w-screen">
				<Text className="mt-8 text-2xl tracking-wider">List of Clients</Text>
			</View>
			<View className="w-screen flex items-center mt-8">
				<View className="w-11/12">
					{loadClients()}
					<View className="absolute top-full left-10 mt-4">
						<TouchableOpacity className="bg-green p-3 rounded-lg" onPress={handleNavigation}>
							<Text className="text-white">Add Client</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	) : (
		<View styles={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size="large" color="#0000ff" />
		</View>
	);
}
