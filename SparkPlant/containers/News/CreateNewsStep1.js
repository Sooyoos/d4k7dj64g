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
import ImagePicker from 'react-native-image-picker';

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
        this.state = {
            item : {
                title : null,
                content : null,
                visibility : null,
                unit : null,
                media : [

                ],
            }
        };
    }

    componentWillMount()
    {
        this.setState({item : this.props.news.creation_current});
        this.props.tryUnits(this.props.login);
    }

    buildUnitList()
    {
        let units = this.props.utils.units;
        let unitList = [];

        if(units && units.length > 0)
        {
            for(var i = 0; i < units.length; i++)
            {
                unitList.push(
                    <Picker.Item label={units[i].name} value={units[i]["@id"]} key={i} />
                );
            }
        }

        return unitList;
    }

    setTitle(title)
    {
        let item = Object.assign({}, this.state.item, {title : title});
        this.setState({item : item});
    }

    setContent(content)
    {
        let item = Object.assign({}, this.state.item, {content : content});
        this.setState({item : item});
    }

    setUnit(unit)
    {
        let item = Object.assign({}, this.state.item, {unit : unit});
        this.setState({item : item});
    }

    buildMediaList()
    {
        let medias = this.state.item.media;
        let mediaList = [];

        if(medias && medias.length > 0)
        {
            for(var i = 0; i < medias.length; i++)
            {
                mediaList.push(
                    <ElevatedView key={i} style={styles.mediaCard} elevation={4}>
                        <Image style={styles.media} source={{uri : medias[i].uri}} />
                    </ElevatedView>
                );
            }
        }
        else
        {
            mediaList.push(
                <ElevatedView key={0} style={styles.mediaCard} elevation={4}>
                    <Image style={styles.media} source={{uri : 'http://via.placeholder.com/750x500'}} />
                </ElevatedView>
            );
        }

        return mediaList;
    }

    preview()
    {
        let medias = this.state.item.media;
        for(var i = 0; i < medias.length; i++)
        {
            this.props.tryNewsUploadMedia(this.props.login, medias[i]);
        }
        this.props.prepareNews(this.state.item);
        this.props.goToCreateNewsPreview();
    }

    pickMedia()
    {
        var options = {
            title: 'Ajouter une image',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
            takePhotoButtonTitle : "Depuis l'appareil",
            chooseFromLibraryButtonTitle : "Depuis la gallerie",
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                let source = { uri: response.uri, type: response.type, name: response.fileName };

                let medias = this.state.item.media;
                medias.push(source);
                this.setState(Object.assign({}, this.state.item, {media : medias}));
            }
        });
    }

    isDirection()
    {
        let roles = this.props.users.loggedUser.rolesByUnit;

        for(var i = 0; i < roles.length; i++)
        {
            if(roles[i].role.title === "Responsable" && roles[i].unit.parent === null)
            {
                return true;
            }
        }

        return false;
    }

    render() {
        let direction = this.isDirection();

        if(direction === false)
        {
            return (
                <View style={styles.login}>
                    <HeaderNews {...this.props} headerTitle="Créer une News"/>
                    <View style={styles.body}>
                        <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                            <ElevatedView style={styles.medias} elevation={2}>
                                <ScrollView style={styles.slider} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {this.buildMediaList()}
                                </ScrollView>
                                <View style={styles.addMedia}>
                                    <ElevatedView style={styles.addMediaButton} elevation={4}>
                                        <TouchableWithoutFeedback onPress={this.pickMedia.bind(this)}>
                                            <Icon style={styles.addMediaButtonIcon} name="camera"/>
                                        </TouchableWithoutFeedback>
                                    </ElevatedView>
                                </View>
                            </ElevatedView>
                            <ElevatedView style={styles.title} elevation={2}>
                                <Text style={styles.titleLabel}>
                                    Titre de la news
                                </Text>
                                <TextInput style={styles.titleInput} placeholder="Titre" onChangeText={(text) => this.setTitle(text)} value={this.state.item.title}/>
                            </ElevatedView>
                            <ElevatedView style={styles.unit} elevation={2}>
                                <Picker style={styles.unitPicker} selectedValue={this.state.item.unit} onValueChange={(value, index) => this.setUnit(value)}>
                                    <Picker.Item label="Sélectionnez l'unité" value={null} key={-1} />
                                    {this.buildUnitList()}
                                </Picker>
                            </ElevatedView>
                            <ElevatedView style={styles.content} elevation={2}>
                                <Text style={styles.contentLabel}>
                                    Texte de la news
                                </Text>
                                <TextInput style={styles.contentInput} placeholder="Texte" multiline={true} onChangeText={(text) => this.setContent(text)} value={this.state.item.content}/>
                            </ElevatedView>
                            <View style={{flexDirection : 'row', alignContent : 'flex-end', justifyContent: 'flex-end', width : responsiveWidth(90)}}>
                                <ElevatedView style={styles.nextButton} elevation={4}>
                                    <TouchableWithoutFeedback onPress={this.preview.bind(this)}>
                                        <Icon style={styles.nextButtonIcon} name="eye"/>
                                    </TouchableWithoutFeedback>
                                </ElevatedView>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            );
        }
        else
        {
            return (
                <View style={styles.login}>
                    <HeaderNews {...this.props} headerTitle="Créer une News"/>
                    <View style={styles.body}>
                        <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                            <ElevatedView style={styles.medias} elevation={2}>
                                <ScrollView style={styles.slider} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {this.buildMediaList()}
                                </ScrollView>
                                <View style={styles.addMedia}>
                                    <ElevatedView style={styles.addMediaButton} elevation={4}>
                                        <TouchableWithoutFeedback onPress={this.pickMedia.bind(this)}>
                                            <Icon style={styles.addMediaButtonIcon} name="camera"/>
                                        </TouchableWithoutFeedback>
                                    </ElevatedView>
                                </View>
                            </ElevatedView>
                            <ElevatedView style={styles.title} elevation={2}>
                                <Text style={styles.titleLabel}>
                                    Titre de la news
                                </Text>
                                <TextInput style={styles.titleInput} placeholder="Titre" onChangeText={(text) => this.setTitle(text)} value={this.state.item.title}/>
                            </ElevatedView>
                            <ElevatedView style={styles.unit} elevation={2}>
                                <Picker style={styles.unitPicker} selectedValue={this.state.item.unit} onValueChange={(value, index) => this.setUnit(value)}>
                                    <Picker.Item label="Sélectionnez l'unité" value={null} key={-1} />
                                    {this.buildUnitList()}
                                </Picker>
                            </ElevatedView>
                            <ElevatedView style={styles.content} elevation={2}>
                                <Text style={styles.contentLabel}>
                                    Texte de la news
                                </Text>
                                <TextInput style={styles.contentInput} placeholder="Texte" multiline={true} onChangeText={(text) => this.setContent(text)} value={this.state.item.content}/>
                            </ElevatedView>
                            <ElevatedView style={styles.broadcast} elevation={2}>
                                <Text style={styles.broadcastLabel}>
                                    Diffusion
                                </Text>
                                <View style={{flexDirection : 'row', marginVertical : responsiveHeight(0.5)}}>
                                    <RadioButton value="private" styleSelected={styles.rbSelected} style={styles.radioButton}/>
                                    <Text style={styles.rbLabel}>
                                        Confidentielle
                                    </Text>
                                </View>
                                <View style={{flexDirection : 'row', marginVertical : responsiveHeight(0.5)}}>
                                    <RadioButton value="restricted" styleSelected={styles.rbSelected} style={styles.radioButton}/>
                                    <Text style={styles.rbLabel}>
                                        Restreinte
                                    </Text>
                                </View>
                                <View style={{flexDirection : 'row', marginVertical : responsiveHeight(0.5)}}>
                                    <RadioButton value="public" styleSelected={styles.rbSelected} style={styles.radioButton}/>
                                    <Text style={styles.rbLabel}>
                                        Publique
                                    </Text>
                                </View>
                            </ElevatedView>
                            <View style={{flexDirection : 'row', alignContent : 'flex-end', justifyContent: 'flex-end', width : responsiveWidth(90)}}>
                                <ElevatedView style={styles.nextButton} elevation={4}>
                                    <TouchableWithoutFeedback onPress={this.preview.bind(this)}>
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
}

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        tags : state.tags,
        news : state.news,
        utils : state.utils,
        users : state.users,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateNewsStep1);