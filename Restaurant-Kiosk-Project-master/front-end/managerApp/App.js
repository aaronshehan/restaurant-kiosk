// Eric Fox

import Background from './assets/background.jpeg';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '@react-native-firebase/app';

import Home from './screens/HomeScreen';
import Login from './screens/Login';
import EmployeeManagement from './screens/employees/EmployeeManagement';
import Inventory from './screens/inventory/InventoryManagement';
import NewInventoryItem from './screens/inventory/newInventoryItem';
import VendorGuide from './screens/inventory/vendorGuide';
import MenuManagement from './screens/menu/MenuManagement';
import ManageTips from './screens/manageTips/manageTips';
import CompMeals from './screens/metrics/compMeals';
import MetricsPage from './screens/metrics/MetricsPage';
import TotalOrders from './screens/metrics/totalOrders';
import SignUp from './screens/SignUp';
import NewMenuItem from './screens/menu/newMenuItem';
import Beverages from './screens/menu/beverages';
import Appetizers from './screens/menu/appetizers';
import Entrees from './screens/menu/entrees';
import Desserts from './screens/menu/desserts';
import FiveDollar from './screens/menu/fiveDollar';
import AddCoupon from './screens/AddCoupon';

const Stack = createStackNavigator();

export function NavStack({ navigation }) {
  return (
     <Stack.Navigator initialRouteName="Home">

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: 'Login', headerStyle: {height: 70},
                                   headerTitleAlign: 'center'}}
      />

      <Stack.Screen
              name="Beverages"
              component={Beverages}
              options={{ title: 'Beverages', headerStyle: {height: 70},
                                         headerTitleAlign: 'center'}}
            />

      <Stack.Screen
                    name="AddCoupon"
                    component={AddCoupon}
                    options={{ title: 'Add Coupon', headerStyle: {height: 70},
                                               headerTitleAlign: 'center'}}
                  />

      <Stack.Screen
              name="Appetizers"
              component={Appetizers}
              options={{ title: 'Appetizers', headerStyle: {height: 70},
                                         headerTitleAlign: 'center'}}
            />

      <Stack.Screen
              name="Entrees"
              component={Entrees}
              options={{ title: 'Entrees', headerStyle: {height: 70},
                                               headerTitleAlign: 'center'}}
           />
      <Stack.Screen
              name="FiveDollar"
              component={FiveDollar}
              options={{ title: 'Five Dollar', headerStyle: {height: 70},
                                         headerTitleAlign: 'center'}}
            />
      <Stack.Screen
              name="Desserts"
              component={Desserts}
              options={{ title: 'Desserts', headerStyle: {height: 70},
                                         headerTitleAlign: 'center'}}
            />

      <Stack.Screen
              name="NewMenuItem"
              component={NewMenuItem}
              options={{ title: 'New Menu Item', headerStyle: {height: 70},
                                         headerTitleAlign: 'center'}}
      />

      <Stack.Screen
        name="NewInventoryItem"
        component={NewInventoryItem}
        options={{ title: 'NewInventoryItem', headerStyle: {height: 70},
                                                headerTitleAlign: 'center'}}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: 'SignUp', headerStyle: {height: 70},
                                   headerTitleAlign: 'center'}}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home' , headerStyle: {height: 70},
                                   headerTitleAlign: 'center'}}

      />
      <Stack.Screen
       name="EmployeeManagement"
       component={EmployeeManagement}
       options={{ title: 'EmployeeManagement' , headerStyle: {height: 70},
                                                headerTitleAlign: 'center'}}
      />
      <Stack.Screen
       name="Inventory"
       component={Inventory}
       options={{ title: 'Inventory' , headerStyle: {height: 70},
                                       headerTitleAlign: 'center'}}
      />

      <Stack.Screen
        name="VendorGuide"
        component={VendorGuide}
        options={{ title: 'Vendor Resupply Guide' , headerStyle: {height: 70},
                                                    headerTitleAlign: 'center'}}
      />

      <Stack.Screen
        name="MenuManagement"
        component={MenuManagement}
        options={{ title: 'Menu Management' , headerStyle: {height: 70},
                                              headerTitleAlign: 'center'}}
      />

      <Stack.Screen
        name="ManageTips"
        component={ManageTips}
        options={{ title: 'Manage Tips/Transaction Data' , headerStyle: {height: 70},
                                          headerTitleAlign: 'center'}}
      />

      <Stack.Screen
        name="CompMeals"
        component={CompMeals}
        options={{ title: 'Compensated Meals' , headerStyle: {height: 70},
                                                headerTitleAlign: 'center'}}
      />

      <Stack.Screen
        name="MetricsPage"
        component={MetricsPage}
        options={{ title: 'MetricsPage' , headerStyle: {height: 70},
                                          headerTitleAlign: 'center'}}
      />

    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <NavStack />
    </NavigationContainer>
  );
}