import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Picker,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ElevatedView from 'react-native-elevated-view';
import HeaderTagDetails from "../../../components/Header/HeaderTagDetails";

let styles = StyleSheet.create({
    card : {
        flex : 1,
        margin : 10,
    },
    cardHeader : {
        flex : 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardHeaderIconView : {
        width: 40,
        height : 40,
        borderRadius : 20,
        backgroundColor: '#00bcd4',
        margin : 10,
        padding : 3,
    },
    cardHeaderIcon : {
        flex : 2,
        fontSize : 30,
        textAlign : 'center',
        color : '#ffffff',
    },
    cardHeaderTitle : {
        flex : 9,
        fontSize : 20,
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
    },
    actionButtonView : {
        width: 40,
        height : 40,
        borderRadius : 20,
        backgroundColor: '#00bcd4',
        padding : 3,
        margin : 5,
    },
    actionButtonIcon : {
        fontSize : 30,
        textAlign : 'center',
        color : '#ffffff',
    },
    buttonView : {
        width: 50,
        height : 50,
        borderRadius : 25,
        backgroundColor: '#00bcd4',
        padding : 3,
        margin : 15,
        marginLeft:350,
    },
    buttonIcon : {
        flex : 2,
        fontSize : 40,
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

export default class CreateTagStep2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tagTitle : null,
            tagDescription : null,
            tagPrimaryType : null,
            tagSecondaryType : null,
        };
    }

    saveTitle(title)
    {
        this.setState({tagTitle : title});
    }

    saveDescription(details)
    {
        this.setState({tagDescription : details});
    }

    savePrimaryType(type)
    {
        this.setState({tagPrimaryType : type});
    }

    saveSecondaryType(type)
    {
        this.setState({tagSecondaryType : type});
    }

    goToTakePicture()
    {
        this.props.navigation.navigate('TakePictureTag');
    }

    next()
    {
        this.props.navigation.navigate('CreateTagStep2');
    }

    render() {
        return (
            <View style={{flex : 1}}>
                <HeaderTagDetails {...this.props} headerTitle="Créer un tag" />
                <View style={{flex : 7}}>
                    <ElevatedView style={styles.card} elevation={5}>
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
                    <ElevatedView style={styles.card} elevation={5}>
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
                                    <ElevatedView style={styles.actionButtonView} elevation={10}>
                                        <Icon name="camera" style={styles.actionButtonIcon} />
                                    </ElevatedView>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.next.bind(this)}>
                                    <ElevatedView style={styles.actionButtonView} elevation={10}>
                                        <Icon name="video" style={styles.actionButtonIcon} />
                                    </ElevatedView>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </ElevatedView>
                </View>
                <View style={{flex : 0.5, alignItems:'flex-end', flexDirection:'row'}}>
                    <TouchableWithoutFeedback onPress={this.next.bind(this)}>
                        <ElevatedView style={styles.buttonView} elevation={10}>
                            <Icon name="arrow-right" style={styles.buttonIcon} />
                        </ElevatedView>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
};