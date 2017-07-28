import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    Image,
    TouchableWithoutFeedback,
    TextInput,
    Text,
    Picker,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import HeaderNews from "../../components/Header/HeaderNews";
import ElevatedView from "react-native-elevated-view";
import RadioButton from "../../components/Utils/RadioButton";

let styles = StyleSheet.create({
    login: {
        height:responsiveHeight(7),
    },
    body: {
        height: responsiveHeight(93),
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor : "#efefef",
    },
    medias : {
        width: responsiveWidth(90),
        height: responsiveHeight(25),
        backgroundColor: "#ffffff",
        marginVertical:responsiveHeight(1),
    },
    title : {
        width: responsiveWidth(90),
        height: responsiveHeight(15),
        backgroundColor: "#ffffff",
        marginVertical:responsiveHeight(1),
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(1.5),
    },
    unit : {
        width: responsiveWidth(90),
        height: responsiveHeight(10),
        backgroundColor: "#ffffff",
        marginVertical:responsiveHeight(1),
        paddingVertical : responsiveHeight(1),
        paddingHorizontal: responsiveWidth(1.5),
    },
    content : {
        width: responsiveWidth(90),
        height: responsiveHeight(30),
        backgroundColor: "#ffffff",
        marginVertical:responsiveHeight(1),
        paddingVertical : responsiveHeight(1),
        paddingHorizontal: responsiveWidth(1.5),
    },
    slider : {
        height : responsiveHeight(15),
        width : responsiveWidth(90),
        paddingVertical : responsiveHeight(2),
        backgroundColor : '#ffffff',
        flexDirection: 'row',
    },
    mediaCard : {
        height : responsiveHeight(10),
        width : responsiveWidth(25),
        marginHorizontal: responsiveWidth(2),
        backgroundColor : "#ffffff",
    },
    media : {
        height : responsiveHeight(10),
        width : responsiveWidth(25),
    },
    addMedia : {
        height : responsiveHeight(10),
        width : responsiveWidth(90),
        alignContent:'center',
        justifyContent:'center',
        flexDirection: 'row',
    },
    addMediaButton : {
        height : responsiveHeight(8),
        width : responsiveHeight(8),
        borderRadius : responsiveHeight(4),
        alignContent:'center',
        justifyContent:'center',
        backgroundColor : '#00bcd4',
    },
    addMediaButtonIcon : {
        color : "#ffffff",
        fontSize: responsiveFontSize(4),
        textAlign: 'center',
    },
    titleLabel : {
        height : responsiveHeight(5),
        color : "#212121",
        fontSize: responsiveFontSize(1.8),
    },
    titleInput : {
        height : responsiveHeight(5),
        color : "#545454",
        fontSize: responsiveFontSize(1.5),
    },
    unitPicker : {
        height : responsiveHeight(8),
    },
    contentLabel : {
        height : responsiveHeight(5),
        color : "#212121",
        fontSize: responsiveFontSize(1.8),
    },
    contentInput : {
        height : responsiveHeight(20),
        color : "#545454",
        fontSize: responsiveFontSize(1.5),
    },
    nextButton : {
        height : responsiveHeight(8),
        width : responsiveHeight(8),
        borderRadius : responsiveHeight(4),
        alignContent:'center',
        justifyContent:'center',
        backgroundColor : '#00bcd4',
        marginBottom: responsiveHeight(4),
    },
    nextButtonIcon : {
        color : "#ffffff",
        fontSize: responsiveFontSize(4),
        textAlign: 'center',
    },
    broadcast : {
        width: responsiveWidth(90),
        height: responsiveHeight(20),
        backgroundColor: "#ffffff",
        marginVertical:responsiveHeight(1),
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(1.5),
    },
    broadcastLabel : {
        height : responsiveHeight(5),
        color : "#212121",
        fontSize: responsiveFontSize(1.8),
    },
    rbLabel : {
        color : "#212121",
        fontSize: responsiveFontSize(1.5),
    },
    rbSelected : {
        height: responsiveHeight(1.5),
        width: responsiveHeight(1.5),
        borderRadius: responsiveHeight(0.75),
        backgroundColor : '#00bcd4',
    },
    radioButton : {
        height: responsiveHeight(3),
        width: responsiveHeight(3),
        borderRadius: responsiveHeight(1.5),
        borderWidth: 3,
        borderColor: '#212121',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight : responsiveWidth(1),
    },
});

class CreateNewsStep1 extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <View style={styles.login}>
                <HeaderNews {...this.props} headerTitle="Créer une News"/>
                <View style={styles.body}>
                    <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                        <ElevatedView style={styles.medias} elevation={2}>
                            <ScrollView style={styles.slider} horizontal={true} showsHorizontalScrollIndicator={false}>
                                <ElevatedView style={styles.mediaCard} elevation={4}>
                                    <Image style={styles.media} source={{uri : 'https://blog.nxp.com/wp-content/uploads/2016/11/post-11521-industry-4-960x425.jpg'}} />
                                </ElevatedView>
                                <ElevatedView style={styles.mediaCard} elevation={4}>
                                    <Image style={styles.media} source={{uri : 'http://www.pwc.com/content/dam/pwc/gx/en/industries/industries-4.0/landing-page/related-content-industry-self-assessment.jpg'}} />
                                </ElevatedView>
                                <ElevatedView style={styles.mediaCard} elevation={4}>
                                    <Image style={styles.media} source={{uri : 'http://i2.cdn.cnn.com/cnnnext/dam/assets/160318130751-foreign-imports-crush-u-s-steel-industry-exlarge-169.jpg'}} />
                                </ElevatedView>
                            </ScrollView>
                            <View style={styles.addMedia}>
                                <ElevatedView style={styles.addMediaButton} elevation={4}>
                                    <TouchableWithoutFeedback>
                                        <Icon style={styles.addMediaButtonIcon} name="camera"/>
                                    </TouchableWithoutFeedback>
                                </ElevatedView>
                            </View>
                        </ElevatedView>
                        <ElevatedView style={styles.title} elevation={2}>
                            <Text style={styles.titleLabel}>
                                Titre de la news
                            </Text>
                            <TextInput style={styles.titleInput} placeholder="Titre"/>
                        </ElevatedView>
                        <ElevatedView style={styles.unit} elevation={2}>
                            <Picker style={styles.unitPicker}>
                                <Picker.Item label="Sélectionnez l'unité" value={null} key={-1} />
                                <Picker.Item label="Unit 1" value="/units/1" key={0} />
                                <Picker.Item label="Unit 2" value="/units/2" key={1} />
                                <Picker.Item label="Unit 3" value="/units/3" key={2} />
                                <Picker.Item label="Unit 4" value="/units/4" key={3} />
                            </Picker>
                        </ElevatedView>
                        <ElevatedView style={styles.content} elevation={2}>
                            <Text style={styles.contentLabel}>
                                Texte de la news
                            </Text>
                            <TextInput style={styles.contentInput} placeholder="Texte" multiline={true}/>
                        </ElevatedView>
                        <ElevatedView style={styles.broadcast} elevation={2}>
                            <Text style={styles.broadcastLabel}>
                                Diffusion
                            </Text>
                            <View style={{flexDirection : 'row', marginVertical : responsiveHeight(0.5)}}>
                                <RadioButton selected={true} styleSelected={styles.rbSelected} style={styles.radioButton}/>
                                <Text style={styles.rbLabel}>
                                    Confidentielle
                                </Text>
                            </View>
                            <View style={{flexDirection : 'row', marginVertical : responsiveHeight(0.5)}}>
                                <RadioButton selected={false} styleSelected={styles.rbSelected} style={styles.radioButton}/>
                                <Text style={styles.rbLabel}>
                                    Restreinte
                                </Text>
                            </View>
                            <View style={{flexDirection : 'row', marginVertical : responsiveHeight(0.5)}}>
                                <RadioButton selected={false} styleSelected={styles.rbSelected} style={styles.radioButton}/>
                                <Text style={styles.rbLabel}>
                                    Publique
                                </Text>
                            </View>
                        </ElevatedView>
                        <View style={{flexDirection : 'row', alignContent : 'flex-end', justifyContent: 'flex-end', width : responsiveWidth(90)}}>
                            <ElevatedView style={styles.nextButton} elevation={4}>
                                <TouchableWithoutFeedback>
                                    <Icon style={styles.nextButtonIcon} name="eye"/>
                                </TouchableWithoutFeedback>
                            </ElevatedView>
                        </View>
                    </ScrollView>
                </View>
            </View>
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


export default connect(mapStateToProps, mapDispatchToProps)(CreateNewsStep1);