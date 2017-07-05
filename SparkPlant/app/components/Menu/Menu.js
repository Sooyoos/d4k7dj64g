import React, { Component } from 'react';
import {
    View,
    Text,
    Switch,
    StyleSheet,
    AsyncStorage,
    Image
} from 'react-native';
import { DrawerItems } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

let styles = StyleSheet.create({
    menu: {
        flex:1,
        backgroundColor:'#ffffff',
    },
    menuHeader : {
        height:250,
        backgroundColor: '#3f51b5',
        padding:20,
    },
    menuHeaderIconView : {
        height: 80,
        marginTop: 20,
        flexDirection : 'row',
    },
    menuHeaderIcon : {
        color : '#ffffff',
        fontSize : 30,
        marginRight : 10,
    },
    menuHeaderIconText : {
        fontSize : 20,
        color : '#ffffff',
    },
    menuHeaderUserInfosView : {
        height: 80,
        marginTop: -30,
        flexDirection : 'row',
    },
    menuHeaderUserImage : {
        borderRadius : 40,
        width : 80,
        height: 80,
        marginRight : 15,
    },
    menuHeaderUsername : {
        color : '#ffffff',
        fontSize : 30,
    },
    menuHeaderUserEmail : {
        color : '#ffffff',
        fontSize : 20,
    },
    menuHeaderAvailableView : {
        height:80,
        flexDirection : 'row',
    },
    menuHeaderAvailableSwitch : {
        flex : 4,
    },
    menuHeaderAvailableSwitchLabel : {
        color:'#ffffff',
        fontSize : 20,
        flex : 4,
        marginTop : 20,
    },
});

export default class DrawerMenu extends Component {
    constructor(props)
    {
        super(props);
        this.state = {userAvailable: true};
    }

    setUserAvailable(value) {
        AsyncStorage.setItem('@SparkPlant:userIsAvailable', JSON.stringify(value));
        this.setState({userAvailable: value});
    }

    render() {
        return (
            <View style={styles.menu}>
                <View style={styles.menuHeader}>
                    <View style={styles.menuHeaderIconView}>
                        <Icon style={styles.menuHeaderIcon} name="star" />
                        <Text style={styles.menuHeaderIconText}>
                            1142 points
                        </Text>
                    </View>
                    <View style={styles.menuHeaderUserInfosView}>
                        <Image style={styles.menuHeaderUserImage} source={{ uri : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'}}/>
                        <View>
                            <Text style={styles.menuHeaderUsername}>
                            John Doe
                            </Text>
                            <Text style={styles.menuHeaderUserEmail}>
                                john.doe@example.org
                            </Text>
                        </View>
                    </View>
                    <View style={styles.menuHeaderAvailableView}>
                        <Text style={styles.menuHeaderAvailableSwitchLabel}>
                            Disponible
                        </Text>
                        <Switch style={styles.menuHeaderAvailableSwitch} value={this.state.userAvailable} onValueChange={(value) => this.setUserAvailable(value)} onTintColor={'#c5cae9'} thumbTintColor={'#00bcd4'}/>
                    </View>
                </View>
                <View>
                    <DrawerItems {...this.props} />
                </View>
            </View>
            );
    }
};