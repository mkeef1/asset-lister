'use strict';

var Mongo = require('mongodb'),
    _     = require('lodash');

function Person(p){
  this.name = p.name;
  this.cash = p.cash;
  this.photo = p.photo;
  this.items = [];
}

Object.defineProperty(Person, 'collection', {
  get: function(){return global.mongodb.collection('people');}
});

Person.all = function(cb){
  Person.collection.find().toArray(cb);
};

Person.create = function(o, cb){
  var a = new Person(o);
  Person.collection.save(a, cb);
};

Person.findById = function(id, cb){
  var _id = Mongo.ObjectID;
  Person.collection.findOne({_id:_id}, function(err, obj){
    var person = changePrototype(obj);
    cb(person);
  });
};

Person.prototype.addItem = function(item, cb){
  this.items.push(item);
  Person.collection.update({_id:this._id}, {$push:{items:item}}, cb);
};
module.exports = Person;

//Private function//

function changePrototype(obj){
  return _.create(Person.prototype, obj);
}
