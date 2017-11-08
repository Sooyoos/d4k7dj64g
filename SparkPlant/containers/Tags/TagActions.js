import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import FooterButton from "../../components/Footer/FooterButton";
import HeaderTagDetails from "../../components/Header/HeaderTags";
import Icon from 'react-native-vector-icons/FontAwesome';
import ElevatedView from "react-native-elevated-view";

let styles = StyleSheet.create({
    login: {
        flex:1,
    },
    header : {
        height : responsiveHeight(7),
    },
    list: {
        height : responsiveHeight(83),
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent: 'center',
    },
    listLine : {
        flexDirection: 'row',
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
    },
    icon : {
        color: '#ffffff',
        fontSize : responsiveFontSize(11),
        textAlign: 'center',
    },
    buttonComment : {
        width:responsiveWidth(40),
        height:responsiveWidth(40),
        backgroundColor:'#9c27b0',
        borderRadius: responsiveWidth(20),
        padding : responsiveWidth(3),
        marginTop: responsiveHeight(0.5),
        marginBottom: responsiveHeight(2),
        marginLeft: responsiveWidth(2),
        marginRight: responsiveWidth(2),
        alignItems : "center",
        justifyContent : "center",
    },
    buttonTransfer : {
        width:responsiveWidth(40),
        height:responsiveWidth(40),
        backgroundColor:'#00bcd4',
        borderRadius: responsiveWidth(20),
        padding : responsiveWidth(3),
        marginTop: responsiveHeight(0.5),
        marginBottom: responsiveHeight(2),
        marginLeft: responsiveWidth(2),
        marginRight: responsiveWidth(2),
        alignItems : "center",
        justifyContent : "center",
    },
    buttonCheck : {
        width:responsiveWidth(40),
        height:responsiveWidth(40),
        backgroundColor:'#4caf50',
        borderRadius: responsiveWidth(20),
        padding : responsiveWidth(3),
        marginTop: responsiveHeight(0.5),
        marginBottom: responsiveHeight(2),
        marginLeft: responsiveWidth(2),
        marginRight: responsiveWidth(2),
        alignItems : "center",
        justifyContent : "center",
    },
    buttonClose : {
        width:responsiveWidth(40),
        height:responsiveWidth(40),
        backgroundColor:'#f44336',
        borderRadius: responsiveWidth(20),
        padding : responsiveWidth(3),
        marginTop: responsiveHeight(0.5),
        marginBottom: responsiveHeight(2),
        marginLeft: responsiveWidth(2),
        marginRight: responsiveWidth(2),
        alignItems : "center",
        justifyContent: "center",
    },
    footer: {
        height : responsiveHeight(10),
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingBottom : responsiveHeight(3),
    },
});

function lpad(value, padding) {
    var zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
}

class TagActions extends Component {

    static navigationOptions = {
        title : 'TAGS',
        drawerLabel: "TAGS",
        drawerIcon: ({tintColor}) => (
            <Icon name='tag' style={{fontSize : responsiveFontSize(1.8), color : '#757575'}}/>
        ),
    };

    constructor(props) {
        super(props);
    }

    goToComment()
    {
        this.props.goToTagComment(this.props.tags.currentTag);
    }

    goToTransfer()
    {
        this.props.goToTagTransfer(this.props.tags.currentTag);
    }

    resolve()
    {
        this.props.tryTagResolve(this.props.login, this.props.tags.currentTag);
    }

    abandon()
    {
        this.props.tryTagClose(this.props.login, this.props.tags.currentTag);
    }

    isSupervisor(tag)
    {
        if(tag.supervisor["@id"] === this.props.users.loggedUser["@id"])
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    render() {
        let tag = this.props.tags.currentTag;
        let supervisor = this.isSupervisor(tag);

        if(supervisor)
        {
            return (
                <View style={styles.login}>
                    <HeaderTagDetails {...this.props} headerTitle={"#" + lpad(tag["@id"].substr(tag["@id"].lastIndexOf("/") +1), 6)} />
                    <View style={styles.list}>
                        <View style={styles.listLine}>
                            <TouchableOpacity onPress={this.goToComment.bind(this)}>
                                <View>
                                    <ElevatedView elevation={10} style={styles.buttonComment}>
                                        <Icon name="comment-o" style={styles.icon}/>
                                    </ElevatedView>
                                    <Text style={{textAlign: 'center', color : '#212121', fontSize : responsiveFontSize(1.8)}}>
                                        Commenter
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.goToTransfer.bind(this)}>
                                <View>
                                    <ElevatedView elevation={10} style={styles.buttonTransfer}>
                                        <Icon name="mail-forward" style={styles.icon}/>
                                    </ElevatedView>
                                    <Text style={{textAlign: 'center', color : '#212121', fontSize : responsiveFontSize(1.8)}}>
                                        Transférer
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.listLine}>
                            <TouchableOpacity onPress={this.resolve.bind(this)}>
                                <View>
                                    <ElevatedView elevation={10} style={styles.buttonCheck}>
                                        <Icon name="check" style={styles.icon}/>
                                    </ElevatedView>
                                    <Text style={{textAlign: 'center', color : '#212121', fontSize : responsiveFontSize(1.8)}}>
                                        Résolu
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.abandon.bind(this)}>
                                <View>
                                    <ElevatedView elevation={10} style={styles.buttonClose}>
                                        <Icon name="close" style={styles.icon}/>
                                    </ElevatedView>
                                    <Text style={{textAlign: 'center', color : '#212121', fontSize : responsiveFontSize(1.8)}}>
                                        Non Résolu
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
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
                    <HeaderTagDetails {...this.props} headerTitle={"#" + lpad(tag["@id"].substr(tag["@id"].lastIndexOf("/") +1), 6)} />
                    <View style={styles.list}>
                        <View style={styles.listLine}>
                            <TouchableOpacity onPress={this.goToComment.bind(this)}>
                                <View>
                                    <ElevatedView elevation={10} style={styles.buttonComment}>
                                        <Icon name="comment-o" style={styles.icon}/>
                                    </ElevatedView>
                                    <Text style={{textAlign: 'center', color : '#212121', fontSize : responsiveFontSize(1.8)}}>
                                        Commenter
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
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
        users : state.users,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(TagActions);