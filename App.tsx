import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import Wrapped from "./Wrapped";
import Config from 'react-native-config';

export default function App() {
  return (
      <Provider store={store}>
              <Wrapped />
      </Provider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
