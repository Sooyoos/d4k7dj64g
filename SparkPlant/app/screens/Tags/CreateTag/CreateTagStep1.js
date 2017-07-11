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
    locationPicker : {
        marginTop : 20,
        marginBottom : 20,
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
});

export default class CreateTagStep1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tagLocation : null,
            tagLocationDetails : null,
            tagPrimaryType : null,
            tagSecondaryType : null,
        };
    }

    saveLocation(location)
    {
        this.setState({tagLocation : location});
    }

    saveLocationDetails(details)
    {
        this.setState({tagLocationDetails : details});
    }

    savePrimaryType(type)
    {
        this.setState({tagPrimaryType : type});
    }

    saveSecondaryType(type)
    {
        this.setState({tagSecondaryType : type});
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
                                <Icon name="map" style={styles.cardHeaderIcon} />
                            </View>
                            <Text style={styles.cardHeaderTitle}>
                                Lieu
                            </Text>
                        </ElevatedView>
                        <View style={styles.cardContent}>
                            <Picker style={styles.locationPicker} prompt="Sélectionnez le lieu" selectedValue={this.state.tagLocation} onValueChange={(value) => this.saveLocation(value)}>
                                <Picker.Item key={0} label={'Ilôt 1 - Atelier A'} value={'Ilôt 1 - Atelier A'} />
                                <Picker.Item key={1} label={'Ilôt 3 - Atelier A'} value={'Ilôt 3 - Atelier A'} />
                                <Picker.Item key={2} label={'Ilôt 2 - Atelier B'} value={'Ilôt 2 - Atelier B'} />
                                <Picker.Item key={3} label={'Ilôt 5 - Atelier B'} value={'Ilôt 5 - Atelier B'} />
                                <Picker.Item key={4} label={'Ilôt 8 - Atelier C'} value={'Ilôt 8 - Atelier C'} />
                                <Picker.Item key={5} label={'Ilôt 3 - Atelier E'} value={'Ilôt 3 - Atelier E'} />
                                <Picker.Item key={6} label={'Extérieurs'} value={'Extérieurs'} />
                            </Picker>
                            <TextInput placeholder="Détails du lieu" maxLength={30} value={this.state.tagLocationDetails} onChangeText={(value) => this.saveLocationDetails(value)}/>
                        </View>
                    </ElevatedView>
                    <ElevatedView style={styles.card} elevation={5}>
                        <ElevatedView style={styles.cardHeader} elevation={2}>
                            <View style={styles.cardHeaderIconView}>
                                <Icon name="information-outline" style={styles.cardHeaderIcon} />
                            </View>
                            <Text style={styles.cardHeaderTitle}>
                                Type
                            </Text>
                        </ElevatedView>
                        <View style={styles.cardContent}>
                            <Picker style={styles.locationPicker} prompt="Sélectionnez le type principal" selectedValue={this.state.tagPrimaryType} onValueChange={(value) => this.savePrimaryType(value)}>
                                <Picker.Item key={0} label={'Qualité'} value={'Q'} />
                                <Picker.Item key={1} label={'Sécurité'} value={'S'} />
                                <Picker.Item key={2} label={'Propreté'} value={'P'} />
                                <Picker.Item key={3} label={'Conditions de travail'} value={'C'} />
                                <Picker.Item key={4} label={'Maintenance'} value={'M'} />
                            </Picker>
                            <Picker style={styles.locationPicker} prompt="Sélectionnez les types secondaires" selectedValue={this.state.tagSecondaryType} onValueChange={(value) => this.saveSecondaryType(value)}>
                                <Picker.Item key={0} label={'Qualité'} value={'Q'} />
                                <Picker.Item key={1} label={'Sécurité'} value={'S'} />
                                <Picker.Item key={2} label={'Propreté'} value={'P'} />
                                <Picker.Item key={3} label={'Conditions de travail'} value={'C'} />
                                <Picker.Item key={4} label={'Maintenance'} value={'M'} />
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