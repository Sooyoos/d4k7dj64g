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
    Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import HeaderNews from "../../components/Header/HeaderNews";
import ElevatedView from "react-native-elevated-view";
import RadioButton from "../../components/Utils/RadioButton";
import ImagePicker from 'react-native-image-picker';
import ModalSelector from 'react-native-modal-selector';

let styles = StyleSheet.create({
    login: {
        height: layout.height7,
    },
    body: {
        height: layout.height93,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor : "#efefef",
    },
    medias : {
        width: layout.width90,
        height: layout.height35,
        backgroundColor: "#ffffff",
        marginVertical: layout.height1,
    },
    title : {
        width: layout.width90,
        height: layout.height15,
        backgroundColor: "#ffffff",
        marginVertical: layout.height1,
        paddingVertical: layout.height2,
        paddingHorizontal: layout.width1p5,
    },
    unit : {
        width: layout.width90,
        height: layout.height10,
        backgroundColor: "#ffffff",
        marginVertical: layout.height1,
        paddingVertical : layout.height1,
        paddingHorizontal: layout.width1p5,
        justifyContent : 'center',
        alignItems : 'center',
    },
    content : {
        width: layout.width90,
        height: layout.height30,
        backgroundColor: "#ffffff",
        marginVertical: layout.height1,
        paddingVertical : layout.height1,
        paddingHorizontal: layout.width1p5,
    },
    slider : {
        height : layout.height15,
        width : layout.width90,
        paddingVertical : layout.height2,
        backgroundColor : '#ffffff',
        flexDirection: 'row',
    },
    mediaCard : {
        height : layout.height10,
        width : layout.width25,
        marginHorizontal: layout.width2,
        backgroundColor : "#ffffff",
    },
    media : {
        height : layout.height10,
        width : layout.width25,
    },
    addMedia : {
        height : layout.height10,
        width : layout.width90,
        alignContent:'center',
        justifyContent:'center',
        flexDirection: 'row',
    },
    addMediaButton : {
        height : layout.height8,
        width : layout.height8,
        borderRadius : layout.height4,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor : '#00bcd4',
    },
    addMediaButtonIcon : {
        color : "#ffffff",
        fontSize: layout.fontSize4,
        textAlign: 'center',
    },
    titleLabel : {
        height : layout.height5,
        color : "#212121",
        fontSize: layout.fontSize1p8,
    },
    titleInput : {
        height : layout.height5,
        color : "#545454",
        fontSize: layout.fontSize1p5,
    },
    unitPicker : {
        width: layout.width50,
        height : layout.height8,
        alignItems : 'center',
        justifyContent : 'center',
        marginBottom : layout.height2,
        marginTop: layout.height2,
    },
    contentLabel : {
        height : layout.height5,
        color : "#212121",
        fontSize: layout.fontSize1p8,
    },
    contentInput : {
        height : layout.height20,
        color : "#545454",
        fontSize: layout.fontSize1p5,
    },
    nextButton : {
        height : layout.height8,
        width : layout.height8,
        borderRadius : layout.height4,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor : '#00bcd4',
        marginBottom: layout.height10,
    },
    nextButtonIcon : {
        color : "#ffffff",
        fontSize: layout.fontSize4,
        textAlign: 'center',
    },
    broadcast : {
        width: layout.width90,
        height: layout.height20,
        backgroundColor: "#ffffff",
        marginVertical: layout.height1,
        paddingVertical: layout.height2,
        paddingHorizontal: layout.width1p5,
    },
    broadcastLabel : {
        height : layout.height5,
        color : "#212121",
        fontSize: layout.fontSize1p8,
    },
    rbLabel : {
        color : "#212121",
        fontSize: layout.fontSize1p5,
    },
    rbSelected : {
        height: layout.height1p5,
        width: layout.height1p5,
        borderRadius: layout.height0p75,
        backgroundColor : '#00bcd4',
    },
    radioButton : {
        height: layout.height3,
        width: layout.height3,
        borderRadius: layout.height1p5,
        borderWidth: 3,
        borderColor: '#212121',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight : layout.width1,
    },
});

class CreateNewsStep1 extends Component {

    static navigationOptions = {
        drawerLabel: 'NEWS',
        drawerIcon: ({tintColor}) => (
            <Icon name='newspaper-o' style={{fontSize : 24, color : '#757575'}}/>
        ),
    };

    constructor(props)
    {
        super(props);
        this.state = {
            item : {
                title : null,
                content : null,
                unit : null,
                media : [

                ],
                published : false,
                publishedBySupervisor : false,
            }
        };
    }

    componentWillMount()
    {
        this.setState({item : this.props.news.creation_current});
        this.props.tryUnits(this.props.login);
    }

    buildUnitListIOS() {
        let user = this.props.users.loggedUser;
        let list = [];

        if(user)
        {
            let ids = [];
            let roles = user.rolesByUnit;

            for(var i = 0; i < roles.length; i++)
            {
                if(!ids.includes(roles[i].unit["@id"]))
                {
                    list.push(
                        {
                            key : i,
                            label : roles[i].unit.name,
                            value : roles[i].unit["@id"],
                        }
                    );
                    ids.push(roles[i].unit["@id"]);
                }
            }
        }

        return <ModalSelector
            data={list}
            initValue="Unité"
            style={styles.unitPicker}
            selectStyle={{ height : layout.height5, width : layout.width50, alignItems : 'center', justifyContent : 'center'}}
            onChange={(value) => this.setUnit(value)} />;
    }

    buildUnitListAndroid()
    {
        let user = this.props.users.loggedUser;
        let list = [];
        if(user)
        {
            let ids = [];
            let roles = user.rolesByUnit;

            for(var i = 0; i < roles.length; i++)
            {
                if(!ids.includes(roles[i].unit["@id"]))
                {
                    list.push(
                        <Picker.Item key={i} label={roles[i].unit.name} value={roles[i].unit["@id"]} />
                    );
                    ids.push(roles[i].unit["@id"]);
                }
            }
        }

        return <Picker style={styles.unitPicker} selectedValue={this.state.item.unit} onValueChange={(value, index) => this.setUnit(value)}>
            <Picker.Item label="Sélectionnez l'unité" value={null} key={-1} />
            {list}
        </Picker>;
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

            if (response.didCancel) {

            }
            else if (response.error) {

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
        if(this.props.users.loggedUser)
        {
            let roles = this.props.users.loggedUser.rolesByUnit;

            for(var i = 0; i < roles.length; i++)
            {
                if(roles[i].role.title === "Responsable" && roles[i].unit.parent === null)
                {
                    return true;
                }
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
                        <ScrollView styles={{height : layout.fullHeight}} horizontal={false} showsVerticalScrollIndicator={false}>
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
                                <View>
                                    { Platform.OS === 'android' ? this.buildUnitListAndroid() : this.buildUnitListIOS() }
                                </View>
                            </ElevatedView>
                            <ElevatedView style={styles.content} elevation={2}>
                                <Text style={styles.contentLabel}>
                                    Texte de la news
                                </Text>
                                <TextInput style={styles.contentInput} placeholder="Texte" multiline={true} onChangeText={(text) => this.setContent(text)} value={this.state.item.content}/>
                            </ElevatedView>
                            <View style={{flexDirection : 'row', alignContent : 'flex-end', justifyContent: 'flex-end', width : layout.width90}}>
                                <ElevatedView style={styles.nextButton} elevation={4}>
                                    <TouchableWithoutFeedback onPress={this.preview.bind(this)}>
                                        <Icon style={styles.nextButtonIcon} name="eye"/>
                                    </TouchableWithoutFeedback>
                                </ElevatedView>
                            </View>
                            <KeyboardSpacer/>
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
                        <ScrollView styles={{height : layout.fullHeight}} horizontal={false} showsVerticalScrollIndicator={false}>
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
                                { Platform.OS === 'android' ? this.buildUnitListAndroid() : this.buildUnitListIOS() }
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
                                <View style={{flexDirection : 'row', marginVertical : layout.height0p5}}>
                                    <RadioButton value="private" styleSelected={styles.rbSelected} style={styles.radioButton}/>
                                    <Text style={styles.rbLabel}>
                                        Confidentielle
                                    </Text>
                                </View>
                                <View style={{flexDirection : 'row', marginVertical : layout.height0p5}}>
                                    <RadioButton value="restricted" styleSelected={styles.rbSelected} style={styles.radioButton}/>
                                    <Text style={styles.rbLabel}>
                                        Restreinte
                                    </Text>
                                </View>
                                <View style={{flexDirection : 'row', marginVertical : layout.height0p5}}>
                                    <RadioButton value="public" styleSelected={styles.rbSelected} style={styles.radioButton}/>
                                    <Text style={styles.rbLabel}>
                                        Publique
                                    </Text>
                                </View>
                            </ElevatedView>
                            <View style={{flexDirection : 'row', alignContent : 'flex-end', justifyContent: 'flex-end', width : layout.width90}}>
                                <ElevatedView style={styles.nextButton} elevation={4}>
                                    <TouchableWithoutFeedback onPress={this.preview.bind(this)}>
                                        <Icon style={styles.nextButtonIcon} name="eye"/>
                                    </TouchableWithoutFeedback>
                                </ElevatedView>
                            </View>
                            <KeyboardSpacer/>
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