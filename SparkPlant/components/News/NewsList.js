import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import NewsListItem from './NewsListItem';

let styles = StyleSheet.create({
    list: {
        height : responsiveHeight(80),
        paddingTop : responsiveHeight(1),
        paddingBottom : responsiveHeight(20),
    },
});

let newsTmp = [
    {
        imgSrc : 'https://blog.nxp.com/wp-content/uploads/2016/11/post-11521-industry-4-960x425.jpg',
        newsExcerpt : 'Lorem ipsum dolor sit amet. Consectetur adipiscing elit, sed do eiusmod.',
        newsDate : 'Le 26/10/2016',
        newsAuthor : 'par Georges',
        iconName : 'globe',
    },
    {
        imgSrc : 'http://www.pwc.com/content/dam/pwc/gx/en/industries/industries-4.0/landing-page/related-content-industry-self-assessment.jpg',
        newsExcerpt : 'Consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet.',
        newsDate : 'Le 18/10/2016',
        newsAuthor : 'par Max',
        iconName : 'unlock-alt',
    },
    {
        imgSrc : 'http://i2.cdn.cnn.com/cnnnext/dam/assets/160318130751-foreign-imports-crush-u-s-steel-industry-exlarge-169.jpg',
        newsExcerpt : 'Tempor incididunt ut labore et. Lorem ipsum dolor sit amet.',
        newsDate : 'Le 13/10/2016',
        newsAuthor : 'par Martin',
        iconName : 'lock',
    },
    {
        imgSrc : 'https://blog.nxp.com/wp-content/uploads/2016/11/post-11521-industry-4-960x425.jpg',
        newsExcerpt : 'Lorem ipsum dolor sit amet. Consectetur adipiscing elit, sed do eiusmod.',
        newsDate : 'Le 26/10/2016',
        newsAuthor : 'par Georges',
        iconName : 'globe',
    },
    {
        imgSrc : 'http://www.pwc.com/content/dam/pwc/gx/en/industries/industries-4.0/landing-page/related-content-industry-self-assessment.jpg',
        newsExcerpt : 'Consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet.',
        newsDate : 'Le 18/10/2016',
        newsAuthor : 'par Max',
        iconName : 'unlock-alt',
    },
    {
        imgSrc : 'http://i2.cdn.cnn.com/cnnnext/dam/assets/160318130751-foreign-imports-crush-u-s-steel-industry-exlarge-169.jpg',
        newsExcerpt : 'Tempor incididunt ut labore et. Lorem ipsum dolor sit amet.',
        newsDate : 'Le 13/10/2016',
        newsAuthor : 'par Martin',
        iconName : 'lock',
    },
];

class NewsList extends Component {

    buildList()
    {
        let news = this.props.items;
        let list = [];

        if(news)
        {
            for(var i = 0; i < news.length; i++)
            {
                list.push(
                    <NewsListItem key={i} item={news[i]}/>
                );
            }
        }
        else
        {
            news = newsTmp;
            for(var i = 0; i < news.length; i++)
            {
                list.push(
                    <NewsListItem key={i} item={news[i]}/>
                );
            }
        }

        return list;
    }

    render() {
        return (
            <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
                {this.buildList()}
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        tags : state.tags,
        news : state.news,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(NewsList);