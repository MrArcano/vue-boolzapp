// - Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

const { createApp } = Vue;

const DateTime = luxon.DateTime;

createApp({

  data() {
    return {
      contacts: [
        {
            name: 'Michele',
            avatar: './img/avatar_1.jpg',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent',
                    dropdownFlag: false
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di stendere i panni',
                    status: 'sent',
                    dropdownFlag: false
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received',
                    dropdownFlag: false
                }
            ],
        },
        {
            name: 'Fabio',
            avatar: './img/avatar_2.jpg',
            visible: true,
            messages: [
                {
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent',
                    dropdownFlag: false
                },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received',
                    dropdownFlag: false
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent',
                    dropdownFlag: false
                }
            ],
        },
        {
            name: 'Samuele',
            avatar: './img/avatar_3.jpg',
            visible: true,
            messages: [
                {
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received',
                    dropdownFlag: false
                },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent',
                    dropdownFlag: false
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received',
                    dropdownFlag: false
                }
            ],
        },
        {
            name: 'Alessandro B.',
            avatar: './img/avatar_4.jpg',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent',
                    dropdownFlag: false
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received',
                    dropdownFlag: false
                }
            ],
        },
        {
            name: 'Alessandro L.',
            avatar: './img/avatar_5.jpg',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Ricordati di chiamare la nonna',
                    status: 'sent',
                    dropdownFlag: false
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Va bene, stasera la sento',
                    status: 'received',
                    dropdownFlag: false
                }
            ],
        },
        {
            name: 'Claudia',
            avatar: './img/avatar_6.jpg',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Ciao Claudia, hai novità?',
                    status: 'sent',
                    dropdownFlag: false
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Non ancora',
                    status: 'received',
                    dropdownFlag: false
                },
                {
                    date: '10/01/2020 15:51:00',
                    message: 'Nessuna nuova, buona nuova',
                    status: 'sent',
                    dropdownFlag: false
                }
            ],
        },
        {
            name: 'Federico',
            avatar: './img/avatar_7.jpg',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Fai gli auguri a Martina che è il suo compleanno!',
                    status: 'sent',
                    dropdownFlag: false
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Grazie per avermelo ricordato, le scrivo subito!',
                    status: 'received',
                    dropdownFlag: false
                }
            ],
        },
        {
            name: 'Davide',
            avatar: './img/avatar_8.jpg',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Ciao, andiamo a mangiare la pizza stasera?',
                    status: 'received',
                    dropdownFlag: false
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                    status: 'sent',
                    dropdownFlag: false
                },
                {
                    date: '10/01/2020 15:51:00',
                    message: 'OK!!',
                    status: 'received',
                    dropdownFlag: false
                }
            ],
        }
      ],
      indexChat: 0,
      newMessage: "",
      filter: "",
      viewDeleteMessage: false,
    }
  },
  methods: {

    lastMessage(contact){
      let lastMessage = "";
      if(contact.messages.length > 0){
        lastMessage = contact.messages[contact.messages.length - 1].message
      }
      return lastMessage;
    },

    lastMessageTime(contact){
      let lastMessageTime = "";
      if(contact.messages.length > 0){
        lastMessageTime = contact.messages[contact.messages.length - 1].date
      }
      return lastMessageTime;
      // .substr(11,5);
    },

    addMessage(){
      const newSentMessageObj = {
        date: this.getTime(),
        message: this.newMessage,
        status: "sent",
        dropdownFlag: false
      }

      this.contacts[this.indexChat].messages.push(newSentMessageObj);
      
      this.newMessage="";
      
      setTimeout(() => {
        const newReceivedMessageObj = {
          date: this.getTime(),
          message: "ok ;)",
          status: "received",
          dropdownFlag: false
        }
        
        this.contacts[this.indexChat].messages.push(newReceivedMessageObj);
      }, 1000);
    },

    filterChat(){
      console.log(this.filter);
      this.contacts.forEach(contact => {
        contact.visible = true;
        if(!contact.name.toLowerCase().includes(this.filter.toLowerCase())){
          contact.visible = false;
        }
      });
    },

    deleteMessage(message){
      this.contacts[this.indexChat].messages = this.contacts[this.indexChat].messages.filter((mess) => mess != message);
    },

    getTime(){
      return DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
    }
  },



  mounted() {
    console.log("Montato");
  },
  

}).mount("#app")