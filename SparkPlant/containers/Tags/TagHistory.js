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
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import FooterButton from "../../components/Footer/FooterButton";
import HeaderTagDetails from "../../components/Header/HeaderTags";
import TagHistoryList from "../../components/Tags/TagHistoryList";

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
    footer: {
        height : responsiveHeight(10),
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingBottom : responsiveHeight(3),
    },
});

/*function lpad(value, padding) {
    var zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
}*/

class TagHistory extends Component {

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
            ToastAndroid.show("LOADING", ToastAndroid.SHORT);
            return (
                <View style={styles.login}>
                    <View style={styles.list}>
                        <ActivityIndicator color="#3f51b5" size="large"/>
                    </View>
                </View>
            );
        }
        else
        {
            Alert.alert("READY");
            let tag = this.props.tags.currentTag;
            if(tag)
            {
                return (
                    <View style={styles.login}>
                        <HeaderTagDetails {...this.props} headerTitle={"#" /*+ lpad(tag["@id"].substr(tag["@id"].lastIndexOf("/") +1), 6)*/} />
                        <View style={styles.list}>
                            <TagHistoryList {...this.props} items={tag.history} />
                        </View>
                        <View style={styles.footer}>
                            <FooterButton {...this.props} active={false} tag={tag} iconName="sticky-note-o" text="Contenu" route={this.props.goToTagDetails}/>
                            <FooterButton {...this.props} active={true} tag={tag} iconName="info" text="Historique" route={this.props.goToTagHistory}/>
                            <FooterButton {...this.props} active={false} tag={tag} iconName="exchange" text="Actions" route={this.props.goToTagAction}/>
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