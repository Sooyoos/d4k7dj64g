import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardNewsItem from './DashboardNewsItem';
import Moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

let styles = StyleSheet.create({
    dashboardNews: {
        flex:5,
        width:Dimensions.get('window').width,
    },
});

class DashboardNews extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount()
    {

    }

    getMainImage(item)
    {
        if(item.media && item.media.length > 0)
        {
            return item.media[0].path;
        }
        else
        {
            return "http://via.placeholder.com/500x500";
        }
    }

    getVisiblityIcon(item)
    {
        switch(item.visibility)
        {
            case "private" :
                return "lock";
                break;
            case "restricted" :
                return "unlock-alt";
                break;
            case "public" :
                return "globe";
                break;
        }
    }

    buildNewsList(news)
    {
        let list = [];

        if(news.length > 0)
        {
            for(var i = 0; i < 3; i++)
            {
                list.push(
                    <DashboardNewsItem key={i} responsable={this.props.responsable} imgSrc={this.getMainImage(news[i])} newsExcerpt={news[i].title} newsDate={Moment(news[i].createdAt).format('DD/MM/YYYY')} newsAuthor={"par " + news[i].user.firstName + " " + news[i].user.lastName} iconName={this.getVisiblityIcon(news[i])} />
                );
            }
        }

        return list;
    }

    render() {
        return (
            <View style={styles.dashboardNews}>
                {this.buildNewsList(this.props.news.news)}
            </View>
        );
    }
};

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        tags : state.tags,
        utils : state.utils,
        news : state.news,
        users : state.users,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardNews);