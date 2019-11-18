var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

var userSchema  = {
    firstName: {
        type: String,
        default: ''
    }, 
    lastName: {
        type: String,
        default: ''
    },
    userPassword: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: 'user'
    },
    userEmail: {
        type: String,
        default: ''
    },
};

module.exports = mongoose.model('user',userSchema);