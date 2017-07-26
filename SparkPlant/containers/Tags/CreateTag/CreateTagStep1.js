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
        margin : responsiveWidth(2),
        backgroundColor: '#ffffff'
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
        width: responsiveWidth(10),
        height : responsiveWidth(10),
        borderRadius : responsiveWidth(5),
        backgroundColor: '#00bcd4',
        margin : responsiveWidth(1.5),
        padding : responsiveWidth(0.5),
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
        padding : responsiveWidth(4),
    },
    locationPicker : {
        marginTop : 20,
        marginBottom : 20,
        height : responsiveHeight(10),
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
});

class CreateTagStep1 extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount()
    {
        this.props.tryTagPlaces(this.props.login);
        this.props.tryTagAxis(this.props.login);
    }

    next()
    {
        this.props.goToCreateTagStep2();
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

        items.push(
            <Picker.Item key={-1} label="Choisissez un lieu" value={null} />
        );

        if(places !== null)
        {
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
        return (
            <View style={{flex : 1, backgroundColor : '#efefef'}}>
                <HeaderTagDetails {...this.props} headerTitle="Créer un tag" />
                <View style={{flex : 7}}>
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
                            <TextInput style={{fontSize : responsiveFontSize(1.6)}} placeholder="Détails du lieu" maxLength={30} value={this.props.tags.creation_current.placeDetails} onChangeText={(value) => this.props.setCurrentCreationPlaceDetails(value)}/>
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