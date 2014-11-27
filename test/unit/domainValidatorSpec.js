'use strict';

describe('$domainValidator Service', function(){
  
  var 
  provider,
  service,
  domain,
  result,
  constraints = {},
  error,
  fn,
  Domain = function(){
    this.name
    this.age
  }

  beforeEach(module('domain', function($domainValidatorProvider){
    provider = $domainValidatorProvider
  }))

  beforeEach(inject(function($domainValidator){
    service = $domainValidator
  }))

  beforeEach(function(){
    domain = new Domain()
  })

  it('Should parse constraints', function(){
    // given
    constraints.name = 'isString|maxLength:36'

    // when
    result = service.parse(constraints)

    //then rules are parsed
    expect(result.name).toEqual(jasmine.any(Array))
    expect(result.name.length).toBe(2)

    // and constraints preserves rule name, to create message
    expect(result.name[0].rule).toBe('isString')
    expect(result.name[1].rule).toBe('maxLength')

    // and constraints have a callback, that the propety must pass
    expect(result.name[0].callback).toEqual(jasmine.any(Function))
    expect(result.name[1].callback).toEqual(jasmine.any(Function))


  })


  it('Should fail on invalid validator', function(){

    // given
    constraints.name = 'invalidValidator'
    error = '[$prop | invalidValidator] using [invalidValidator] cannot be parsed. '
          + 'Are you sure [invalidValidator] filter exists?'


    // when
    var fn = function(){
      service.parse(constraints)
    }
    
    // then
    expect(fn).toThrow(new Error(error))


  })



  describe('Validation Logic', function(){

    // setup
    var valid = function(){ return true },
        invalid = function(){ return false }

    // where
    var where = [
      {
        key: 'invalid + valid',
        expected: false,
        constraints: {
          name: [{ callback: invalid }, {callback: valid}]
        }
      },

      {
        key: 'valid + valid',
        expected: true,
        constraints: {
          name: [{ callback: valid }, { callback: valid }]
        }
      },

      {
        key: 'null',
        expected: true,
        constraints: []
      }
    ]

    // then
    angular.forEach(where, function(r){
      it('Should return [' +  r.expected + '] with validators [' + r.key + ']', function(){

        expect(service.validate(domain, r.constraints))
          .toBe(r.expected)
          
      })
    })
    
  })


});

