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
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di stendere i panni',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received'
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
                    status: 'sent'
                },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent'
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
                    status: 'received'
                },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
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
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
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
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Va bene, stasera la sento',
                    status: 'received'
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
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Non ancora',
                    status: 'received'
                },
                {
                    date: '10/01/2020 15:51:00',
                    message: 'Nessuna nuova, buona nuova',
                    status: 'sent'
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
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Grazie per avermelo ricordato, le scrivo subito!',
                    status: 'received'
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
                    status: 'received'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:51:00',
                    message: 'OK!!',
                    status: 'received'
                }
            ],
        }
      ],
      contactActive: null,
      messageActive: null,
      newMessage: "",
      filter: "",
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