import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      loading: false,
      product: [],
      url: 'http://192.168.0.130:3000/product/'
    }
  }

  componentDidMount(){
    this.getProducts();
  }

  getProducts = () => {
    this.setState({loading: true})

    fetch(this.state.url)
    .then(res => res.json())
    .then(res => {
      this.setState({
        product: res.products,
        loading: false
      })
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error;
    });
  }

  render(){
    if (this.state.loading){
      return (
        <View style={styles.container}>
          <Text>Products are loading</Text>
        </View>
      );
    }
    return(
        <View style={styles.list}>
          <FlatList
            data={this.state.product}
            renderItem={
              ({item}) => <Text style={styles.cardview}> {item.product_name}{"\n"}{item.stock} </Text>
            }
            keyExtractor={(item, index) => index.toString()} 
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    paddingTop: 50,
  },
  cardview: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'black'
  }
});
