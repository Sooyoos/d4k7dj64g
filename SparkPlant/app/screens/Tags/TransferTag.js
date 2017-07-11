import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Picker,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ElevatedView from "react-native-elevated-view";
import FooterButton from "../../components/FooterButton/FooterButton";
import HeaderTagDetails from "../../components/Header/HeaderTagDetails";

let styles = StyleSheet.create({
    login: {
        flex:1,
    },
    list: {
        flex:8,
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent: 'center',
    },
    picker : {
        width : 300,
        height: 80,
    },
    button : {
        marginTop : 30,
        width : 90,
        height: 90,
        borderRadius: 45,
        alignItems: 'center',
        backgroundColor: '#00bcd4',
        padding: 20,
    },
    icon : {
        color: '#ffffff',
        textAlign: 'center',
        fontSize : 45,
    },
    footer: {
        flex:1,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
    },
});

export default class TransferTag extends Component {

    constructor(props) {
        super(props);
        this.state = {selected : null};
    }

    refresh(user)
    {
        this.setState({selected : user});
    }

    forward()
    {
        this.props.navigation.navigate('TagDetails', {tag : this.props.navigation.state.params.tag});
    }

    render() {
        let tag = this.props.navigation.state.params.tag;
        return (
            <View style={styles.login}>
                <HeaderTagDetails {...this.props} headerTitle={tag.title} />
                <View style={styles.list}>
                    <Picker style={styles.picker} selectedValue={this.state.selected} prompt='Select the user' mode="dropdown" onValueChange={(value) => this.refresh(value)}>
                        <Picker.Item key={1} label={'Guillaume Sondag'} value={'Guillaume Sondag'} />
                        <Picker.Item key={2} label={'Maximilien Wecxsteen'} value={'Maximilien Wecxsteen'} />
                    </Picker>
                    <TouchableWithoutFeedback onPress={this.forward.bind(this)}>
                        <ElevatedView style={styles.button} elevation={9}>
                            <Icon name="mail-forward" style={styles.icon} />
                        </ElevatedView>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.footer}>
                    <FooterButton {...this.props} active={false} tag={tag} iconName="sticky-note-o" text="Contenu" route="TagDetails"/>
                    <FooterButton {...this.props} active={false} tag={tag} iconName="info" text="Historique" route="TagHistory"/>
                    <FooterButton {...this.props} active={true} tag={tag} iconName="exchange" text="Actions" route="TagActions"/>
                </View>
            </View>
        );
    }
};