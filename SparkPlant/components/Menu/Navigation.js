import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

let styles = StyleSheet.create({
    body : {
        flex : 1,
    },
    item : {
        flex : 1,
        height : responsiveHeight(8),
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: responsiveWidth(4),
    },
    itemIcon : {
        width : responsiveWidth(10),
        fontSize : responsiveFontSize(3),
        marginRight: responsiveWidth(3),
    },
    itemLabel : {
        fontSize: responsiveFontSize(2.2),
        color : "#232323",
        fontWeight: "bold",
    },
    itemActive : {
        flex : 1,
        height : responsiveHeight(8),
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: responsiveWidth(4),
        backgroundColor : "#C5CAE9",
    },
    itemIconActive : {
        width : responsiveWidth(10),
        fontSize : responsiveFontSize(3),
        marginRight: responsiveWidth(3),
        color : "#009688",
    },
    itemLabelActive : {
        fontSize: responsiveFontSize(2.2),
        color : "#009688",
        fontWeight: "bold",
    }
});

class Navigation extends Component {
    constructor(props)
    {
        super(props);
    }

    getItemForRoute(routeName, active)
    {
        var iconName = "cog";
        var label = "";

        switch(routeName)
        {
            case "Dashboard" :
            {
                iconName = "home";
                label = "HOME";
                break;
            }
            case "Tags" : {
                iconName = "tags";
                label = "TAGS";
                break;
            }
            case "News" : {
                iconName = "newspaper-o";
                label = "NEWS";
                break;
            }
            case "Checklists" : {
                iconName = "check-square-o";
                label = "CHECKLISTS";
                break;
            }
            case "Charts" : {
                iconName = "bar-chart";
                label = "STATISTIQUES";
                break;
            }
            default :
                break;
        }

        if(active)
        {
            return(
                <View style={styles.itemActive}>
                    <Icon name={iconName} style={styles.itemIconActive} />
                    <Text style={styles.itemLabelActive}>
                        {label}
                    </Text>
                </View>
            )
        }
        else
        {
            return(
                <View style={styles.item}>
                    <Icon name={iconName} style={styles.itemIcon} />
                    <Text style={styles.itemLabel}>
                        {label}
                    </Text>
                </View>
            )
        }
    }

    resetAndGo(routeName)
    {
        this.props.resetAll();
        this.props.navigate(routeName);
    }

    buildNavigationItems(routes, active)
    {
        let list = [];

        for(var i = 0; i < routes.length; i++)
        {
            let routeName = routes[i];

            if(i === active)
            {
                list.push(
                    <TouchableWithoutFeedback key={i} onPress={() => { this.resetAndGo(routeName) }}>
                        {this.getItemForRoute(routeName, true)}
                    </TouchableWithoutFeedback>
                );
            }
            else
            {
                list.push(
                    <TouchableWithoutFeedback key={i} onPress={() => { this.resetAndGo(routeName) }}>
                        {this.getItemForRoute(routeName, false)}
                    </TouchableWithoutFeedback>
                );
            }
        }

        return list;
    }

    render() {
        let routes = [
            "Dashboard",
            "Tags",
            "News",
            "Checklists",
            "Charts",
        ];

        return(
            <View style={styles.body}>
                { this.buildNavigationItems(routes, this.props.nav.routes[1].routes[0].index) }
            </View>
        );
    }
};

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Navigation);