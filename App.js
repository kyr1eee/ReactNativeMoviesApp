/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList} from 'react-native';
import {getDouBanComedyData} from './API/douban';

const REQUEST_URL = "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";



export default class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          movies: [],
          loaded: false,
      };
      this.fetchMovieData = this.fetchMovieData.bind(this);
      this.renderMovieItem = this.renderMovieItem.bind(this);
  };

  componentDidMount() {
      this.fetchMovieData();
  }

  render() {
      if(!this.state.loaded) {
          return this.renderLoading()
      }
      return (
          <FlatList 
            data={this.state.movies}
            renderItem={this.renderMovieItem}
            keyExtractor={item => item.id}
            style={styles.item}
          />
      ) 
  }

  renderLoading() {
      return (
          <View style={styles.container}>
            <Text>loading...</Text>
          </View>
      );
  }

  renderMovieItem({ item }) {
      const movie = item;
      const actors = this.showActors(item.actors);
      return (
          <View style={styles.container}>
            <Image source={{uri: movie.cover_url}} style={styles.thumbnail} />
            <View style={styles.rightContainer}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.actor} numberOfLines={1}>{actors}</Text>
                <Text style={styles.year}>{movie.release_date} / {movie.regions[0]} / {movie.types[0]}</Text>
                <Text style={styles.score}>{movie.score}分</Text>
                <Text style={styles.vote}>{movie.vote_count}人评价</Text>
            </View>
          </View>
      );
  }

  fetchMovieData() {
    return getDouBanComedyData().then(data => {
        this.setState({
            movies: this.state.movies.concat(data),
            loaded: true
        });
    }).catch(e => {
        console.log(e);
    });
  }

  showActors(actors) {
      let ret = '';
      for(let i = 0;i < actors.length;i++) {
        ret += i !== 0 ? ` / ${actors[i]}` :  `${actors[i]}`;
      }
      return ret;
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: "#F5FCFF",
      paddingBottom: 10,
      fontSize: 12
  },
  thumbnail: {
      width: 200,
      height: 150,
  },
  rightContainer: {
      flex: 1,
      paddingLeft: 20,
      borderRadius: 1,
  },
  title: {
      fontSize: 15,
      textAlign: 'left',
      color: '#666699',
      paddingBottom: 12,
  },
  year: {
      textAlign: 'left',
      paddingBottom: 24,
  },
  actor: {
    paddingBottom: 10,
  },
  vote: {
  },
  score: {
    color: '#e09015',
    paddingBottom: 6,
  }
});