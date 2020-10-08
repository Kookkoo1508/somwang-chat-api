<template>
  <b-row>
    <b-col cols="12">
      <div class="chat-box" v-chat-scroll>
        <b-list-group>
          <b-list-group-item
            class="chat-item"
            style="width: 890px"
            v-for="(message, index) in messages"
            :key="index"
          >
            <div class="chat-message text-right" v-if="message.name === name">
              <div class="right-bubble">
                <span class="msg-date">{{
                  formatData(message.timestamp)
                }}</span>
                <p text-wrap>{{ message.content }}</p>
              </div>
            </div>
            <div
              class="chat-message text-left"
              text-left
              v-if="message.name !== name"
            >
              <div class="left-bubble">
                <span class="msg-name">{{ message.name }}</span>
                <span class="msg-date">{{
                  formatData(message.timestamp)
                }}</span>
                <p text-wrap>{{ message.content }}</p>
              </div>
            </div>
          </b-list-group-item>
        </b-list-group>
      </div>
      <footer class="sticky-footer">
        <b-form @submit.prevent="sendMessage">
          <b-input-group>
            <b-form-input
              id="message"
              v-model.trim="showMessage"
              placeholder="Enter your message"
            ></b-form-input>
            <b-button type="submit" variant="primary" :disabled="!showMessage"
              >Send</b-button
            >
          </b-input-group>
        </b-form>
      </footer>
    </b-col>
  </b-row>
</template>

<script>
import firebase from "@/services/firebase";
import moment from "moment";

export default {
  name: "ChatScreen",
  props: ["name"],
  data() {
    return {
      messages: [],
      showMessage: null,
      feedback: null
    };
  },
  methods: {
    sendMessage() {
      if (this.showMessage) {
        console.log(this.showMessage);
        firebase
          .collection("messages")
          .add({
            content: this.showMessage,
            name: this.name,
            timestamp: Date.now()
          })
          .catch(err => {
            console.log(err);
          });
        this.showMessage = null;
        this.feedback = null;
      } else {
        this.feedback = "Please enter Text";
      }
    },
    formatData(date) {
      return moment(date).calendar();
    }
  },
  created() {
    let viewMessages = firebase.collection("messages").orderBy("timestamp");
    viewMessages.onSnapshot(snapshop => {
      snapshop.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timestamp: doc.data().timestamp
          });
        }
      });
    });
  }
};
</script>

<style scoped>
.card {
  width: 100%;
  height: 75vh;
  margin: auto;
}
.card-body {
  min-height: 50vh;
  overflow-x: scroll;
}
.chat-box {
  height: 500px;
  width: 50%;
  overflow: scroll;
}
.chat-item {
  border: none;
}
.chat-status {
  min-height: 49px;
}
.chat-status .chat-date {
  display: block;
  font-size: 10px;
  font-style: italic;
  color: #999;
  height: 15px;
  left: 10%;
  right: 10%;
}
.chat-status .chat-content-center {
  padding: 5px 10px;
  background-color: #e1e1f7;
  border-radius: 6px;
  font-size: 12px;
  color: #555;
  height: 34px;
  left: 10%;
  right: 10%;
}
.chat-message {
  width: 40%;
  min-height: 40px;
}
.chat-message .right-bubble {
  position: relative;
  background: #dcf8c6;
  border-top-left-radius: 0.4em;
  border-bottom-left-radius: 0.4em;
  border-bottom-right-radius: 0.4em;
  padding: 5px 10px 10px;
  left: 100%;
}
.chat-message .right-bubble span.msg-name {
  font-size: 12px;
  font-weight: bold;
  color: green;
  display: block;
}
.chat-message .right-bubble span.msg-date {
  font-size: 10px;
  display: block;
}
.chat-message .right-bubble:after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 0;
  height: 0;
  border: 27px solid transparent;
  border-left-color: #dcf8c6;
  border-right: 0;
  border-top: 0;
  margin-top: -0.5px;
  margin-right: -27px;
}
.chat-message .left-bubble {
  position: relative;
  background: #efefef;
  border-top-right-radius: 0.4em;
  border-bottom-left-radius: 0.4em;
  border-bottom-right-radius: 0.4em;
  padding: 5px 10px 10px;
  left: 5%;
}
.chat-message .left-bubble span.msg-name {
  font-size: 12px;
  font-weight: bold;
  color: blue;
  display: block;
}
.chat-message .left-bubble span.msg-date {
  font-size: 10px;
  display: block;
}
.chat-message .left-bubble:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border: 27px solid transparent;
  border-right-color: #efefef;
  border-left: 0;
  border-top: 0;
  margin-top: -0.5px;
  margin-left: -27px;
}
footer.sticky-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 51%;
  padding: 10px;
  background-color: #ffffff;
  border-top: solid 1px #efefef;
}
</style>
