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
import * as layout from "../../assets/layout";
import FooterButton from "../../components/Footer/FooterButton";
import HeaderTagDetails from "../../components/Header/HeaderTags";
import Icon from 'react-native-vector-icons/FontAwesome';
import ElevatedView from "react-native-elevated-view";
import {height7} from "../../assets/layout";

let styles = StyleSheet.create({
    login: {
        flex:1,
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
    listLine : {
        flexDirection: 'row',
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
    },
    icon : {
        color: '#ffffff',
        fontSize : layout.fontSize11,
        textAlign: 'center',
    },
    buttonComment : {
        width:layout.width40,
        height:layout.width40,
        backgroundColor:'#9c27b0',
        borderRadius: layout.width20,
        padding : layout.width3,
        marginTop: layout.height0p5,
        marginBottom: layout.height2,
        marginLeft: layout.width2,
        marginRight: layout.width2,
        alignItems : "center",
        justifyContent : "center",
    },
    buttonTransfer : {
        width:layout.width40,
        height:layout.width40,
        backgroundColor:'#00bcd4',
        borderRadius: layout.width20,
        padding : layout.width3,
        marginTop: layout.width0p5,
        marginBottom: layout.height2,
        marginLeft: layout.width2,
        marginRight: layout.width2,
        alignItems : "center",
        justifyContent : "center",
    },
    buttonCheck : {
        width:layout.width40,
        height:layout.width40,
        backgroundColor:'#4caf50',
        borderRadius: layout.width20,
        padding : layout.width3,
        marginTop: layout.height0p5,
        marginBottom: layout.height2,
        marginLeft: layout.width2,
        marginRight: layout.width2,
        alignItems : "center",
        justifyContent : "center",
    },
    buttonClose : {
        width:layout.width40,
        height:layout.width40,
        backgroundColor:'#f44336',
        borderRadius: layout.width20,
        padding : layout.width3,
        marginTop: layout.height0p5,
        marginBottom: layout.height2,
        marginLeft: layout.width2,
        marginRight: layout.width2,
        alignItems : "center",
        justifyContent: "center",
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

class TagActions extends Component {

    static navigationOptions = {
        title : 'TAGS',
        drawerLabel: "TAGS",
        drawerIcon: ({tintColor}) => (
            <Icon name='tag' style={{fontSize : layout.fontSize1p8, color : '#757575'}}/>
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

        if(supervisor && ( tag.status === "ongoing" || tag.status === "new"))
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
                                    <Text style={{textAlign: 'center', color : '#212121', fontSize : layout.fontSize1p8}}>
                                        Commenter
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.goToTransfer.bind(this)}>
                                <View>
                                    <ElevatedView elevation={10} style={styles.buttonTransfer}>
                                        <Icon name="mail-forward" style={styles.icon}/>
                                    </ElevatedView>
                                    <Text style={{textAlign: 'center', color : '#212121', fontSize : layout.fontSize1p8}}>
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
                                    <Text style={{textAlign: 'center', color : '#212121', fontSize : layout.fontSize1p8}}>
                                        Résolu
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.abandon.bind(this)}>
                                <View>
                                    <ElevatedView elevation={10} style={styles.buttonClose}>
                                        <Icon name="close" style={styles.icon}/>
                                    </ElevatedView>
                                    <Text style={{textAlign: 'center', color : '#212121', fontSize : layout.fontSize1p8}}>
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
        else if(!supervisor || (supervisor && ( tag.status !== "ongoing" && tag.status !== "new")))
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
                                    <Text style={{textAlign: 'center', color : '#212121', fontSize : layout.fontSize1p8}}>
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