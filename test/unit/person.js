/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Person    = require('../../app/models/person'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'people-test',
    Mongo     = require('mongodb');

describe('Person', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Person object', function(){
      var p = new Person({name:'Bob Jones', cash:1000, photo:'bob.jpg', items:['a1', 'a2', 'a3']});
      expect(p).to.be.instanceof(Person);
    });
  });

  describe('.all', function(){
    it('should get all people', function(done){
      Person.all(function(err, people){
        expect(people).to.have.length(3);
        done();
      });
    });
  });

  describe('.create', function(){
    it('should create a new person object', function(done){
      var p = new Person({name:'Bob Jones', cash:1000, photo:'bob.jpg', items:['a1', 'a2', 'a3']});
      Person.create(p, function(err, person){
        expect(p).to.be.instanceof(Person);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a person by their id', function(done){
      Person.findById(Mongo.ObjectID('000000000000000000000001'), function(person){
        expect(person.name).to.equal('Bob Jones');
        expect(person).to.be.instanceof(Person);
        done();
      });
    });
  });

  /*describe('#addItem', function(){
    it('should add an item to a person', function(done){
      var i = {name:'couch', photo:'couch.jpg', count:1, value:500, total:500},
      Person.addItem(i, function(err, person){
        expect(person.items).to.have.length(4);
        console.log(items);
        done();
      });
    });
  });*/
});

