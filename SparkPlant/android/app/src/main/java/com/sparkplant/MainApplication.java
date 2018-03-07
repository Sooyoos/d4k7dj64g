package com.sparkplant;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.zmxv.RNSound.RNSoundPackage;
import io.codebakery.imagerotate.ImageRotatePackage;
import com.imagepicker.ImagePickerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
// Required package
import io.invertase.firebase.RNFirebasePackage; // <-- Add this line
// Optional packages - add as appropriate
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // Firebase Cloud Messaging


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new SvgPackage(),
            new RNSoundPackage(),
            new ImageRotatePackage(),
            new ImagePickerPackage(),
            new PickerPackage(),
            new RNFirebasePackage(),
            new RNFirebaseAnalyticsPackage(),
            new RNDeviceInfo(),
            new RCTCameraPackage(),
            new ReactNativeAudioPackage(),
            new RNExitAppPackage(),
           new RNFirebaseMessagingPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
