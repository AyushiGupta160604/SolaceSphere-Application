import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './screens/Home';
import About from './screens/About';
import Contact from './screens/Contact';
import Dashboard from './screens/Dashboard';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Services from './screens/Services';
import MoodTracking from './components/MoodTracking';
import GuidedMeditation from './components/GuidedMeditation';
import TherapistFinder from './components/TherapistFinder';
import RelaxingGames from './components/RelaxingGames';
import Pomodoro from './components/Pomodoro';
import Journal from './components/Journal';
import GoalSetting from './components/GoalSetting';
import MyJournal from './Features/MyJournal';
import MyPomodoro from './Features/MyPomodoro';
import MyTherapistFinder from './Features/MyTherapistFinder';
import TherapistDetail from './Features/TherapistDetail';
import AppointmentConfirmation from './Features/AppointmentConfirmation';
import Meditation from './Features/Meditation';
import Games from './Features/Games';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Signup" component={Signup} />
      <Drawer.Screen name="Login" component={Login} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Drawer">
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Services" component={Services} />
        <Stack.Screen name="MoodTracking" component={MoodTracking} />
        <Stack.Screen name="GuidedMeditation" component={GuidedMeditation} />
        <Stack.Screen name="TherapistFinder" component={TherapistFinder} />
        <Stack.Screen name="RelaxingGames" component={RelaxingGames} />
        <Stack.Screen name="Pomodoro" component={Pomodoro} />
        <Stack.Screen name="Journal" component={Journal} />
        <Stack.Screen name="GoalSetting" component={GoalSetting} />
        <Stack.Screen name="MyJournal" component={MyJournal} />
        <Stack.Screen name="MyPomodoro" component={MyPomodoro} />
        <Stack.Screen name="MyTherapistFinder" component={MyTherapistFinder} />
        <Stack.Screen name="TherapistDetail" component={TherapistDetail} />
        <Stack.Screen name="AppointmentConfirmation" component={AppointmentConfirmation} />
        <Stack.Screen name="Meditation" component={Meditation} />
        <Stack.Screen name="Games" component={Games} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}