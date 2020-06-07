import React, {useEffect, useState, Children} from 'react';
import {Ionicons} from '@expo/vector-icons';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { createAppContainer, NavigationContext, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

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
        title='Open drawer'
        onPress={() => navigation.openDrawer()}
      ></Button>
    </View>
  );
}

HomeScreen.navigationOptions = {
  title: 'Home',
  drawerIcon: ({tintColor}) => { 
  return <Ionicons name='ios-information-circle' size={24} color={tintColor}/> 
  }, 
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
    drawerIcon: ({tintColor}) => { 
      return <Ionicons name='ios-options' size={24} color={tintColor}/> 
    }, 
    headerRight: () => 
      <Button
      onPress={navigation.getParam('increase')}
      title={'+ 1'}
      color={'#ffe'}
      />
  }
}

const AppNavigator = createDrawerNavigator(
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
