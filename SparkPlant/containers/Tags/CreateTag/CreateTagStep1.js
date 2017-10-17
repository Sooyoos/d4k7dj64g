import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Picker,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ElevatedView from 'react-native-elevated-view';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import HeaderTagDetails from "../../../components/Header/HeaderTags";

let styles = StyleSheet.create({
    card : {
        height : responsiveHeight(50),
        margin : responsiveWidth(2),
        backgroundColor: '#ffffff',
        justifyContent : "center",
    },
    cardHeader : {
        flex : 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        padding : responsiveWidth(2),
    },
    cardHeaderIconView : {
        width: responsiveWidth(15),
        height : responsiveWidth(15),
        borderRadius : responsiveWidth(7.5),
        backgroundColor: '#3f51b5',
        margin : responsiveWidth(1.5),
        alignItems : "center",
        justifyContent : "center",
    },
    cardHeaderIcon : {
        fontSize : responsiveFontSize(5),
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
        padding : responsiveWidth(4),
    },
    locationPicker : {
        height : responsiveHeight(5),
        marginBottom : responsiveHeight(5),
    },
    buttonView : {
        width: responsiveWidth(23),
        height : responsiveWidth(23),
        borderRadius : responsiveWidth(11.5),
        backgroundColor: '#00bcd4',
        marginLeft:responsiveWidth(75),
        alignItems : "center",
        justifyContent: "center",
        marginBottom: responsiveHeight(1),
    },
    buttonIcon : {
        fontSize : responsiveFontSize(7.5),
        textAlign : 'center',
        color : '#ffffff',
    },
    actionButtonView : {
        width: responsiveWidth(12),
        height : responsiveWidth(12),
        borderRadius : responsiveWidth(6),
        backgroundColor: '#00bcd4',
        marginVertical : 10,
        marginHorizontal : 5,
        alignItems : "center",
        justifyContent: "center",
    },
    actionButtonIcon : {
        fontSize : responsiveFontSize(4),
        textAlign : 'center',
        color : '#ffffff',
    },
});

class CreateTagStep1 extends Component {

    static navigationOptions = {
        drawerLabel: 'TAGS',
        drawerIcon: ({tintColor}) => (
            <Icon name='tag' style={{fontSize : 24, color : '#757575'}}/>
        ),
    };

    constructor(props) {
        super(props);
        this.error = null;
    }

    componentWillMount()
    {
        this.props.tryTagPlaces(this.props.login);
        this.props.tryTagAxis(this.props.login);
    }

    checkRequiredFields()
    {
        let check = true;
        let message = "";

        if(this.props.tags.creation_current.place === null)
        {
            check = false;
            message += " Lieu ";
        }

        if(this.props.tags.creation_current.primaryAxis === null)
        {
            check = false;
            message += " Type ";
        }

        if(!check)
        {
            this.error = "Certains champs obligatoires sont manquants (" + message + ")";
        }

        return check;
    }

    next()
    {
        if(this.checkRequiredFields() === true)
        {
            this.props.goToCreateTagStep2();
        }
        else
        {
            Alert.alert(
                'Erreur',
                this.error,
                [
                    {text: 'OK', onPress: () => {this.error = null;}},
                ],
                { cancelable: false }
            );
        }
    }

    buildAxisList()
    {
        let axis = this.props.tags.axis;
        let items = [];

        items.push(
            <Picker.Item key={-1} label="Choisissez un type" value={null} />
        );

        if(axis !== null)
        {
            for(var i = 0; i < axis.length; i++)
            {
                items.push(
                    <Picker.Item key={i} label={axis[i].name} value={axis[i]} />
                );
            }
        }

        return items;
    }

    buildPlacesList()
    {
        let places = this.props.tags.places;
        let items = [];

        if(places !== null)
        {
            items.push(
                <Picker.Item key={-1} label="Choisissez un lieu" value={null} />
            );

            for(var i = 0; i < places.length; i++)
            {
                items.push(
                    <Picker.Item key={i} label={places[i].name} value={places[i]} />
                );
            }
        }

        return items;
    }

    render() {
        if(this.props.tags.loading === false)
        {
            if(this.props.tags.places !== null && this.props.tags.axis !== null)
            {
                return (
                    <View style={{flex : 1, backgroundColor : '#efefef'}}>
                        <HeaderTagDetails {...this.props} headerTitle="Créer un tag" />
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <ElevatedView style={styles.card} elevation={2}>
                                <ElevatedView style={styles.cardHeader} elevation={2}>
                                    <View style={styles.cardHeaderIconView}>
                                        <Icon name="map" style={styles.cardHeaderIcon} />
                                    </View>
                                    <Text style={styles.cardHeaderTitle}>
                                        Lieu
                                    </Text>
                                </ElevatedView>
                                <View style={styles.cardContent}>
                                    <Picker style={styles.locationPicker} prompt="Sélectionnez le lieu" selectedValue={this.props.tags.creation_current.place} onValueChange={(value) => this.props.setCurrentCreationPlace(value)}>
                                        { this.buildPlacesList() }
                                    </Picker>
                                    <TextInput style={{fontSize : responsiveFontSize(2.2)}} placeholder="Détails du lieu" maxLength={30} value={this.props.tags.creation_current.placeDetails} onChangeText={(value) => this.props.setCurrentCreationPlaceDetails(value)}/>
                                    <TouchableOpacity onPress={() => {
                                        this.props.setToRecord("place");
                                        this.props.goToRecordAudio();
                                    }}>
                                        <ElevatedView style={styles.actionButtonView} elevation={3}>
                                            <Icon name="microphone" style={styles.actionButtonIcon} />
                                        </ElevatedView>
                                    </TouchableOpacity>
                                </View>
                            </ElevatedView>
                            <ElevatedView style={styles.card} elevation={2}>
                                <ElevatedView style={styles.cardHeader} elevation={2}>
                                    <View style={styles.cardHeaderIconView}>
                                        <Icon name="information-outline" style={styles.cardHeaderIcon} />
                                    </View>
                                    <Text style={styles.cardHeaderTitle}>
                                        Type
                                    </Text>
                                </ElevatedView>
                                <View style={styles.cardContent}>
                                    <Picker style={styles.locationPicker} prompt="Sélectionnez le type principal" selectedValue={this.props.tags.creation_current.primaryAxis} onValueChange={(value) => this.props.setCurrentCreationPrimaryAxis(value)}>
                                        {this.buildAxisList()}
                                    </Picker>
                                    <Picker style={styles.locationPicker} prompt="Sélectionnez les types secondaires" selectedValue={this.props.tags.creation_current.secondaryAxis} onValueChange={(value) => this.props.setCurrentCreationSecondaryAxis(value)}>
                                        {this.buildAxisList()}
                                    </Picker>
                                </View>
                            </ElevatedView>
                            <KeyboardSpacer/>
                        </ScrollView>
                        <View style={{flex : 0.5, alignItems:'flex-end', flexDirection:'row'}}>
                            <TouchableOpacity onPress={this.next.bind(this)}>
                                <ElevatedView style={styles.buttonView} elevation={10}>
                                    <Icon name="arrow-right" style={styles.buttonIcon} />
                                </ElevatedView>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            }
            else
            {
                return (
                    <View style={{flex : 1, backgroundColor : '#efefef'}}>
                        <HeaderTagDetails {...this.props} headerTitle="Créer un tag" />
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <ElevatedView style={styles.card} elevation={2}>
                                <ElevatedView style={styles.cardHeader} elevation={2}>
                                    <View style={styles.cardHeaderIconView}>
                                        <Icon name="map" style={styles.cardHeaderIcon} />
                                    </View>
                                    <Text style={styles.cardHeaderTitle}>
                                        Lieu
                                    </Text>
                                </ElevatedView>
                                <View style={styles.cardContent}>
                                    <ActivityIndicator color="#3f51b5" size="large"/>
                                    <TextInput style={{fontSize : responsiveFontSize(1.6)}} placeholder="Détails du lieu" maxLength={30} value={this.props.tags.creation_current.placeDetails} onChangeText={(value) => this.props.setCurrentCreationPlaceDetails(value)}/>
                                    <TouchableOpacity onPress={() => {
                                        this.props.setToRecord("place");
                                        this.props.goToRecordAudio();
                                    }}>
                                        <ElevatedView style={styles.actionButtonView} elevation={3}>
                                            <Icon name="microphone" style={styles.actionButtonIcon} />
                                        </ElevatedView>
                                    </TouchableOpacity>
                                </View>
                            </ElevatedView>
                            <ElevatedView style={styles.card} elevation={2}>
                                <ElevatedView style={styles.cardHeader} elevation={2}>
                                    <View style={styles.cardHeaderIconView}>
                                        <Icon name="information-outline" style={styles.cardHeaderIcon} />
                                    </View>
                                    <Text style={styles.cardHeaderTitle}>
                                        Type
                                    </Text>
                                </ElevatedView>
                                <View style={styles.cardContent}>
                                    <ActivityIndicator color="#3f51b5" size="large"/>
                                    <ActivityIndicator color="#3f51b5" size="large"/>
                                </View>
                            </ElevatedView>
                            <KeyboardSpacer/>
                        </ScrollView>
                        <View style={{flex : 0.5, alignItems:'flex-end', flexDirection:'row'}}>
                            <TouchableOpacity onPress={this.next.bind(this)}>
                                <ElevatedView style={styles.buttonView} elevation={10}>
                                    <Icon name="arrow-right" style={styles.buttonIcon} />
                                </ElevatedView>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            }
        }
        else
        {
            return(
                <View style={{flex : 1, backgroundColor : '#efefef'}}>
                    <HeaderTagDetails {...this.props} headerTitle="Créer un tag" />
                    <ActivityIndicator color="#3f51b5" size="large"/>
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
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateTagStep1);