import React, {useEffect, useState, Children} from 'react';
import {Ionicons} from '@expo/vector-icons';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { createAppContainer, NavigationContext, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

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
  title: 'Home',
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
      <Button
        title='Back'
        onPress={() => navigation.navigate('Modal')}
      ></Button>
    </View>
  );
}

DetailScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('title', 'Loading...'),
    headerRight: () => 
      <Button
      onPress={navigation.getParam('increase')}
      title={'+ 1'}
      color={'#ffe'}
      />
  }
}

const AppNavigator = createBottomTabNavigator(
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
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const {routeName} =  navigation.state; 
          let iconName
          if(routeName === 'Home'){
            iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          } else {
            iconName = `ios-options`;
          }
          return <Ionicons name={iconName} size={20} tintColor={tintColor}/>
        },
        tabBarOptions: {
          activeTintColor: navigation.state.routeName === 'Home' ? '#e91e63' : 'orange',
          inactiveTintColor: '#333',
          labelStyle: {
            fontSize: 18
          },
          style: {
            backgroundColor: '#fec',
          }
        }
      }
    )
  }
)

const RootStack = createStackNavigator(
  {
    Main: AppNavigator,
    Modal: () => <Text>LALALA</Text>
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)

export default createAppContainer(RootStack)

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
