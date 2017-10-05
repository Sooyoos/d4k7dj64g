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
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

let styles = StyleSheet.create({
    menu: {
        flex : 1,
        backgroundColor:'#ffffff',
    },
    menuHeader : {
        width : responsiveWidth(100),
        height: responsiveHeight(35),
        backgroundColor: '#3f51b5',
        paddingVertical: responsiveHeight(3),
        paddingHorizontal: responsiveWidth(5),
    },
    menuHeaderIconView : {
        width : responsiveWidth(60),
        height: responsiveHeight(8),
        marginTop: responsiveHeight(3),
        flexDirection : 'row',
    },
    menuHeaderIcon : {
        color : '#ffffff',
        fontSize : responsiveFontSize(3),
        marginRight : responsiveHeight(1.5),
    },
    menuHeaderIconText : {
        fontSize : responsiveFontSize(2),
        color : '#ffffff',
    },
    menuHeaderUserInfosView : {
        height: responsiveHeight(12),
        flexDirection : 'row',
    },
    menuHeaderUserImage : {
        borderRadius : responsiveWidth(8),
        width : responsiveWidth(16),
        height: responsiveWidth(16),
        marginRight : responsiveWidth(5),
    },
    menuHeaderUsername : {
        color : '#ffffff',
        fontSize : responsiveFontSize(2.8),
    },
    menuHeaderUserEmail : {
        color : '#ffffff',
        fontSize : responsiveFontSize(2),
    },
    menuHeaderAvailableView : {
        height:responsiveHeight(8),
        width : responsiveWidth(60),
        flexDirection : 'row',
        alignItems: "center",
    },
    menuHeaderAvailableSwitch : {
        height : responsiveHeight(8),
        width : responsiveWidth(40),
    },
    menuHeaderAvailableSwitchLabel : {
        color:'#ffffff',
        fontSize : responsiveFontSize(2),
        height : responsiveHeight(8),
        width : responsiveWidth(30),
        marginTop : responsiveHeight(3),
    },
});

class DrawerMenu extends Component {
    constructor(props)
    {
        super(props);
        if(this.props.users.loggedUser)
        {
            this.state = {userAvailable: this.props.users.loggedUser.availability};
        }
        else
        {
            this.state = {userAvailable: null};
        }
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
                                <Icon name="sign-out" style={{color : '#ffffff', fontSize : responsiveFontSize(3), marginTop: 20}}/>
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
                            <Text style={styles.menuHeaderAvailableSwitchLabel}>
                                Disponible
                            </Text>
                            <Switch style={styles.menuHeaderAvailableSwitch} value={this.state.userAvailable || this.props.users.loggedUser.availability} onValueChange={(value) => this.setUserAvailable(value)} onTintColor={'#c5cae9'} thumbTintColor={'#00bcd4'}/>
                        </View>
                    </View>
                    <View>
                        <DrawerItems contentOptions={{activeTintColor : '#00bcd4'}} {...this.props} />
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
                        <DrawerItems {...this.props} />
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