import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    ToastAndroid,
    Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";
import FooterButton from "../../components/Footer/FooterButton";
import HeaderTagDetails from "../../components/Header/HeaderTags";
import TagHistoryList from "../../components/Tags/TagHistoryList";
import Icon from 'react-native-vector-icons/FontAwesome';

let styles = StyleSheet.create({
    login: {
        width : layout.fullWidth,
        height : layout.fullHeight,
    },
    header : {
        height : layout.height7,
    },
    list: {
        height : layout.height80,
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent: 'center',
    },
    footer: {
        height : layout.height13,
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

class TagHistory extends Component {

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

    componentWillMount()
    {
        this.props.tryTagHistory(this.props.login, this.props.tags.currentTag);
    }

    render() {
        if(this.props.tags.loading === true)
        {
            return (
                <View style={styles.login}>
                    <HeaderTagDetails {...this.props} headerTitle="Chargement" />
                    <View style={styles.list}>
                        <ActivityIndicator color="#3f51b5" size="large"/>
                    </View>
                    <View style={styles.footer}>
                        <FooterButton {...this.props} active={false} tag={null} iconName="sticky-note-o" text="Contenu" route={() => { this.props.goToTagDetails(this.props.nav) }}/>
                        <FooterButton {...this.props} active={true} tag={null} iconName="info" text="Historique" route={() => { this.props.goToTagHistory(this.props.nav) }}/>
                        <FooterButton {...this.props} active={false} tag={null} iconName="exchange" text="Actions" route={() => { this.props.goToTagAction(this.props.nav) }}/>
                    </View>
                </View>
            );
        }
        else
        {
            let tag = this.props.tags.currentTag;
            if(tag)
            {
                return (
                    <View style={styles.login}>
                        <HeaderTagDetails {...this.props} headerTitle={"#" + lpad(tag["@id"].substr(tag["@id"].lastIndexOf("/") +1), 6)} />
                        <View style={styles.list}>
                            <TagHistoryList {...this.props} items={tag.history} />
                        </View>
                        <View style={styles.footer}>
                            <FooterButton {...this.props} active={false} tag={tag} iconName="sticky-note-o" text="Contenu" route={() => { this.props.goToTagDetails(this.props.nav) }}/>
                            <FooterButton {...this.props} active={true} tag={tag} iconName="info" text="Historique" route={() => { this.props.goToTagHistory(this.props.nav) }}/>
                            <FooterButton {...this.props} active={false} tag={tag} iconName="exchange" text="Actions" route={() => { this.props.goToTagAction(this.props.nav) }}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(TagHistory);