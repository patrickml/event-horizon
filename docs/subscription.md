# Subscription
 Subscriptions are how we get reactive updates from our store. In order to use a subscription we need to use something like `react-komposer`

```js
import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { composeWithTracker } from 'react-komposer';
import EventHorizon from 'react-native-event-horizon'; // change to 'meteor/patrickml:event-horizon' for meteor
import AutogrowInput from '../components/autosize-input';
import cameraIcon from '../assets/icons/camera-icon/camera-icon.png';
import takePhoto from '../util/camera';

// Lets create a component that will hold an input field and stay
// at the bottom of the screen event when a keyboard is opened.
// in order to do so we will need to know where the bottom
// of the screen is and our store `window-height` will know this
class Field extends React.Component {
  constructor(props) {
    super(props);
    this.clearInput = this.clearInput.bind(this);
    this.submit = this.submit.bind(this);
  }

  clearInput() {
    this.refs.input.resetInputText();
     
    // Examples of dispatchment being used to update other stores
    EventHorizon.dispatch('PROJECT_UPDATE_MODAL_UPDATE_TEXT', '');
    EventHorizon.dispatch('PROJECT_UPDATE_MODAL_CLEAR_IMAGES');
  }

  submit() {
    // you can add logic here for submiting data to a database but
    // for now we are just going to clear the input field and uploaded
    // images
    this.clearInput();
  }

  render() {
    // as we can see our property came through from our store `window-height`
    // we want to deconstruct our props to get this value `visibleHeight`
    const { visibleHeight } = this.props;
    // We'll need to set the input field to the bottom of the screen
    // to do so if we add the style `{ bottom: visibleHeight }`
    // we should see our input field move when the keyboard is opened
    return (
      <View style={[fieldBox, { bottom: visibleHeight }]}>
        <View style={row}>
          <TouchableOpacity
            style={areas}
            onPress={() => takePhoto('PROJECT_UPDATE_MODAL_ADD_IMAGE')}
          >
            <Image source={cameraIcon} />
          </TouchableOpacity>
          <AutogrowInput
            placeholder="Tap to add comment..."
            defaultHeight={36}
            style={input}
            onChangeText={(text) => EventHorizon.dispatch('PROJECT_UPDATE_MODAL_UPDATE_TEXT', text)}
            ref="input"
          />
          <TouchableOpacity style={areas} onPress={() => this.submit()}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
        {
          this.props.images.length > 0 && <ImageRow images={this.props.images} />
        }
      </View>
    );
  }
}

Field.propTypes = {
  visibleHeight: PropTypes.number,
  message: PropTypes.string,
  images: PropTypes.array,
};

export default composeWithTracker((props, onData) => {
  // using `EventHorizon.subscribe` we can get reactive update
  // to the data stored in the store `window-height`
  // by looking at our default store we can tell that the
  // object should look something like `{ visibleHeight: Number }`
  onData(null, EventHorizon.subscribe('window-height'));
}, Loading, Error)(Field);
```
