import React, {useEffect, useState, Children} from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { createAppContainer, NavigationContext } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const Logo = () => {
  return (
  <Image 
  source={require('./assets/sils_icon.png')}
  style={styles.image}
  >
  </Image>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen!</Text>
      <Button
        title='Go to detail'
        onPress={() => navigation.navigate('Detail', { name: 'Santiago', user_id: '10' })}
      ></Button>
    </View>
  );
}

HomeScreen.navigationOptions = {
  title: 'Main',
  headerLeft: () => <Text> LEFT HEADER </Text>,
  headerTitle: () => <Logo/>,
  headerStyle: {
    backgroundColor: '#333',
  },
}

const DetailScreen = ({ navigation }) => {
  const [count, setCount] = useState(0);
  const increase = () => setCount(count + 1);
  
  useEffect(() => {
    navigation.setParams({ increase })
  }, [count])

  const userName = navigation.getParam('name', 'default value');
  return (
    <View style={styles.container}>
      <Text>Detail Screen! Count: {count}</Text>
      <Text>User Name: {userName}</Text>
      <Button
        title='USER NAME'
        onPress={() => navigation.setParams({ title: 'User: Santiago' })}
      ></Button>
    </View>
  );
}

DetailScreen.navigationOptions = ({ navigation, navigationOptions }) => {
  return {
    title: navigation.getParam('title', 'Loading...'),
    headerRight: () => 
      <Button
      onPress={navigation.getParam('increase')}
      title={'+ 1'}
      color={'#ffe'}
      />,
    headerStyle: {
      backgroundColor: navigationOptions.headerStyle.backgroundColor,
    },
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerRight: () => 
        <Text>HEADER RIGHT</Text>
      }
    },
    Detail: {
      screen: DetailScreen,
    }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#bbb',
      },
      headerTintColor: '#ffe',
      headerTitleStyle: {
        fontSize: 30,
        fontWeight: '400'
      }
    }
  }
)

export default createAppContainer(AppNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 35,
    width: 35,
  },
});
