import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,
        Button, FlatList } from 'react-native'

const CustomDrawer = (props) => {
    return(
        <View style={styles.screen}>
            <Text> DRAWER </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        top: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        width: '100%',
        paddingVertical: 25,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default CustomDrawer;