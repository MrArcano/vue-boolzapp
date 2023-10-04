const { createApp } = Vue;
import { contacts } from "./db.js";

const DateTime = luxon.DateTime;

createApp({
  data() {
    return {
      contacts,
      contactActive: null,
      messageActive: null,
      newMessage: "",
      filter: "",
      toggleTheme: true,
    }
  },
  
  methods: {

    lastMessage(contact){
      // return del messaggio alla posizione lunghezza array - 1
      if(contact.messages.length > 0){
        return contact.messages[contact.messages.length - 1].message
      }
    },

    lastMessageTime(contact){
      // return della data alla posizione lunghezza array - 1
      if(contact.messages.length > 0){
        return contact.messages[contact.messages.length - 1].date
      } // .substr(11,5);
    },

    addMessage(){
      // creo il mio obj da pushare nell'array
      const newSentMessageObj = {
        date: this.getTime(),
        message: this.newMessage,
        status: "sent"
      }

      // pusho il mio oggetto
      this.contactActive.messages.push(newSentMessageObj);
      
      // pulisco il campo newMessage
      this.newMessage="";
      
      // Timer risposta cpu
      setTimeout(() => {
        const newReceivedMessageObj = {
          date: this.getTime(),
          message: "ok ;)",
          status: "received"
        }
        this.contactActive.messages.push(newReceivedMessageObj);
      }, 1000);
    },

    filterChat(){
      // N.B. potevo usare un MAP
      // ciclo tutti i contatti
      this.contacts.forEach(contact => {
        // setto di default la visibilità a true
        contact.visible = true;
        if(!contact.name.toLowerCase().includes(this.filter.toLowerCase())){
          // se il nome del contatto NON include le lettere date dall'input text 
          // (visible = false)
          contact.visible = false;
        }
      });
    },

    deleteMessage(message){
      // filter dei messaggi, mi restituisce l'array messaggi diversi dal messagge inserito
      this.contactActive.messages = this.contactActive.messages.filter((mess) => mess != message);
    },

    getTime(){
      return DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
    },

    viewDropdown(message){
      if(this.messageActive === message){
        this.messageActive = null;
      }else{
        this.messageActive = message;
      }
    }
  },

  beforeMount() {
    this.contactActive = (this.contacts[0]);
  },
  
  mounted() {
    console.log("Montato");
  },
  
}).mount("#app")