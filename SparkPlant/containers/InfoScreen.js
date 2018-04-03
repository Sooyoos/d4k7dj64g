import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Linking,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../actions';
import Header from '../components/Header/Header';
import {
    fontSize2, fontSize2p8, fullHeight, fullWidth, height10, height2, height93, width5,
    width90
} from "../assets/layout";

let styles = StyleSheet.create({
    login: {
        width : fullWidth,
        height : fullHeight,
    },
    body: {
        width : fullWidth,
        height : height93,
        backgroundColor: '#FFFFFF',
        alignItems:'center',
    },
    infoCard : {
        width : width90,
        height: height10,
        marginHorizontal : width5,
        borderBottomWidth : 1,
        borderBottomColor : "#232323",
        paddingVertical: height2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoCardText : {
        color : "#232323",
        fontSize : fontSize2,
        textAlign : 'center',
    },
    contactCard : {
        width : width90,
        height: height10,
        marginHorizontal : width5,
        borderBottomWidth : 1,
        borderBottomColor : "#232323",
        paddingVertical: height2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    contactIcon : {
        fontSize: fontSize2p8,
        color : "#232323",
        marginHorizontal : width5,
    },
    contactText : {
        color : "#232323",
        fontSize : fontSize2,
        textAlign : 'center',
    },
    dataUsage : {
        paddingVertical: height2,
        width : width90,
        marginHorizontal : width5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dataUsageText : {
        textAlign: 'center',
        color : '#232323',
        fontSize : fontSize2,
    },
});

let appVersion = "05-03-2018-build231";

class InfoScreen extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <View style={styles.login}>
                <Header props={this.props}/>
                <View style={styles.body}>
                    <View style={styles.infoCard}>
                        <Text style={styles.infoCardText}>
                            Version de l'application : { appVersion }
                        </Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => Linking.openURL('mailto:contact@sparkplant.com')}>
                        <View style={styles.contactCard}>
                            <Icon style={styles.contactIcon} name='envelope'/>
                            <Text style={styles.contactText}>
                                Nous contacter
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.dataUsage}>
                        <Text style={styles.dataUsageText}>
                            Toutes les informations collectées via le microphone et/ou l'appareil photo et la caméra de votre téléphone ou tablette
                            sont transmises à notre serveur de façon sécurisée au moyen d'un protocole HTTPS.
                            De plus vos informations ne sont consultables qu'au sein de votre organisation ou,
                            à votre demande, par l'équipe de SparkPlant.
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav : state.nav,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(InfoScreen);