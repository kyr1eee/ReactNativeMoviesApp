import React, { component } from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

const MOCKED_MOVIES_DATA = [
    {
      title: '肖申克的救赎',
      year: '1990',
      posters: { thumbnail: "http://i.imgur.com/UePbdph.jpg"}
    }
  ];
  
export class Movie extends component {
    render() {
        const movie = MOCKED_MOVIES_DATA[0];
        return (
            <View style={styles.container}>
                <Text>{movie.title}</Text>
                <Text>{movie.year}</Text>
                <Image source={{url: movie.posters.thumbnail}} style={styles.thumbnail} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: center,
        alignItems: center,
        backgroundColor: "#F5FCFF",
    },
    thumbnail: {
        width: 80,
        height: 80,
    },
});
