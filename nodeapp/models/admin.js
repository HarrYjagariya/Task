var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/demoDb', { useNewUrlParser: true });
var mongoSchema =   mongoose.Schema;

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
    permission: {
        type: String,
        default: '0'
    },
    blog: {
        type: String,
        default: ''
    },
    userEmail: {
        type: String,
        default: ''
    },
};

module.exports = mongoose.model('admin',userSchema);