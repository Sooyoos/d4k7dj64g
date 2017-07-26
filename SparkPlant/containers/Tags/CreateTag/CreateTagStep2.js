import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Picker,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ElevatedView from 'react-native-elevated-view';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import HeaderTagDetails from "../../../components/Header/HeaderTags";

let styles = StyleSheet.create({
    card : {
        flex : 1,
        margin : 10,
        backgroundColor : '#ffffff',
    },
    cardHeader : {
        flex : 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardHeaderIconView : {
        width: responsiveWidth(10),
        height : responsiveWidth(10),
        borderRadius : responsiveWidth(5),
        backgroundColor: '#00bcd4',
        margin : 10,
        padding : 3,
    },
    cardHeaderIcon : {
        flex : 2,
        fontSize : responsiveFontSize(4.5),
        textAlign : 'center',
        color : '#ffffff',
    },
    cardHeaderTitle : {
        flex : 9,
        fontSize : responsiveFontSize(2),
        fontWeight: 'bold',
        color : '#212121',
    },
    cardContent : {
        flex : 4,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding : 5,
    },
    textInput : {
        marginTop : 20,
        fontSize : responsiveFontSize(1.8)
    },
    actionButtonView : {
        width: responsiveWidth(8),
        height : responsiveWidth(8),
        borderRadius : responsiveWidth(4),
        backgroundColor: '#00bcd4',
        padding : 3,
        margin : 5,
    },
    actionButtonIcon : {
        fontSize : responsiveFontSize(3.5),
        textAlign : 'center',
        color : '#ffffff',
    },
    buttonView : {
        width: responsiveWidth(15),
        height : responsiveWidth(15),
        borderRadius : responsiveWidth(7.5),
        backgroundColor: '#00bcd4',
        padding : 3,
        margin : 15,
        marginLeft:responsiveWidth(80),
    },
    buttonIcon : {
        flex : 2,
        fontSize : responsiveFontSize(7.5),
        textAlign : 'center',
        color : '#ffffff',
    },
    mediaList : {
        flex : 5,
    },
    actions : {
        flex : 1,
        flexDirection : 'row',
        padding : 20,
    }
});

class CreateTagStep2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tagTitle : null,
            tagDescription : null
        };
    }

    saveTitle(title)
    {
        this.props.setCurrentCreationTitle(title);
    }

    saveDescription(description)
    {
        this.props.setCurrentCreationDescription(description);
    }

    goToTakePicture()
    {
        this.props.navigation.navigate('TakePictureTag');
    }

    next()
    {
        this.props.goToCreateTagStep3();
    }

    render() {
        return (
            <View style={{flex : 1}}>
                <HeaderTagDetails {...this.props} headerTitle="Créer un tag" />
                <View style={{flex : 7}}>
                    <ElevatedView style={styles.card} elevation={2}>
                        <ElevatedView style={styles.cardHeader} elevation={2}>
                            <View style={styles.cardHeaderIconView}>
                                <Icon name="information-outline" style={styles.cardHeaderIcon} />
                            </View>
                            <Text style={styles.cardHeaderTitle}>
                                Informations
                            </Text>
                        </ElevatedView>
                        <View style={styles.cardContent}>
                            <TextInput style={styles.textInput} placeholder="Titre" maxLength={40} value={this.state.tagTitle} onChangeText={(value) => this.saveTitle(value)}/>
                            <TextInput style={styles.textInput} multiline={true} placeholder="Description" maxLength={140} value={this.state.tagDescription} onChangeText={(value) => this.saveDescription(value)}/>
                        </View>
                    </ElevatedView>
                    <ElevatedView style={styles.card} elevation={2}>
                        <ElevatedView style={styles.cardHeader} elevation={2}>
                            <View style={styles.cardHeaderIconView}>
                                <Icon name="camera" style={styles.cardHeaderIcon} />
                            </View>
                            <Text style={styles.cardHeaderTitle}>
                                Photos et Vidéos
                            </Text>
                        </ElevatedView>
                        <View style={styles.cardContent}>
                            <View style={styles.mediaList}>

                            </View>
                            <View style={styles.actions}>
                                <TouchableWithoutFeedback onPress={this.goToTakePicture.bind(this)}>
                                    <ElevatedView style={styles.actionButtonView} elevation={3}>
                                        <Icon name="camera" style={styles.actionButtonIcon} />
                                    </ElevatedView>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.next.bind(this)}>
                                    <ElevatedView style={styles.actionButtonView} elevation={3}>
                                        <Icon name="video" style={styles.actionButtonIcon} />
                                    </ElevatedView>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </ElevatedView>
                </View>
                <View style={{flex : 0.5, alignItems:'flex-end', flexDirection:'row'}}>
                    <TouchableWithoutFeedback onPress={this.next.bind(this)}>
                        <ElevatedView style={styles.buttonView} elevation={7}>
                            <Icon name="arrow-right" style={styles.buttonIcon} />
                        </ElevatedView>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
};

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        tags : state.tags,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateTagStep2);