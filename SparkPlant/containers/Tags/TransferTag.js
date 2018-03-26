import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Picker,
    TouchableOpacity,
    Platform,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import ElevatedView from "react-native-elevated-view";
import * as layout from "../../assets/layout";
import FooterButton from "../../components/Footer/FooterButton";
import HeaderTagDetails from "../../components/Header/HeaderTags";
import ModalPicker from 'react-native-modal-picker';

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
        width: layout.width50,
        height : layout.height8,
        alignItems : 'center',
        justifyContent : 'center',
        marginBottom : layout.height2,
    },
    button : {
        marginTop : 30,
        width : layout.width30,
        height: layout.width30,
        borderRadius: layout.width15,
        alignItems: 'center',
        justifyContent : 'center',
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
        if(this.state.selected !== null)
        {
            this.props.tryTagTransfer(this.props.login, this.props.tags.currentTag, this.state.selected);
            this.props.goToTagDetails(this.props.tags.currentTag);
        }
        else
        {
            Alert.alert(
                'Pas d\'utilisateur',
                'Merci de sélectionner un utilisateur',
                [
                    {text: 'Ok', onPress: () => {}, style: 'cancel'},
                ],
                { cancelable: false }
            );
        }

    }

    render() {
        let tag = this.props.tags.currentTag;
        let users = this.props.tags.users;
        let userList = [];
        let list = null;

        if(users)
        {
            if(Platform.OS === 'android')
            {
                for(var i = 0; i < users.length; i++)
                {
                    userList.push(
                        <Picker.Item key={i} label={users[i].firstName + " " + users[i].lastName} value={users[i]} />
                    );
                }

                list = <Picker style={styles.picker} selectedValue={this.state.selected} prompt='Select the user' mode="dropdown" onValueChange={(value) => this.refresh(value)}>
                    <Picker.Item key={-1} label={'Séléctionnez le destinataire'} value={null} />
                    {userList}
                </Picker>;
            }
            else
            {
                for(var i = 0; i < users.length; i++)
                {
                    userList.push(
                        {
                            key : i,
                            label : users[i].firstName + " " + users[i].lastName,
                            value : users[i],
                        }
                    );
                }

                list = <ModalPicker
                    data={userList}
                    initValue="Sélectionnez le destinataire"
                    style={styles.picker}
                    selectStyle={{ height : layout.height5, width : layout.width50, alignItems : 'center', justifyContent : 'center'}}
                    onChange={(value) => this.refresh(value)} />
            }


            return (
                <View style={styles.login}>
                    <HeaderTagDetails {...this.props} headerTitle={tag.title} />
                    <View style={styles.list}>
                        { list }
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
            if(tag)
            {
                return (
                    <View style={styles.login}>
                        <HeaderTagDetails {...this.props} headerTitle={tag.title} />
                        <View style={styles.list}>
                            <ActivityIndicator color="#3f51b5" size="large"/>
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
            else
            {
                return (
                    <View style={styles.login}>
                        <HeaderTagDetails {...this.props} headerTitle="" />
                        <View style={styles.list}>
                            <ActivityIndicator color="#3f51b5" size="large"/>
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