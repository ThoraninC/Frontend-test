
var defaultAuth = firebase.auth()
var activeuser
var userout = true

var box1 = new Vue({
    el: '#inside_form',
    data: {
      message: 'You haven\'t login yet',
    },
    computed:{
        weirdshit: function (){
            return "some string"
        }
    }
  })


var loginzone = new Vue({
    el: '#signin_section',
    data: {
        username: '',
        password: '',
        visibility: true,

        act_name: '',
        act_surname: '',
        telephone_number: '',
        age: null,
        address: '',

        errors: [],
    },
    computed:{
        usertoken: function(){
            return activeuser
        }
    },
    methods:{
        Login_procedure: function(event){
            credential = null;
            credential = defaultAuth.signInWithEmailAndPassword(this.username, this.password).then(function(user) {
                alert('Login Successful')
                loginzone.Visibility_switch()
                userout = false
                activeuser = user.email
             }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.')
            } else {
                alert(errorMessage);
            }
            });
        },
        Visibility_switch: function(){
            this.visibility = !this.visibility
        },
        Logout_procedure: function(event){
            loginzone.Visibility_switch()
        },
        profilesave_procedure: function(e){
            var formpass = true

            this.errors = [];

            if (!this.act_name) {
                this.errors.push('Name required.');
                formpass=false;
            }
            if (!this.act_surname) {
                this.errors.push('Surname required.');
                formpass=false;
            }
            if (!this.telephone_number) {
                this.errors.push('Telephone Number required.');
                formpass=false;
            }
            if (!this.age) {
                this.errors.push('Age required.');
                formpass=false;
            }
            if (!this.address) {
                this.errors.push('Address required.');
                formpass=false;
            }
            if (!isNumeric(this.age)){
                this.errors.push('Age is not a number');
                formpass=false;
            }
            if (!isNumeric(this.telephone_number)){
                this.errors.push('Telephone Number Contain Character');
                formpass=false;
            }


            if(formpass){
                var userId = firebase.auth().currentUser.uid;
                firebase.database().ref('users/'+userId).set({
                    Address: this.address,
                    Age: this.age,
                    Name: this.act_name,
                    Surname: this.act_surname,
                    Telno: this.telephone_number,
                    email: this.username
                  });

                  alert("Data Submitted");
                
            }
        }
    }

})

var usmng = new Vue({
    el:"#Usermanager",
    data:{
        manager_visible:false,
        button_dialog:"Open Users Manager",
        selected:"",
        usersinthehouse:[]
    },
    computed:{
    },
    methods:{
        toggle_manager: function(event){
            this.manager_visible = !this.manager_visible;
            if(this.manager_visible){
                this.button_dialog = "Close Users Manager"
                firebase.database().ref('users').once('value', function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        //I have problem retrive a data and I decide to call it a day
                        //and let someone guide me
                    })
                })
            }else{
                this.button_dialog = "Open Users Manager"
            }
        }
    },

})

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

//   Vue.component('singin_section',{
//     template:
//   })
