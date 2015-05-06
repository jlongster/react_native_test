/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Text,
  View,
} = React;
var fetch = require('fetch');

var Post = React.createClass({
  render: function() {
    return <View style={[styles.container, styles.itemContainer]}>
      <Text style={styles.item}>{this.props.post.content}</Text>
    </View>;
  }
});

var List = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  },

  getDataSource: function(posts) {
    return this.state.dataSource.cloneWithRows(posts);
  },

  componentDidMount: function() {
    fetch(encodeURI('http://jlongster.com/api/posts?query={}'))
      .then(response => {
        response.json().then(posts => {
          this.setState({
            dataSource: this.getDataSource(posts)
          });
        });
      })
      .catch(function(err) {
        console.log('error', err);
      });

    // setTimeout(() => this.setState({ headerText: 'bye!' }), 1000);
  },

  selectPost: function(post) {
    this.props.navigator.push({
      title: post.title,
      component: Post,
      passProps: { post }
    });
  },

  renderRow: function(post) {
    return <TouchableHighlight onPress={() => this.selectPost(post)}>
      <Text style={styles.row}>{post.title}</Text>
    </TouchableHighlight>;
  },

  render: function() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>{this.state.headerText}</Text>
        </View>

        <ListView
          contentContainerStyle={styles.listItem}
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
});

var App = React.createClass({
  render: function() {
    return <NavigatorIOS
      style={styles.container}
      initialRoute={{
        title: 'Posts',
        component: List,
      }}
    />
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  header: {
    flex: 0,
    height: 200,
    backgroundColor: 'red',
    justifyContent: 'flex-end'
  },
  headerText: {
    fontSize: 20
  },
  list: {
    flex: 1
  },
  listItem: {
    margin: 20
  },
  row: {
    fontSize: 20,
    marginTop: 10
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    flex: 1,
    marginTop: 100,
    fontSize: 20
  }
});

AppRegistry.registerComponent('react_native_test', () => App);
