import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Picker,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import ElevatedView from "react-native-elevated-view";
import * as layout from "../../assets/layout";
import FooterButton from "../../components/Footer/FooterButton";
import HeaderTagDetails from "../../components/Header/HeaderTags";

let styles = StyleSheet.create({
    login: {
        width : layout.fullWidth,
        height : layout.fullHeight
    },
    header : {
        height : layout.height7,
    },
    list: {
        height : layout.height83,
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent: 'center',
    },
    /* the picker for Android cannot be styled using RN (https://stackoverflow.com/questions/38921492/how-to-style-the-standard-react-native-android-picker/39141949#39141949) */
    picker : {
        width : layout.width80,
        height: layout.height10,
    },
    button : {
        marginTop : 30,
        width : layout.width25,
        height: layout.width25,
        borderRadius: layout.width12p5,
        alignItems: 'center',
        backgroundColor: '#00bcd4',
        padding : layout.width2,
    },
    icon : {
        color: '#ffffff',
        textAlign: 'center',
        fontSize : layout.fontSize10,
    },
    footer: {
        height : layout.height10,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingBottom : layout.height3,
    },
});

class TransferTag extends Component {

    static navigationOptions = {
        title : 'TAGS',
        drawerLabel: "TAGS",
        drawerIcon: ({tintColor}) => (
            <Icon name='tag' style={{fontSize : layout.fontSize1p8, color : '#757575'}}/>
        ),
    };

    constructor(props) {
        super(props);
        this.state = {selected : null};
    }

    componentWillMount()
    {
        this.props.tryTagTransferUsers(this.props.login);
    }

    componentDidMount()
    {

    }

    refresh(user)
    {
        this.setState({selected : user});
    }

    forward()
    {
        this.props.tryTagTransfer(this.props.login, this.props.tags.currentTag, this.state.selected);
        this.props.goToTagDetails(this.props.tags.currentTag);
    }

    render() {
        let tag = this.props.tags.currentTag;
        let users = this.props.tags.users;
        let userList = [];

        if(users)
        {
            for(var i = 0; i < users.length; i++)
            {
                userList.push(
                    <Picker.Item key={i} label={users[i].firstName + " " + users[i].lastName} value={users[i]} />
                );
            }

            return (
                <View style={styles.login}>
                    <HeaderTagDetails {...this.props} headerTitle={tag.title} />
                    <View style={styles.list}>
                        <Picker style={styles.picker} selectedValue={this.state.selected} prompt='Select the user' mode="dropdown" onValueChange={(value) => this.refresh(value)}>
                            <Picker.Item key={-1} label={'Séléctionnez le destinataire'} value={null} />
                            {userList}
                        </Picker>
                        <TouchableOpacity onPress={this.forward.bind(this)} underlayColor="white">
                            <ElevatedView style={styles.button} elevation={9}>
                                <Icon name="mail-forward" style={styles.icon} />
                            </ElevatedView>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footer}>
                        <FooterButton {...this.props} active={false} tag={tag} iconName="sticky-note-o" text="Contenu" route={() => { this.props.goToTagDetails(this.props.nav) }}/>
                        <FooterButton {...this.props} active={false} tag={tag} iconName="info" text="Historique" route={() => { this.props.goToTagHistory(this.props.nav) }}/>
                        <FooterButton {...this.props} active={true} tag={tag} iconName="exchange" text="Actions" route={() => { this.props.goToTagAction(this.props.nav) }}/>
                    </View>
                </View>
            );
        }
        else
        {
            return (
                <View style={styles.login}>
                    <HeaderTagDetails {...this.props} headerTitle={tag.title} />
                    <View style={styles.list}>
                        <Picker style={styles.picker} selectedValue={this.state.selected} prompt='Select the user' mode="dropdown" onValueChange={(value) => this.refresh(value)}>
                            <Picker.Item key={-1} label={'Sélectionnez le destinataire'} value={null} />
                        </Picker>
                        <TouchableOpacity onPress={this.forward.bind(this)} activeOpacity={0.8}>
                            <ElevatedView style={styles.button} elevation={9}>
                                <Icon name="mail-forward" style={styles.icon} />
                            </ElevatedView>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footer}>
                        <FooterButton {...this.props} active={false} tag={tag} iconName="sticky-note-o" text="Contenu" route={() => { this.props.goToTagDetails(this.props.nav) }}/>
                        <FooterButton {...this.props} active={false} tag={tag} iconName="info" text="Historique" route={() => { this.props.goToTagHistory(this.props.nav) }}/>
                        <FooterButton {...this.props} active={true} tag={tag} iconName="exchange" text="Actions" route={() => { this.props.goToTagAction(this.props.nav) }}/>
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
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(TransferTag);