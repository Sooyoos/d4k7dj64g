import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import HeaderTags from "../../components/Header/HeaderTags";
import FooterButton from "../../components/FooterButton/FooterButton";
import TagList from "../../components/Tags/TagList";

let styles = StyleSheet.create({
    login: {
        flex:1,
    },
    header : {
        height : responsiveHeight(7),
    },
    body: {
        height : responsiveHeight(83),
        backgroundColor : "#efefef",
        alignItems:'center',
        justifyContent: 'center',
    },
    footer: {
        height : responsiveHeight(10),
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
    },
});

let tags = [
    {
        title : "Flexible pneumatique fissuré",
        location : "Sableuse - îlot 4 - Atelier A",
        type : "S",
        id : "#00685",
        description : 'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
        author : {
            avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg',
            fullname : 'Mari Doucet',
        },
        history : [
            {
                type : 'resolve',
                date : '28/11/2016 à 12h42',
                author : {
                    fullname : 'Mari Doucet',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'
                }
            },
            {
                type : 'comment',
                date : '27/11/2016 à 18h03',
                content : 'Pièce remplacée',
                author : {
                    fullname : 'Maximilien Wecxsteen',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAVeAAAAJDBkZjIxNzhiLTA2YzktNDBhZC05MDRlLTY4MDkwZmVkZmE3MQ.jpg',
                }
            },
            {
                type: 'transfer',
                date: '25/11/2016 à 15h28',
                recipient: 'Maximilien Wecxsteen',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'comment',
                date : '25/11/2016 à 15h00',
                content : 'La pièce est défaillante (trou)',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'creation',
                date : '24/11/2016 à 08h54',
                recipient: 'Guillaume Sondag',
                author : {
                    fullname : 'Mari Doucet',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'
                },
            },
        ],
        status : 'OK',
    },
    {
        title : "Pièces mélangées dans le bac",
        location : "Press 8 - îlot 5 - Atelier C",
        type : "E",
        id : "#00526",
        description : 'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
        author : {
            avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
            fullname : 'Guillaume Sondag',
        },
        history : [
            {
                type : 'comment',
                date : '27/11/2016 à 18h03',
                content : 'Pièce remplacée',
                author : {
                    fullname : 'Maximilien Wecxsteen',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAVeAAAAJDBkZjIxNzhiLTA2YzktNDBhZC05MDRlLTY4MDkwZmVkZmE3MQ.jpg',
                }
            },
            {
                type: 'transfer',
                date: '25/11/2016 à 15h28',
                recipient: 'Maximilien Wecxsteen',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'comment',
                date : '25/11/2016 à 15h00',
                content : 'La pièce est défaillante (trou)',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'creation',
                date : '24/11/2016 à 08h54',
                recipient: 'Guillaume Sondag',
                author : {
                    fullname : 'Mari Doucet',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'
                },
            },
        ],
        status : 'NOK',
    },
    {
        title : "Trou dans la clôture",
        location : "Exterieurs",
        type : "S",
        id : "#00542",
        description : 'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
        author : {
            avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg',
            fullname : 'Mari Doucet',
        },
        history : [
            {
                type : 'closed',
                date : '28/11/2016 à 12h42',
                author : {
                    fullname : 'Mari Doucet',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'
                }
            },
            {
                type : 'comment',
                date : '27/11/2016 à 18h03',
                content : 'Pièce remplacée',
                author : {
                    fullname : 'Maximilien Wecxsteen',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAVeAAAAJDBkZjIxNzhiLTA2YzktNDBhZC05MDRlLTY4MDkwZmVkZmE3MQ.jpg',
                }
            },
            {
                type: 'transfer',
                date: '25/11/2016 à 15h28',
                recipient: 'Maximilien Wecxsteen',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'comment',
                date : '25/11/2016 à 15h00',
                content : 'La pièce est défaillante (trou)',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'creation',
                date : '24/11/2016 à 08h54',
                recipient: 'Guillaume Sondag',
                author : {
                    fullname : 'Mari Doucet',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'
                },
            },
        ],
        status : 'Abandoned',
    },
    {
        title : "Flexible pneumatique fissuré",
        location : "Sableuse - îlot 4 - Atelier A",
        type : "S",
        id : "#00685",
        description : 'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
        author : {
            avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg',
            fullname : 'Mari Doucet',
        },
        history : [
            {
                type : 'resolve',
                date : '28/11/2016 à 12h42',
                author : {
                    fullname : 'Mari Doucet',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'
                }
            },
            {
                type : 'comment',
                date : '27/11/2016 à 18h03',
                content : 'Pièce remplacée',
                author : {
                    fullname : 'Maximilien Wecxsteen',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAVeAAAAJDBkZjIxNzhiLTA2YzktNDBhZC05MDRlLTY4MDkwZmVkZmE3MQ.jpg',
                }
            },
            {
                type: 'transfer',
                date: '25/11/2016 à 15h28',
                recipient: 'Maximilien Wecxsteen',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'comment',
                date : '25/11/2016 à 15h00',
                content : 'La pièce est défaillante (trou)',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'creation',
                date : '24/11/2016 à 08h54',
                recipient: 'Guillaume Sondag',
                author : {
                    fullname : 'Mari Doucet',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'
                },
            },
        ],
        status : 'OK',
    },
    {
        title : "Pièces mélangées dans le bac",
        location : "Press 8 - îlot 5 - Atelier C",
        type : "E",
        id : "#00526",
        description : 'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
        author : {
            avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
            fullname : 'Guillaume Sondag',
        },
        history : [
            {
                type : 'comment',
                date : '27/11/2016 à 18h03',
                content : 'Pièce remplacée',
                author : {
                    fullname : 'Maximilien Wecxsteen',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAVeAAAAJDBkZjIxNzhiLTA2YzktNDBhZC05MDRlLTY4MDkwZmVkZmE3MQ.jpg',
                }
            },
            {
                type: 'transfer',
                date: '25/11/2016 à 15h28',
                recipient: 'Maximilien Wecxsteen',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'comment',
                date : '25/11/2016 à 15h00',
                content : 'La pièce est défaillante (trou)',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'creation',
                date : '24/11/2016 à 08h54',
                recipient: 'Guillaume Sondag',
                author : {
                    fullname : 'Mari Doucet',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'
                },
            },
        ],
        status : 'NOK',
    },
    {
        title : "Trou dans la clôture",
        location : "Exterieurs",
        type : "S",
        id : "#00542",
        description : 'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
        author : {
            avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg',
            fullname : 'Mari Doucet',
        },
        history : [
            {
                type : 'creation',
                date : '24/11/2016 à 08h54',
                recipient: 'Guillaume Sondag',
                author : {
                    fullname : 'Mari Doucet',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'
                },
            },
        ],
        status : 'New',
    },
    {
        title : "Flexible pneumatique fissuré",
        location : "Sableuse - îlot 4 - Atelier A",
        type : "S",
        id : "#00685",
        description : 'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
        author : {
            avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg',
            fullname : 'Mari Doucet',
        },
        history : [
            {
                type : 'resolve',
                date : '28/11/2016 à 12h42',
                author : {
                    fullname : 'Mari Doucet',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'
                }
            },
            {
                type : 'comment',
                date : '27/11/2016 à 18h03',
                content : 'Pièce remplacée',
                author : {
                    fullname : 'Maximilien Wecxsteen',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAVeAAAAJDBkZjIxNzhiLTA2YzktNDBhZC05MDRlLTY4MDkwZmVkZmE3MQ.jpg',
                }
            },
            {
                type: 'transfer',
                date: '25/11/2016 à 15h28',
                recipient: 'Maximilien Wecxsteen',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'comment',
                date : '25/11/2016 à 15h00',
                content : 'La pièce est défaillante (trou)',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'creation',
                date : '24/11/2016 à 08h54',
                recipient: 'Guillaume Sondag',
                author : {
                    fullname : 'Mari Doucet',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'
                },
            },
        ],
        status : 'OK',
    },
    {
        title : "Pièces mélangées dans le bac",
        location : "Press 8 - îlot 5 - Atelier C",
        type : "E",
        id : "#00526",
        description : 'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
        author : {
            avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
            fullname : 'Guillaume Sondag',
        },
        history : [
            {
                type : 'comment',
                date : '27/11/2016 à 18h03',
                content : 'Pièce remplacée',
                author : {
                    fullname : 'Maximilien Wecxsteen',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAVeAAAAJDBkZjIxNzhiLTA2YzktNDBhZC05MDRlLTY4MDkwZmVkZmE3MQ.jpg',
                }
            },
            {
                type: 'transfer',
                date: '25/11/2016 à 15h28',
                recipient: 'Maximilien Wecxsteen',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'comment',
                date : '25/11/2016 à 15h00',
                content : 'La pièce est défaillante (trou)',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'creation',
                date : '24/11/2016 à 08h54',
                recipient: 'Guillaume Sondag',
                author : {
                    fullname : 'Mari Doucet',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'
                },
            },
        ],
        status : 'NOK',
    },
    {
        title : "Trou dans la clôture",
        location : "Exterieurs",
        type : "S",
        id : "#00542",
        description : 'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
        author : {
            avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg',
            fullname : 'Mari Doucet',
        },
        history : [
            {
                type : 'closed',
                date : '28/11/2016 à 12h42',
                author : {
                    fullname : 'Mari Doucet',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'
                }
            },
            {
                type : 'comment',
                date : '27/11/2016 à 18h03',
                content : 'Pièce remplacée',
                author : {
                    fullname : 'Maximilien Wecxsteen',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAVeAAAAJDBkZjIxNzhiLTA2YzktNDBhZC05MDRlLTY4MDkwZmVkZmE3MQ.jpg',
                }
            },
            {
                type: 'transfer',
                date: '25/11/2016 à 15h28',
                recipient: 'Maximilien Wecxsteen',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'comment',
                date : '25/11/2016 à 15h00',
                content : 'La pièce est défaillante (trou)',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'creation',
                date : '24/11/2016 à 08h54',
                recipient: 'Guillaume Sondag',
                author : {
                    fullname : 'Mari Doucet',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'
                },
            },
        ],
        status : 'Abandoned',
    },
    {
        title : "Flexible pneumatique fissuré",
        location : "Sableuse - îlot 4 - Atelier A",
        type : "S",
        id : "#00685",
        description : 'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
        author : {
            avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg',
            fullname : 'Mari Doucet',
        },
        history : [
            {
                type : 'resolve',
                date : '28/11/2016 à 12h42',
                author : {
                    fullname : 'Mari Doucet',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'
                }
            },
            {
                type : 'comment',
                date : '27/11/2016 à 18h03',
                content : 'Pièce remplacée',
                author : {
                    fullname : 'Maximilien Wecxsteen',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAVeAAAAJDBkZjIxNzhiLTA2YzktNDBhZC05MDRlLTY4MDkwZmVkZmE3MQ.jpg',
                }
            },
            {
                type: 'transfer',
                date: '25/11/2016 à 15h28',
                recipient: 'Maximilien Wecxsteen',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'comment',
                date : '25/11/2016 à 15h00',
                content : 'La pièce est défaillante (trou)',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'creation',
                date : '24/11/2016 à 08h54',
                recipient: 'Guillaume Sondag',
                author : {
                    fullname : 'Mari Doucet',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'
                },
            },
        ],
        status : 'OK',
    },
    {
        title : "Pièces mélangées dans le bac",
        location : "Press 8 - îlot 5 - Atelier C",
        type : "E",
        id : "#00526",
        description : 'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
        author : {
            avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
            fullname : 'Guillaume Sondag',
        },
        history : [
            {
                type : 'comment',
                date : '27/11/2016 à 18h03',
                content : 'Pièce remplacée',
                author : {
                    fullname : 'Maximilien Wecxsteen',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAVeAAAAJDBkZjIxNzhiLTA2YzktNDBhZC05MDRlLTY4MDkwZmVkZmE3MQ.jpg',
                }
            },
            {
                type: 'transfer',
                date: '25/11/2016 à 15h28',
                recipient: 'Maximilien Wecxsteen',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'comment',
                date : '25/11/2016 à 15h00',
                content : 'La pièce est défaillante (trou)',
                author: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
                    fullname: 'Guillaume Sondag',
                },
            },
            {
                type : 'creation',
                date : '24/11/2016 à 08h54',
                recipient: 'Guillaume Sondag',
                author : {
                    fullname : 'Mari Doucet',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'
                },
            },
        ],
        status : 'NOK',
    },
    {
        title : "Trou dans la clôture",
        location : "Exterieurs",
        type : "S",
        id : "#00542",
        description : 'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
        author : {
            avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg',
            fullname : 'Mari Doucet',
        },
        history : [
            {
                type : 'creation',
                date : '24/11/2016 à 08h54',
                recipient: 'Guillaume Sondag',
                author : {
                    fullname : 'Mari Doucet',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'
                },
            },
        ],
        status : 'New',
    },
];

export default class TagsFull extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.login}>
                <HeaderTags {...this.props} style={styles.header} headerTitle="Tous les tags"/>
                <View style={styles.body}>
                    <TagList {...this.props} items={tags} />
                </View>
                <View style={styles.footer}>
                    <FooterButton {...this.props} active={false} iconName="eye" text="Suivis" route="Tags"/>
                    <FooterButton {...this.props} active={true} iconName="tags" text="Tous" route="AllTags"/>
                </View>
            </View>
        );
    }
};