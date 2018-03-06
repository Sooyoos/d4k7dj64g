import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import FooterButton from "../../components/Footer/FooterButton";
import HeaderTagDetails from "../../components/Header/HeaderTags";
import Icon from 'react-native-vector-icons/FontAwesome';
import ElevatedView from "react-native-elevated-view";
import * as layout from "../../assets/layout";

let styles = StyleSheet.create({
    login: {
        height : layout.fullHeight,
        width : layout.fullWidth,
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
    comment : {
        width: layout.width75,
        height: layout.height15,
        fontSize : layout.fontSize1p6
    },
    button : {
        marginTop : 30,
        marginBottom: 30,
        width : layout.width25,
        height: layout.width25,
        borderRadius: layout.width12p5,
        alignItems: 'center',
        backgroundColor: '#9c27b0',
        padding : layout.width3,
    },
    icon : {
        color: '#ffffff',
        textAlign: 'center',
        fontSize : layout.fontSize9,
    },
    footer: {
        height : layout.height10,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingBottom : layout.height3,
    },
});

function lpad(value, padding) {
    var zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
}

class CommentTag extends Component {

    static navigationOptions = {
        title : 'TAGS',
        drawerLabel: "TAGS",
        drawerIcon: ({tintColor}) => (
            <Icon name='tag' style={{fontSize : layout.fontSize1p8, color : '#757575'}}/>
        ),
    };

    constructor(props) {
        super(props);
        this.state = {value : null};
    }

    sendComment()
    {
        Keyboard.dismiss();
        this.props.tryTagComment(this.props.login, this.props.tags.currentTag, this.state.value);
        this.props.goToTagDetails(this.props.tags.currentTag);
    }

    render() {
        let tag = this.props.tags.currentTag;

        if(tag)
        {
            return (
                <View style={styles.login}>
                    <HeaderTagDetails {...this.props} headerTitle={"#" + lpad(tag["@id"].substr(tag["@id"].lastIndexOf("/") +1), 6)} />
                    <View style={styles.list}>
                        <Text style={{fontSize: layout.fontSize1p8, color : '#212121'}}>
                            Votre commentaire :
                        </Text>
                        <TextInput multiline={true} style={styles.comment} placeholder="Entrez votre commentaire..." maxLength={140} onChangeText={(value) => this.setState({value : value})}/>
                        <TouchableOpacity onPress={this.sendComment.bind(this)}>
                            <View>
                                <ElevatedView style={styles.button} elevation={9}>
                                    <Icon name="commenting-o" style={styles.icon} />
                                </ElevatedView>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footer}>
                        <FooterButton {...this.props} active={false} tag={tag} iconName="sticky-note-o" text="Contenu" route={this.props.goToTagDetails}/>
                        <FooterButton {...this.props} active={false} tag={tag} iconName="info" text="Historique" route={this.props.goToTagHistory}/>
                        <FooterButton {...this.props} active={true} tag={tag} iconName="exchange" text="Actions" route={this.props.goToTagAction}/>
                    </View>
                </View>
            );
        }
        else
        {
            return (
                <View style={styles.login}>
                    <HeaderTagDetails {...this.props} headerTitle="#" />
                    <View style={styles.list}>
                        <Text style={{fontSize: layout.fontSize1p8, color : '#212121'}}>
                            Votre commentaire :
                        </Text>
                        <TextInput multiline={true} style={styles.comment} placeholder="Entrez votre commentaire..." maxLength={140} onChangeText={(value) => this.setState({value : value})}/>
                        <TouchableOpacity onPress={this.sendComment.bind(this)}>
                            <View>
                                <ElevatedView style={styles.button} elevation={9}>
                                    <Icon name="commenting-o" style={styles.icon} />
                                </ElevatedView>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footer}>
                        <FooterButton {...this.props} active={false} tag={tag} iconName="sticky-note-o" text="Contenu" route={this.props.goToTagDetails}/>
                        <FooterButton {...this.props} active={false} tag={tag} iconName="info" text="Historique" route={this.props.goToTagHistory}/>
                        <FooterButton {...this.props} active={true} tag={tag} iconName="exchange" text="Actions" route={this.props.goToTagAction}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(CommentTag);