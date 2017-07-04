import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardNewsItem from './DashboardNewsItem';

let styles = StyleSheet.create({
    dashboardNews: {
        flex:5,
        width:420,
    },
});

let news = [
    {
        imgSrc : 'https://blog.nxp.com/wp-content/uploads/2016/11/post-11521-industry-4-960x425.jpg',
        newsExcerpt : 'Lorem ipsum dolor sit amet.',
        newsDate : 'Le 26/10/2016',
        newsAuthor : 'par Georges',
        iconName : 'globe',
    },
    {
        imgSrc : 'http://www.pwc.com/content/dam/pwc/gx/en/industries/industries-4.0/landing-page/related-content-industry-self-assessment.jpg',
        newsExcerpt : 'Consectetur adipiscing elit, sed do eiusmod.',
        newsDate : 'Le 18/10/2016',
        newsAuthor : 'par Max',
        iconName : 'unlock-alt',
    },
    {
        imgSrc : 'http://i2.cdn.cnn.com/cnnnext/dam/assets/160318130751-foreign-imports-crush-u-s-steel-industry-exlarge-169.jpg',
        newsExcerpt : 'Tempor incididunt ut labore et.',
        newsDate : 'Le 13/10/2016',
        newsAuthor : 'par Martin',
        iconName : 'lock',
    },
];

export default class DashboardNews extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.dashboardNews}>
                <DashboardNewsItem imgSrc={news[0].imgSrc} newsExcerpt={news[0].newsExcerpt} newsDate={news[0].newsDate} newsAuthor={news[0].newsAuthor} iconName={news[0].iconName} />
                <DashboardNewsItem imgSrc={news[1].imgSrc} newsExcerpt={news[1].newsExcerpt} newsDate={news[1].newsDate} newsAuthor={news[1].newsAuthor} iconName={news[1].iconName} />
                <DashboardNewsItem imgSrc={news[2].imgSrc} newsExcerpt={news[2].newsExcerpt} newsDate={news[2].newsDate} newsAuthor={news[2].newsAuthor} iconName={news[2].iconName} />
            </View>
        );
    }
};