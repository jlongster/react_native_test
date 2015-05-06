
var Post = React.createClass({
  render: function() {
    return <View style={[styles.container, styles.itemContainer]}>
      <Text style={styles.item}>{this.props.post.content}</Text>
    </View>;
  }
});

module.exports = Post;
