import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardNewsItem from './DashboardNewsItem';
import Moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import {fullWidth, height46p5} from "../../assets/layout"

let styles = StyleSheet.create({
    dashboardNews: {
        height : height46p5,
        width:fullWidth,
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

    filterNewsForUserPermission(news, responsable)
    {
        let list = [];

        for(var i = 0; i < news.length; i++)
        {
            if(news[i].visibility !== 'public')
            {
                if(responsable === true)
                {
                    list.push(news[i]);
                }
            }
            else
            {
                list.push(news[i]);
            }
        }

        return list;
    }

    goToDetails(item)
    {
        this.props.setCurrentNews(item);
        this.props.goToNewsDetail(this.props.nav);
    }

    buildNewsList(news)
    {
        let list = [];

        if(news.length > 0)
        {
            for(var i = 0; i < 3; i++)
            {
                let author = "SparkPlant";

                if(news[i])
                {
                    if(news[i].user)
                    {
                        author = news[i].user.firstName + " " + news[i].user.lastName
                    }
                    list.push(
                        <DashboardNewsItem route={this.goToDetails.bind(this)} item={news[i]} key={i} responsable={this.props.responsable} imgSrc={this.getMainImage(news[i])} newsExcerpt={news[i].title} newsDate={Moment(news[i].createdAt).format('DD/MM/YYYY')} newsAuthor={"par " + author} iconName={this.getVisiblityIcon(news[i])} />
                    );
                }
            }
        }

        return list;
    }

    render() {
        if(this.props.news.news)
        {
            return (
                <View style={styles.dashboardNews}>
                    {this.buildNewsList(this.filterNewsForUserPermission(this.props.news.news, this.props.responsable))}
                </View>
            );
        }
        else
        {
            return(
                <View style={styles.dashboardNews}>
                    <ActivityIndicator color="#3f51b5" size="large"/>
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
        utils : state.utils,
        news : state.news,
        users : state.users,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardNews);