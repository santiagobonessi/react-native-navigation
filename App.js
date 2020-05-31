import React from 'react';
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
  headerTitle: <Logo/>,
  headerStyle: {
    backgroundColor: '#333',
  },
}

const DetailScreen = ({ navigation }) => {
  const userName = navigation.getParam('name', 'default value');
  return (
    <View style={styles.container}>
      <Text>Detail Screen!</Text>
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
    headerStyle: {
      backgroundColor: navigationOptions.headerStyle.backgroundColor,
    },
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
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
    height: 40,
    width: 40,
  }
});
