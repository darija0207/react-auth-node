const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Genre Scheme
const userSchema = mongoose.Schema({
  method: {
    type: String,
    enum: ['local', 'facebook', 'twitter'],
    required: true
  },
  local: {
    email:{
      type: String,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    phone: {
      type: String,
    },
    create_date:{
      type: Date,
      default: Date.now
    },
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  twitter: {
    type: {
      id: String,
      token: String
    }
  }
});

userSchema.set('autoIndex', false);

userSchema.pre('save', async function (next) {
  //this.password
  if (this.method !== 'local') {
    next();
  }
  try {
    //Generate a salt
    const salt = await bcrypt.genSalt(10);
    //Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    //Re-assign hashed version over original, plain text password
    this.local.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});


userSchema.statics.upsertTwitterUser = function(token, tokenSecret, profile, cb) {
  const that = this;
  return this.findOne({
    'twitter.id': profile.id
  }, function(err, user) {
    // no user was found, lets create a new one
    if (!user) {
      const newUser = new that({
        method: 'twitter',
        twitter: {
          id: profile.id,
          email: profile.emails[0].value,
          username: profile.username,
          displayName: profile.displayName,
          token: token,
          tokenSecret: tokenSecret
        }
      });

      newUser.save(function(error, savedUser) {
        if (error) {
          console.log(error);
        }
        return cb(error, savedUser);
      });
    } else {
      return cb(err, user);
    }
  });
};


userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch(error) {
    throw new Error(error);
  }
};


const User = module.exports = mongoose.model('User', userSchema);
