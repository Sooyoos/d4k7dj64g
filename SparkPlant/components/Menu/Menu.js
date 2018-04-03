import React, { Component } from 'react';
import {
    View,
    Text,
    Switch,
    StyleSheet,
    AsyncStorage,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as layout from "../../assets/layout";
import Navigation from "./Navigation";

let styles = StyleSheet.create({
    menu: {
        flex : 1,
        backgroundColor:'#ffffff',
    },
    menuHeader : {
        flex : 4,
        backgroundColor: '#3f51b5',
        paddingVertical: layout.height3,
        paddingHorizontal: layout.width5,
    },
    menuHeaderIconView : {
        width : layout.width60,
        height: layout.height8,
        marginTop: layout.height3,
        flexDirection : 'row',
    },
    menuHeaderIcon : {
        color : '#ffffff',
        fontSize : layout.fontSize3,
        marginRight : layout.height1p5,
    },
    menuHeaderIconText : {
        fontSize : layout.fontSize2,
        color : '#ffffff',
    },
    menuHeaderUserInfosView : {
        height: layout.height12,
        width : layout.width40,
        flexDirection : 'row',
        alignItems: 'center',
    },
    menuHeaderUserImage : {
        borderRadius : layout.width8,
        width : layout.width16,
        height: layout.width16,
        marginRight : layout.width5,
    },
    menuHeaderUsername : {
        color : '#ffffff',
        fontSize : layout.fontSize2,
    },
    menuHeaderUserEmail : {
        color : '#ffffff',
        fontSize : layout.fontSize1p6,
    },
    menuHeaderAvailableView : {
        height: layout.height8,
        width : layout.width60,
        flexDirection : 'row',
        alignItems: "center",
    },
    menuHeaderAvailableSwitch : {
        height : layout.height8,
        width : layout.width40,
    },
    menuHeaderAvailableSwitchLabel : {
        color:'#ffffff',
        fontSize : layout.fontSize2,
        height : layout.height8,
        width : layout.width30,
        marginTop : layout.height3,
    },
});

class DrawerMenu extends Component {
    constructor(props)
    {
        super(props);
        if(this.props.users.loggedUser)
        {
            this.state = {userAvailable: this.props.users.loggedUser.available};
        }
        else
        {
            this.state = {userAvailable: null};
        }
    }

    componentWillMount()
    {
        this.props.tryUserById(this.props.login, this.props.users.loggedUser);
    }

    setUserAvailable(value) {
        this.props.trySetAvailability(this.props.login, this.props.users.loggedUser, value);
        this.setState({userAvailable: value});
    }

    renderAvatar(user, initials)
    {
        if(user.avatar)
        {
            return(
                <Image style={styles.menuHeaderUserImage} source={{ uri : user.avatar.path}}/>
            );
        }
        else
        {
            return(
                <Image style={styles.menuHeaderUserImage} source={{ uri : 'http://via.placeholder.com/500x500/00bcd4/ffffff/?text=' + initials.toUpperCase()}}/>
            );
        }
    }

    logout()
    {
        this.props.logout();
        this.props.goToLogin();
    }

    scoring()
    {
        this.props.navigation.navigate('Scoring');
    }

    displaySwitch()
    {
        if(this.state.userAvailable !== null)
        {
            if(this.state.userAvailable === true)
            {
                return(
                    <View style={styles.menuHeaderAvailableView}>
                        <Text style={styles.menuHeaderAvailableSwitchLabel}>
                            Disponible
                        </Text>
                        <Switch style={styles.menuHeaderAvailableSwitch} value={this.state.userAvailable} onValueChange={(value) => this.setUserAvailable(value)} onTintColor={'#c5cae9'} thumbTintColor={'#00bcd4'}/>
                    </View>
                );
            }
            else
            {
                return(
                    <View style={styles.menuHeaderAvailableView}>
                        <Text style={styles.menuHeaderAvailableSwitchLabel}>
                            Indisponible
                        </Text>
                        <Switch style={styles.menuHeaderAvailableSwitch} value={this.state.userAvailable} onValueChange={(value) => this.setUserAvailable(value)} onTintColor={'#c5cae9'} thumbTintColor={'#00bcd4'}/>
                    </View>
                );
            }
        }
        else
        {
            if(this.props.users.loggedUser.available === true)
            {
                return(
                    <View style={styles.menuHeaderAvailableView}>
                        <Text style={styles.menuHeaderAvailableSwitchLabel}>
                            Disponible
                        </Text>
                        <Switch style={styles.menuHeaderAvailableSwitch} value={this.props.users.loggedUser.available} onValueChange={(value) => this.setUserAvailable(value)} onTintColor={'#c5cae9'} thumbTintColor={'#00bcd4'}/>
                    </View>
                );
            }
            else
            {
                return(
                    <View style={styles.menuHeaderAvailableView}>
                        <Text style={styles.menuHeaderAvailableSwitchLabel}>
                            Indisponible
                        </Text>
                        <Switch style={styles.menuHeaderAvailableSwitch} value={this.props.users.loggedUser.available} onValueChange={(value) => this.setUserAvailable(value)} onTintColor={'#c5cae9'} thumbTintColor={'#00bcd4'}/>
                    </View>
                );
            }
        }
    }

    render() {
        let user = this.props.users.loggedUser;

        if(user)
        {
            let initials = user.firstName.charAt(0) + user.lastName.charAt(0);
            return (
                <View style={styles.menu}>
                    <View style={styles.menuHeader}>
                        <View style={{flexDirection : 'row'}}>
                            <TouchableWithoutFeedback onPress={this.scoring.bind(this)}>
                                <View style={styles.menuHeaderIconView}>
                                    <Icon style={styles.menuHeaderIcon} name="star" />
                                    <Text style={styles.menuHeaderIconText}>
                                        {user.points} points
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={this.logout.bind(this)}>
                                <Icon name="sign-out" style={{color : '#ffffff', fontSize : layout.fontSize3, marginTop: 20}}/>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.menuHeaderUserInfosView}>
                            {this.renderAvatar(user, initials)}
                            <View>
                                <Text style={styles.menuHeaderUsername}>
                                    {user.firstName} {user.lastName}
                                </Text>
                                <Text style={styles.menuHeaderUserEmail}>
                                    {user.email}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.menuHeaderAvailableView}>
                            {
                                this.displaySwitch()
                            }
                        </View>
                    </View>
                    <View style={{flex : 7}}>
                        <Navigation />
                    </View>
                </View>
            );
        }
        else
        {
            return (
                <View style={styles.menu}>
                    <View style={styles.menuHeader}>
                        <View style={styles.menuHeaderIconView}>
                            <Icon style={styles.menuHeaderIcon} name="star" />
                            <Text style={styles.menuHeaderIconText}>
                                ... points
                            </Text>
                        </View>
                        <View style={styles.menuHeaderUserInfosView}>
                            <Image style={styles.menuHeaderUserImage} source={{ uri : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'}}/>
                            <View>
                                <Text style={styles.menuHeaderUsername}>
                                    ...
                                </Text>
                                <Text style={styles.menuHeaderUserEmail}>
                                    ...
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Navigation />
                    </View>
                </View>
            );
        }
    }
};

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        tags : state.tags,
        users : state.users,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);